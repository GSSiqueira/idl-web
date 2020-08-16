import React from 'react';
import './styles.css';
import Header from '../../components/Header';
import BasicInput from '../../components/BasicInput';
import EntriesTable from './EntriesTable';
import BasicButton from '../../components/BasicButton';

function Flux() {
  return (
    <>
      <Header />
      <main className="flux-content container">
        <h1 className="main-title">Controle de Caixa</h1>
        <section className="influx-section">
          <h2>Entradas:</h2>
          <form>
            <BasicInput
              type="number"
              name="influx-value"
              label="Valor:"
              placeholder="0.0"
              step="0.10"
            />
            <BasicInput
              type="text"
              name="influx-entry-name"
              label="Nome:"
              placeholder="Digite o nome da entrada."
            />

            <BasicButton label="Enviar" name="influx-button" type="submit" />
          </form>
          <EntriesTable />
        </section>
        <section className="outflux-section">
          <h2>Saidas:</h2>
          <form>
            <BasicInput
              type="number"
              name="outflux-value"
              label="Valor:"
              placeholder="0.0"
              step="0.10"
            />
            <BasicInput
              type="text"
              name="outflux-entry-name"
              label="Nome:"
              placeholder="Digite o nome da entrada."
            />
            <BasicButton label="Enviar" name="outflux-button" type="submit" />
          </form>
          <EntriesTable />
        </section>
      </main>
    </>
  );
}

export default Flux;
