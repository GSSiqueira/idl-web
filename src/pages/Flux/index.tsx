import React from 'react';
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
  const entriesList = dailyFluxController.getEntriesList();
  const categoriesList = categoriesController.getCategories();

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
              required
            />
            <BasicInput
              type="text"
              name="entry-name"
              label="Nome:"
              placeholder="Digite o nome da entrada."
              required
            />
            <CategoriesSelect
              categories={categoriesList}
              label="Categoria"
              name="entry-category"
              required
            />
            <BasicButton label="Enviar" name="submit-button" type="submit" />
          </form>
          <EntriesTable entries={entriesList} />
        </section>
      </main>
    </>
  );
}

export default Flux;
