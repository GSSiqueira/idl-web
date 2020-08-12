import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
          <Link to="/">Login</Link>
        </nav>
      </header>
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
