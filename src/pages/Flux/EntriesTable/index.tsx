import React from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { Entry } from '../../../api/DailyFlux/DailyFluxController';
import { CategoryType } from '../../../api/Categories/CategoriesController';
import { getTimeFormated } from '../../../services/DateServices';

interface EntriesTableProps {
  entries: Array<Entry>;
  handleDeleteEntry: (time: number) => void;
}

const EntriesTable: React.FC<EntriesTableProps> = ({
  entries,
  handleDeleteEntry,
}) => {
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
          <th></th>
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
              key={entry.time.getTime()}
            >
              <td>{getTimeFormated(entry.time)}</td>
              <td>{entry.category.name}</td>
              <td>{entry.value.toFixed(2)}</td>
              <td>
                <FontAwesomeIcon
                  className="delete-button"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Tem certeza que deseja deletar esta entrada?'
                      )
                    ) {
                      handleDeleteEntry(entry.time.getTime());
                    }
                  }}
                  icon={faTrashAlt}
                  size="lg"
                  color="red"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr className="negative-value">
          <td colSpan={2}>Total Despesas:</td>
          <td colSpan={2}>{`R$${expensesTotal.toFixed(2)}`}</td>
        </tr>
        <tr className="positive-value">
          <td colSpan={2}>Total Vendas:</td>
          <td colSpan={2}>{`R$${dailyTotal.toFixed(2)}`}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default EntriesTable;
