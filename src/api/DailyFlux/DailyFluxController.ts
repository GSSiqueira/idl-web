import { Category, CategoryType } from '../Categories/CategoriesController';

export interface Entry {
  id?: number;
  time: Date;
  value: number;
  category: Category;
}

class DailyFluxController {
  entries: Array<Entry> = [];

  constructor() {
    this.entries = [
      {
        id: 1,
        time: new Date(1598131624143),
        value: 1000.0,
        category: {
          id: 1,
          name: 'Entrada no Caixa',
          type: CategoryType.EntradaCaixa,
        },
      },
      {
        id: 2,
        time: new Date(1598121324149),
        value: 10.0,
        category: {
          id: 4,
          name: 'Padaria',
          type: CategoryType.DespesaDiaria,
        },
      },
      {
        id: 3,
        time: new Date(1598134324443),
        value: 3000.0,
        category: {
          id: 2,
          name: 'Caixa Final',
          type: CategoryType.FechamentoCaixa,
        },
      },
    ];
  }

  getEntriesList(): Array<Entry> {
    return this.entries;
  }

  addEntry(newEntry: Entry) {
    this.entries.push(newEntry);
  }
}

export default DailyFluxController;
