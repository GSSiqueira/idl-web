import React, { useState } from 'react';
import './styles.css';
import Header from '../../components/Header';
import BasicInput from '../../components/BasicInput';
import EntriesTable from './EntriesTable';
import BasicButton from '../../components/BasicButton';
import DailyFluxController from '../../api/DailyFlux/DailyFluxController';
import CategoriesController from '../../api/Categories/CategoriesController';
import CategoriesSelect from '../../components/CategoriesSelect';

function Flux() {
  const dailyFluxController = new DailyFluxController();
  const categoriesController = new CategoriesController();

  const [newValue, setNewValue] = useState(0);
  const [newCategory, setNewCategory] = useState('');
  const [categoryList, setCategoryList] = useState(
    categoriesController.getCategories()
  );
  const [entryList, setEntryList] = useState(
    dailyFluxController.getEntriesList()
  );

  const handleNewValue = (event: any) => {
    setNewValue(event.target.value);
  };

  const handleNewCategory = (event: any) => {
    setNewCategory(event.target.value);
  };

  return (
    <>
      <Header />
      <main className="flux-content container">
        <h1 className="main-title">Controle de Caixa</h1>
        <section className="flux-section">
          <form>
            <BasicInput
              type="number"
              name="entry-value"
              label="Valor:"
              placeholder="Digite o valor da entrada."
              step="0.10"
              min={0}
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
          <EntriesTable entries={entryList} />
        </section>
      </main>
    </>
  );
}

export default Flux;
