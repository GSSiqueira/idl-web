import React from 'react';
import { Category } from '../../../api/Categories/CategoriesController';

interface CategoriesTableProps {
  categories: Array<Category>;
  //handleDeleteCategory: (id: number) => void;
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({ categories }) => {
  return (
    <table className="categories-table">
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
              <td>{category.type}</td>
              <td>Delete</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CategoriesTable;
