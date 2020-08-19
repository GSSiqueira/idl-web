import React from 'react';
import './styles.css';

import { Entry } from '../../../api/DailyFlux/DailyFluxController';

interface EntriesTableProps {
  entries: Array<Entry>;
}

const EntriesTable: React.FC<EntriesTableProps> = ({ entries }) => {
  const dailyTotal = Math.abs(
    entries.reduce((total, entry) => {
      return total + entry.value * (entry.expense ? -1 : 1);
    }, 0)
  );

  return (
    <table className="entry-table">
      <thead>
        <tr>
          <th>Horário</th>
          <th>Nome</th>
          <th>Valor (R$)</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => {
          return (
            <tr className={entry.expense ? 'negative-value' : 'positive-value'}>
              <td>{entry.time}</td>
              <td>{entry.name}</td>
              <td>{entry.value.toFixed(2)}</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2}>Total Vendas:</td>
          <td>{dailyTotal.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default EntriesTable;
