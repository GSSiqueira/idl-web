import React from 'react';
import './styles.css';
import Header from '../../components/Header';
import BasicInput from '../../components/BasicInput';
import EntriesTable from './EntriesTable';
import BasicButton from '../../components/BasicButton';
import DailyFluxController from '../../api/DailyFlux/DailyFluxController';

function Flux() {
  const dailyFluxController = new DailyFluxController();
  const entriesList = dailyFluxController.getEntriesList();

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
              placeholder="0.0"
              step="0.10"
            />
            <BasicInput
              type="text"
              name="entry-name"
              label="Nome:"
              placeholder="Digite o nome da entrada."
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
