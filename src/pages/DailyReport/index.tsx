import React, { useState, useEffect } from 'react';

import './styles.css';
import Header from '../../components/Header';
import BasicInput from '../../components/BasicInput';
import EntriesTable from './EntriesTable';
import BasicButton from '../../components/BasicButton';
import EntriesController, {
  EntryDTO,
} from '../../api/Entries/EntriesController';
import CategoriesController from '../../api/Categories/CategoriesController';
import CategoriesSelect from '../../components/CategoriesSelect';
import { getISODate, checkSameDate } from '../../services/DateServices';
import { Category } from '../../entities/Category/Category';
import { Entry } from '../../entities/Entry/Entry';

interface DailyReportPageProps {
  entriesController: EntriesController;
  categoriesController: CategoriesController;
}

const DailyReport: React.FC<DailyReportPageProps> = ({
  entriesController,
  categoriesController,
}) => {
  const [newValue, setNewValue] = useState(0.0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [entriesDate, setEntriesDate] = useState<Date>(new Date());
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [entryList, setEntryList] = useState<Entry[]>([]);

  useEffect(() => {
    categoriesController.getDailyCategories().then((categoriesListFromApi) => {
      setCategoryList(categoriesListFromApi);
    });
    setEntryList(entriesController.getDailyEntriesByDate(entriesDate));
  }, []);

  useEffect(() => {
    setEntryList(entriesController.getDailyEntriesByDate(entriesDate));
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newEntryData = validateFieldValues();
      const newEntry = entriesController.addEntry(newEntryData);
      setEntryList([...entryList, newEntry]);
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
        date: new Date(),
      };
      if (checkSameDate(entriesDate)) {
        return values;
      } else if (
        window.confirm(
          'Deseja mesmo adicionar uma entrada para uma outra data ?'
        )
      ) {
        values.date = entriesDate;
        return values;
      } else {
        throw new Error('Cancelled by user.');
      }
    }
    throw new Error('Invalid data.');
  };

  const handleDeleteEntry = (idToDelete: number) => {
    if (entriesController.removeEntry(idToDelete)) {
      setEntryList(entriesController.getDailyEntriesByDate(entriesDate));
    }
  };

  return (
    <>
      <Header />
      <main className="flux-content container">
        <h1 className="main-title">Controle de Caixa</h1>
        <section className="flux-section">
          <form onSubmit={handleSubmit}>
            <BasicInput
              type="date"
              name="entries-date"
              label="Data:"
              value={getISODate(entriesDate)}
              handleNewValue={handleNewDate}
            />

            <BasicInput
              type="number"
              name="entry-value"
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
              name="entry-category"
              value={selectedCategory}
              handleNewCategory={handleNewCategory}
              required
            />

            <BasicButton label="Enviar" name="submit-button" type="submit" />
          </form>
          <EntriesTable
            handleDeleteEntry={handleDeleteEntry}
            entries={entryList}
          />
        </section>
      </main>
    </>
  );
};

export default DailyReport;
