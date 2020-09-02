import React, { useState, useEffect } from 'react';
import './styles.css';

import CategoriesController, {
  Category,
  CategoryTypes,
} from '../../api/Categories/CategoriesController';
import Header from '../../components/Header';
import BasicInput from '../../components/BasicInput';
import BasicButton from '../../components/BasicButton';
import CategoriesTable from './CategoriesTable';
import CategoriesSelect from '../../components/CategoriesSelect';

interface CategoriesProps {
  categoriesController: CategoriesController;
}

const Categories: React.FC<CategoriesProps> = ({ categoriesController }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);

  useEffect(() => {
    setCategoriesList(categoriesController.getCategories());
  }, []);

  const handleNewName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleNewType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryType(event.target.value);
  };

  const handleDeleteCategory = (id: number) => {
    const newCategoriesList = categoriesList.filter((category) => {
      return category.id !== id;
    });
    setCategoriesList(newCategoriesList);
  };

  return (
    <>
      <Header />
      <main className="categories-content container">
        <h1 className="main-title">Lista de Categorias</h1>
        <section className="categories-section">
          <form>
            <BasicInput
              label="Nome"
              type="text"
              name="category-name"
              placeholder="Digite o nome da categoria"
              value={categoryName}
              handleNewValue={handleNewName}
              required
            />
            <CategoriesSelect
              label="Tipo de Categoria:"
              name="category-type"
              categories={CategoryTypes}
              handleNewCategory={handleNewType}
              value={categoryType}
            />
            <BasicButton label="Enviar" name="submit-button" type="submit" />
          </form>
          <CategoriesTable
            categories={categoriesList}
            handleDeleteCategory={handleDeleteCategory}
          />
        </section>
      </main>
    </>
  );
};

export default Categories;
