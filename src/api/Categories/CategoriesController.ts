export interface Category {
  id: number;
  name: string;
  type: CategoryType;
}

export enum CategoryType {
  EntradaCaixa = 0,
  FechamentoCaixa = 1,
  DespesaDiaria = 2,
  DespesaFixa = 3,
}

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

  getCategories() {
    return this.categories;
  }
}

export default CategoriesController;
