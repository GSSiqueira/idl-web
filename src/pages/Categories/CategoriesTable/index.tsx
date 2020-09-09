import React from 'react';
import { CategoryTypeList } from '../../../api/Categories/CategoriesController';
import './styles.css';
import '../../../components/BasicTable/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../../../entities/Category/Category';

interface CategoriesTableProps {
  categories: Array<Category>;
  handleDeleteCategory: (id: number) => void;
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({
  categories,
  handleDeleteCategory,
}) => {
  return (
    <table className="basic-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Tipo</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => {
          return (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                {
                  CategoryTypeList.filter((type) => {
                    return type.id === category.type;
                  })[0].name
                }
              </td>
              <td>
                <FontAwesomeIcon
                  className="delete-button"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Tem certeza que deseja deletar esta categoria?'
                      )
                    ) {
                      handleDeleteCategory(category.id);
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
    </table>
  );
};

export default CategoriesTable;
