import React from 'react';
import './styles.css';

function EntriesTable() {
  return (
    <table className="entry-table">
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
        <tr>
          <td>7:03</td>
          <td>Really long text name just for lolzies</td>
          <td>R$10,00</td>
        </tr>
        <tr>
          <td>7:03</td>
          <td>Amazingly even bigger Really long text name just for lolzies</td>
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
  );
}

export default EntriesTable;
