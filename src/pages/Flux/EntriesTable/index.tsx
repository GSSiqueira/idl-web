import React from 'react';
import './styles.css';

import { Entry } from '../../../api/DailyFlux/DailyFluxController';
import { CategoryType } from '../../../api/Categories/CategoriesController';

interface EntriesTableProps {
  entries: Array<Entry>;
}

const EntriesTable: React.FC<EntriesTableProps> = ({ entries }) => {
  const dailyTotal = Math.abs(
    entries.reduce((total, entry) => {
      return (
        total +
        entry.value *
          (entry.category.type === CategoryType.EntradaCaixa ? -1 : 1)
      );
    }, 0)
  );

  const expensesTotal = entries.reduce((total, entry) => {
    return (
      total +
      entry.value * (entry.category.type === CategoryType.DespesaDiaria ? 1 : 0)
    );
  }, 0);

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
            <tr
              className={
                entry.category.type === CategoryType.DespesaDiaria
                  ? 'negative-value'
                  : 'positive-value'
              }
            >
              <td>{entry.time}</td>
              <td>{entry.category.name}</td>
              <td>{entry.value.toFixed(2)}</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr className="negative-value">
          <td colSpan={2}>Total Despesas:</td>
          <td>{expensesTotal.toFixed(2)}</td>
        </tr>
        <tr className="positive-value">
          <td colSpan={2}>Total Vendas:</td>
          <td>{dailyTotal.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default EntriesTable;
