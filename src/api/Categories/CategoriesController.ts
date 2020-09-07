import { IBasicCategory } from '../../entities/Category/IBasicCategory';
import { CategoryType, Category } from '../../entities/Category/Category';

export const CategoryTypes: IBasicCategory[] = [
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
  maxId: number = 7;

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

  getNextIdNumber(): number {
    this.maxId++;
    return this.maxId;
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

  async addCategory(category: Category) {
    await this.categories.push(category);
  }
}

export default CategoriesController;
