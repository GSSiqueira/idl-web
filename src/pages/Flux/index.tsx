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
            <div className="radio-input-group">
              <label htmlFor="influx-radio">
                Entrada
                <input
                  type="radio"
                  name="entry-type"
                  id="influx-radio"
                  value="false"
                  required
                />
              </label>

              <label htmlFor="outflux-radio">
                Despesa
                <input
                  type="radio"
                  name="entry-type"
                  id="outflux-radio"
                  value="true"
                  required
                />
              </label>
            </div>
            <BasicButton label="Enviar" name="submit-button" type="submit" />
          </form>
          <EntriesTable entries={entriesList} />
        </section>
      </main>
    </>
  );
}

export default Flux;
