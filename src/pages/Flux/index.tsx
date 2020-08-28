import React, { useState, useEffect } from 'react';

import './styles.css';
import Header from '../../components/Header';
import BasicInput from '../../components/BasicInput';
import EntriesTable from './EntriesTable';
import BasicButton from '../../components/BasicButton';
import DailyFluxController, {
  Entry,
} from '../../api/DailyFlux/DailyFluxController';
import CategoriesController, {
  Category,
} from '../../api/Categories/CategoriesController';
import CategoriesSelect from '../../components/CategoriesSelect';
import { getISODate, checkSameDate } from '../../services/DateServices';

interface FluxPageProps {
  dailyFluxController: DailyFluxController;
  categoriesController: CategoriesController;
}

const Flux: React.FC<FluxPageProps> = ({
  dailyFluxController,
  categoriesController,
}) => {
  const [newValue, setNewValue] = useState(0.0);
  const [newCategory, setNewCategory] = useState('');
  const [entriesDate, setEntriesDate] = useState(new Date());
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [entryList, setEntryList] = useState<Entry[]>([]);

  useEffect(() => {
    setCategoryList(categoriesController.getCategories());
    setEntryList(dailyFluxController.getEntriesList(entriesDate));
  }, []);

  useEffect(() => {
    setEntryList(dailyFluxController.getEntriesList(entriesDate));
  }, [entriesDate]);

  const handleNewValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(parseFloat(event.target.value));
  };

  const handleNewDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value + 'T00:00:00');
    setEntriesDate(newDate);
    //Timing problem here on setState
  };

  const handleNewCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewCategory(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const category = categoryList.filter((c) => {
      return c.id === parseInt(newCategory);
    })[0];

    const entryDate = checkSameDate(entriesDate) ? new Date() : entriesDate;

    if (
      checkSameDate(entriesDate) ||
      window.confirm('Deseja mesmo adicionar uma entrada para uma outra data ?')
    ) {
      if (category && newValue) {
        const newEntry: Entry = {
          time: entryDate,
          value: newValue,
          category,
        };
        dailyFluxController.addEntry(newEntry);
        setEntryList([...entryList, newEntry]);
        setNewValue(0);
        setNewCategory('');
      } else {
        console.log('ERROR: INCORRECT DATA INPUT.');
      }
    }
  };

  const handleDeleteEntry = (time: number) => {
    let newEntryList = entryList.filter((entry) => {
      return entry.time.getTime() !== time;
    });
    setEntryList(newEntryList);
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
              value={newCategory}
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

export default Flux;
