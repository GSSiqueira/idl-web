import React from 'react';

import './styles.css';
import Header from '../../components/Header';

function Flux() {
  return (
    <>
      <Header />
      <main className="flux-content container">
        <h1 className="main-title">Controle de Caixa</h1>
        <section className="influx-section">
          <h2>Entradas:</h2>
          <form>
            <h3>Nova entrada:</h3>
            <label>Valor</label>
            <input type="number" />
            <label>Nome</label>
            <input type="text" placeholder="Digite o nome da entrada." />
          </form>
          <table className="influx-table entry-table">
            <thead>
              <tr>
                <th>Horário</th>
                <th>Nome</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>7:03</td>
                <td>Caixa Inicial</td>
                <td>R$1000,00</td>
              </tr>
              <tr>
                <td>7:03</td>
                <td>Moedas</td>
                <td>R$10,00</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>Total</td>
                <td>R$1010,00</td>
              </tr>
            </tfoot>
          </table>
        </section>
        <section className="outflux-section">
          <h2>Saidas:</h2>
          <form>
            <h3>Nova saida:</h3>
            <label>Valor</label>
            <input type="number" />
            <label>Nome</label>
            <input type="text" placeholder="Digite o nome da saida." />
          </form>
          <table className="outflux-table entry-table">
            <thead>
              <tr>
                <th>Horário</th>
                <th>Nome</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>7:15</td>
                <td>Leite</td>
                <td>R$10,00</td>
              </tr>
              <tr>
                <td>8:03</td>
                <td>Padaria</td>
                <td>R$15,00</td>
              </tr>
              <tr>
                <td>12:03</td>
                <td>Entregas</td>
                <td>R$35,00</td>
              </tr>
              <tr>
                <td>7:15</td>
                <td>Leite</td>
                <td>R$10,00</td>
              </tr>
              <tr>
                <td>8:03</td>
                <td>Padaria</td>
                <td>R$15,00</td>
              </tr>
              <tr>
                <td>12:03</td>
                <td>Entregas</td>
                <td>R$35,00</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>Total</td>
                <td>R$60,00</td>
              </tr>
            </tfoot>
          </table>
        </section>
      </main>
    </>
  );
}

export default Flux;
