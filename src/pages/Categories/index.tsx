import React, { useState, useEffect } from 'react';
import CategoriesController, {
  Category,
} from '../../api/Categories/CategoriesController';
import Header from '../../components/Header';
import BasicInput from '../../components/BasicInput';
import BasicButton from '../../components/BasicButton';
import CategoriesTable from './CategoriesTable';

interface CategoriesProps {
  categoriesController: CategoriesController;
}

const Categories: React.FC<CategoriesProps> = ({ categoriesController }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);

  const handleNewName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  useEffect(() => {
    setCategoriesList(categoriesController.getCategories());
  }, []);

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
            <BasicButton label="Enviar" name="submit-button" type="submit" />
            <CategoriesTable categories={categoriesList} />
          </form>
        </section>
      </main>
    </>
  );
};

export default Categories;
