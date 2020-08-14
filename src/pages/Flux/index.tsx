import React from 'react';

import './styles.css';
import Header from '../../components/Header';

function Flux() {
  return (
    <>
      <Header />
      <main className="container">
        <h1 className="main-title">Pagina de Controle de Caixa</h1>
        <form>
          <h2>Nova entrada:</h2>
          <label>Valor</label>
          <input type="number" />
        </form>
      </main>
    </>
  );
}

export default Flux;
