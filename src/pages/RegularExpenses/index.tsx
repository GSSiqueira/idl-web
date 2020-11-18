import React, { useState, useEffect } from 'react';
import './styles.css';

import Header from '../../components/Header';
import BasicInput from '../../components/BasicInput';
import BasicButton from '../../components/BasicButton';
import EntriesController, {
  EntryDTO,
} from '../../controllers/Entries/EntriesController';
import CategoriesController from '../../controllers/Categories/CategoriesController';
import CategoriesSelect from '../../components/CategoriesSelect';
import RegularExpensesTable from './RegularExpensesTable';
import { getISOMonth, checkSameMonth, getSQLDate, getSQLTime } from '../../services/DateServices';
import { Category } from '../../entities/Category/Category';
import { Entry } from '../../entities/Entry/Entry';

interface RegularExpensesPageProps {
  entriesController: EntriesController;
  categoriesController: CategoriesController;
}

const RegularExpenses: React.FC<RegularExpensesPageProps> = ({
  entriesController,
  categoriesController,
}) => {
  const [newValue, setNewValue] = useState(0.0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [entriesDate, setEntriesDate] = useState<Date>(new Date());
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [entryList, setEntryList] = useState<Entry[]>([]);

  useEffect(() => {
    categoriesController
      .getRegularExpenseCategories()
      .then((categoriesListFromApi) => {
        setCategoryList(categoriesListFromApi);
      });
    setEntryList(
      entriesController.getRegularExpensesEntriesByMonth(entriesDate)
    );
  }, []);

  useEffect(() => {
    setEntryList(
      entriesController.getRegularExpensesEntriesByMonth(entriesDate)
    );
  }, [entriesDate]);

  const handleNewValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(parseFloat(event.target.value));
  };

  const handleNewDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value + 'T00:00:00');
    setEntriesDate(newDate);
  };

  const handleNewCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleDeleteEntry = (idToDelete: number) => {
    if (entriesController.removeEntry(idToDelete)) {
      setEntryList(
        entriesController.getRegularExpensesEntriesByMonth(entriesDate)
      );
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newEntryData = validateFieldValues();
      entriesController.addEntry(newEntryData).then((response)=> {
        setEntriesDate(entriesDate);
      }).catch((error)=>{
      console.log(error.message);
      });
      clearFields();
    } catch (err) {
      console.log(err.message);
    }
  };

  const clearFields = () => {
    setNewValue(0);
    setSelectedCategory('');
  };

  const validateFieldValues = (): EntryDTO => {
    if (selectedCategory && newValue) {
      const values: EntryDTO = {
        value: newValue,
        categoryId: parseInt(selectedCategory),
        date: getSQLDate(new Date()),
        time: getSQLTime(new Date()),
      };
      if (checkSameMonth(entriesDate)) {
        return values;
      } else if (
        window.confirm(
          'Deseja mesmo adicionar uma entrada para uma outra data ?'
        )
      ) {
        values.date = getSQLDate(entriesDate);
        values.time = getSQLTime(entriesDate);
        return values;
      } else {
        throw new Error('Cancelled by user.');
      }
    }
    throw new Error('Invalid data.');
  };

  return (
    <>
      <Header />
      <main className="regular-expenses-content container">
        <h1 className="main-title">Despesas Fixas</h1>
        <section className="regular-expenses-section">
          <form onSubmit={handleSubmit}>
            <BasicInput
              type="month"
              name="regular-expenses-date"
              label="Data:"
              value={getISOMonth(entriesDate)}
              handleNewValue={handleNewDate}
            />

            <BasicInput
              type="number"
              name="regular-expenses-value"
              label="Valor:"
              step="0.05"
              min={0.1}
              value={newValue}
              handleNewValue={handleNewValue}
              required
            />

            <CategoriesSelect
              categories={categoryList}
              label="Categoria"
              name="regular-expenses-category"
              value={selectedCategory}
              handleNewCategory={handleNewCategory}
              required
            />

            <BasicButton label="Enviar" name="submit-button" type="submit" />
          </form>
          <RegularExpensesTable
            entries={entryList}
            handleDeleteEntry={handleDeleteEntry}
          />
        </section>
      </main>
    </>
  );
};

export default RegularExpenses;
