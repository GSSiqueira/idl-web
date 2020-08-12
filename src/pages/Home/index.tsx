import React from 'react';

import './styles.css';
import Header from '../../components/Header';

function Home() {
  return (
    <>
      <Header />
      <main className="container">
        <h1 className="main-title">IDL Manager</h1>
        <section>
          <h2 className="secondary-title">Bem vindo ao IDL Manager</h2>
          <p className="content-text">
            O aplicativo é um WIP. Funções serão adicionadas conforme o
            desenvolvimento.
          </p>
        </section>
      </main>
    </>
  );
}

export default Home;
