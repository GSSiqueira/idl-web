import React from 'react';
import './styles.css';
import '../../../components/BasicTable/styles.css';
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
  const totalSalesOfTheDay = entries.reduce((total, entry) => {
    return (
      total +
      entry.value * (entry.category.type === CategoryType.EntradaCaixa ? -1 : 1)
    );
  }, 0);
  const expensesTotal = entries.reduce((total, entry) => {
    return (
      total +
      entry.value * (entry.category.type === CategoryType.DespesaDiaria ? 1 : 0)
    );
  }, 0);

  return (
    <table className="basic-table">
      <thead>
        <tr>
          <th>Horário</th>
          <th>Nome</th>
          <th>Valor</th>
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
              key={entry.date.getTime()}
            >
              <td>{getTimeFormated(entry.date)}</td>
              <td>{entry.category.name}</td>
              <td>{`R$ ${entry.value.toFixed(2)}`}</td>
              <td>
                <FontAwesomeIcon
                  className="delete-button"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Tem certeza que deseja deletar esta entrada?'
                      )
                    ) {
                      handleDeleteEntry(entry.date.getTime());
                    }
                  }}
                  icon={faTrashAlt}
                  size="lg"
                  color="#3c3c5d"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr className="negative-value">
          <td colSpan={2}>Total Despesas:</td>
          <td colSpan={2}>{`R$ ${expensesTotal.toFixed(2)}`}</td>
        </tr>
        <tr className="positive-value">
          <td colSpan={2}>Total Vendas:</td>
          <td colSpan={2}>{`R$ ${totalSalesOfTheDay.toFixed(2)}`}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default EntriesTable;
