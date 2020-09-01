import React, { InputHTMLAttributes } from 'react';
import './styles.css';
import {
  Category,
  SelectCategory,
} from '../../api/Categories/CategoriesController';

interface BasicInputProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  categories: Array<SelectCategory>;
  handleNewCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategoriesSelect: React.FC<BasicInputProps> = ({
  label,
  name,
  categories,
  handleNewCategory,
  ...rest
}) => {
  return (
    <div className={`select-group ${name}`}>
      <label className="select-input-label" htmlFor={name}>
        {label}
      </label>
      <select
        className="select-input"
        type="select"
        name={name}
        id={name}
        onChange={handleNewCategory}
        {...rest}
      >
        <option value="" disabled>
          Selecione a categoria
        </option>
        {categories.map((category) => {
          return (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CategoriesSelect;
