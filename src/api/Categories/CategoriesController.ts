import { IBasicCategory } from '../../entities/Category/IBasicCategory';
import { CategoryType, Category } from '../../entities/Category/Category';

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
  categories: Array<Category> = [];

  constructor() {
    this.categories = [
      {
        id: 1,
        name: 'Entrada no Caixa',
        type: CategoryType.EntradaCaixa,
      },
      {
        id: 2,
        name: 'Caixa Final',
        type: CategoryType.FechamentoCaixa,
      },
      {
        id: 3,
        name: 'Vendas Cartões',
        type: CategoryType.FechamentoCaixa,
      },
      {
        id: 4,
        name: 'Padaria',
        type: CategoryType.DespesaDiaria,
      },
      {
        id: 5,
        name: 'Extras',
        type: CategoryType.DespesaDiaria,
      },
      {
        id: 6,
        name: 'Compras',
        type: CategoryType.DespesaDiaria,
      },
      {
        id: 7,
        name: 'Camarão',
        type: CategoryType.DespesaFixa,
      },
    ];
  }

  async getAllCategories() {
    return await [...this.categories];
  }

  async getDailyCategories() {
    return await this.categories.filter((category) => {
      return category.type !== CategoryType.DespesaFixa;
    });
  }

  async getRegularExpenseCategories() {
    return await this.categories.filter((category) => {
      return category.type === CategoryType.DespesaFixa;
    });
  }

  async getCategoryByType(type: CategoryType) {
    return await this.categories.filter((category) => {
      return category.type === type;
    });
  }

  async addCategory(categoryData: CategoryDTO) {
    const newCategory = new Category(99, categoryData.name, categoryData.type);
    await this.categories.push(newCategory);
    return newCategory;
  }
}

export default CategoriesController;
