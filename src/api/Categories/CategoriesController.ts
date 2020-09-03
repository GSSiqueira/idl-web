export interface Category {
  id: number;
  name: string;
  type: CategoryType;
}

export interface SelectCategory {
  id: number;
  name: string;
}

export enum CategoryType {
  EntradaCaixa = 0,
  FechamentoCaixa = 1,
  DespesaDiaria = 2,
  DespesaFixa = 3,
}

export const CategoryTypes: SelectCategory[] = [
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
  maxId: number = 6;

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
    ];
  }

  getNextIdNumber(): number {
    this.maxId++;
    return this.maxId;
  }

  getAllCategories() {
    return [...this.categories];
  }

  getCategoryByType(type: CategoryType) {
    return this.categories.filter((category) => {
      return category.type === type;
    });
  }

  addCategory(category: Category) {
    this.categories.push(category);
  }
}

export default CategoriesController;
