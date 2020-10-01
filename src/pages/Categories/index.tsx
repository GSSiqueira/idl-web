import React, { useState, useEffect } from 'react';
import './styles.css';

import CategoriesController, {
  CategoryTypeList,
  CategoryDTO,
} from '../../controllers/Categories/CategoriesController';
import Header from '../../components/Header';
import BasicInput from '../../components/BasicInput';
import BasicButton from '../../components/BasicButton';
import CategoriesTable from './CategoriesTable';
import CategoriesSelect from '../../components/CategoriesSelect';
import { Category } from '../../entities/Category/Category';

interface CategoriesProps {
  categoriesController: CategoriesController;
}

const Categories: React.FC<CategoriesProps> = ({ categoriesController }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);

  useEffect(() => {
    categoriesController
      .getAllCategories()
      .then((categoriesListFromApi) => {
        setCategoriesList(categoriesListFromApi);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleNewName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleNewType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryType(event.target.value);
  };

  const handleDeleteCategory = (idToDelete: number) => {
    categoriesController
      .removeCategory(idToDelete)
      .then((response) => {
        const newCategoriesList = categoriesList.filter((category) => {
          return category.id !== idToDelete;
        });
        setCategoriesList(newCategoriesList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newCategoryData = getDataValuesIfValid();
      categoriesController.addCategory(newCategoryData).then((newCategory) => {
        setCategoriesList([...categoriesList, newCategory]);
        clearFields();
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const clearFields = () => {
    setCategoryName('');
    setCategoryType('');
  };

  const getDataValuesIfValid = (): CategoryDTO => {
    if (categoryName && categoryType) {
      const values: CategoryDTO = {
        name: categoryName,
        type: parseInt(categoryType),
      };
      return values;
    } else {
      throw new Error('Invalid Data Values for a new Category!');
    }
  };

  return (
    <>
      <Header />
      <main className="categories-content container">
        <h1 className="main-title">Lista de Categorias</h1>
        <section className="categories-section">
          <form onSubmit={handleSubmit}>
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
              categories={CategoryTypeList}
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
