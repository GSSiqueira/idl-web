import { IBasicCategory } from '../../entities/Category/IBasicCategory';
import { CategoryType, Category } from '../../entities/Category/Category';
import { HTTPClient } from '../../services/HTTPClient';

export interface CategoryDTO {
  name: string;
  type: CategoryType;
}

export const CategoryTypeList: IBasicCategory[] = [
  {
    id: CategoryType.EntradaCaixa,
    name: 'Entrada no Caixa',
  },
  {
    id: CategoryType.FechamentoCaixa,
    name: 'Fechamento de Caixa',
  },
  {
    id: CategoryType.DespesaDiaria,
    name: 'Despesa Diaria',
  },
  {
    id: CategoryType.DespesaFixa,
    name: 'Despesa Fixa',
  },
];

class CategoriesController {
  constructor(private db: HTTPClient) {}

  async getAllCategories() {
    return await this.db.getAllCategories().then((response) => response.data);
  }

  async getDailyCategories() {
    return (await this.getAllCategories()).filter((category) => {
      return category.type !== CategoryType.DespesaFixa;
    });
  }

  async getRegularExpenseCategories() {
    return (await this.getAllCategories()).filter((category) => {
      return category.type === CategoryType.DespesaFixa;
    });
  }

  async getCategoryByType(type: CategoryType) {
    return (await this.getAllCategories()).filter((category) => {
      return category.type === type;
    });
  }

  async addCategory(categoryData: CategoryDTO) {
    return await this.db
      .addNewCategory(categoryData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw new Error('Error adding new category.');
      });
  }

  async removeCategory(id: number) {
    return await this.db
      .removeCategory(id)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
        throw new Error('Error adding new category.');
      });
  }
}

export default CategoriesController;
