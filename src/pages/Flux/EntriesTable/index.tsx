import React from 'react';
import './styles.css';

import { Entry } from '../../../api/DailyFlux/DailyFluxController';

interface EntriesTableProps {
  entries: Array<Entry>;
}

const EntriesTable: React.FC<EntriesTableProps> = ({ entries }) => {
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
        {entries.map((entry) => {
          return (
            <tr
              className={entry.value < 0 ? 'negative-value' : 'positive-value'}
            >
              <td>{entry.time}</td>
              <td>{entry.name}</td>
              <td>{entry.value}</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2}>Total</td>
          <td>R$1010,00</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default EntriesTable;
