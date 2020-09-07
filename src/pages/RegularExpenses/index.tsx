import React, { useState, useEffect } from 'react';

import './styles.css';
import Header from '../../components/Header';
import BasicInput from '../../components/BasicInput';
import BasicButton from '../../components/BasicButton';
import EntriesController, { Entry } from '../../api/Entries/EntriesController';
import CategoriesController, {
  Category,
} from '../../api/Categories/CategoriesController';
import CategoriesSelect from '../../components/CategoriesSelect';
import {
  getISODate,
  checkSameDate,
  getISOMonth,
} from '../../services/DateServices';
import RegularExpensesTable from './RegularExpensesTable';

interface RegularExpensesPageProps {
  dailyFluxController: EntriesController;
  categoriesController: CategoriesController;
}

const RegularExpenses: React.FC<RegularExpensesPageProps> = ({
  dailyFluxController,
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
    setEntryList(dailyFluxController.getEntriesByDate(entriesDate));
  }, []);

  useEffect(() => {
    setEntryList(dailyFluxController.getEntriesByDate(entriesDate));
  }, [entriesDate]);

  const clearFields = () => {
    setNewValue(0);
    setSelectedCategory('');
  };

  const validateFieldValues = () => {
    if (selectedCategory && newValue > 0) {
      return true;
    }
    return false;
  };

  const validateSelectedDate = (): Date | null => {
    if (checkSameDate(entriesDate)) {
      return new Date();
    } else if (
      window.confirm('Deseja mesmo adicionar uma entrada para um outro mês ?')
    ) {
      return entriesDate;
    } else {
      return null;
    }
  };

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    /*  
    if (validateFieldValues()) {
      const newEntryDate = validateSelectedDate();
      if (newEntryDate) {
        const category = categoryList.filter((c) => {
          return c.id === parseInt(selectedCategory);
        })[0];
        const newEntry: Entry = {
          date: newEntryDate,
          value: newValue,
          category,
        };
        dailyFluxController.addEntry(newEntry);
        setEntryList([...entryList, newEntry]);
        clearFields();
      }
    } else {
      console.log('ERROR: INCORRECT DATA INPUT.');
    } */
  };

  const handleDeleteEntry = (timeStamp: number) => {
    const newEntryList = entryList.filter((entry) => {
      return entry.date.getTime() !== timeStamp;
    });
    setEntryList(newEntryList);
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
