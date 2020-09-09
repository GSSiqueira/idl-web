import React from 'react';
import './styles.css';
import '../../../components/BasicTable/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { Entry } from '../../../api/Entries/EntriesController';
import { CategoryType } from '../../../entities/Category/Category';

interface RegularExpensesTableProps {
  entries: Array<Entry>;
  handleDeleteEntry: (time: number) => void;
}

const RegularExpensesTable: React.FC<RegularExpensesTableProps> = ({
  entries,
  handleDeleteEntry,
}) => {
  const expensesTotal = entries.reduce((total, entry) => {
    return total + entry.value;
  }, 0);

  return (
    <table className="basic-table">
      <thead>
        <tr>
          <th>Data</th>
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
              <td>{entry.date.toLocaleString()}</td>
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
      </tfoot>
    </table>
  );
};

export default RegularExpensesTable;
