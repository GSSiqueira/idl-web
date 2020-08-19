import { Category, CategoryType } from '../Categories/CategoriesController';

export interface Entry {
  time: string;
  value: number;
  category: Category;
}

class DailyFluxController {
  entries: Array<Entry> = [];

  constructor() {
    this.entries = [
      {
        time: '7:05',
        value: 1000.0,
        category: {
          id: 1,
          name: 'Entrada no Caixa',
          type: CategoryType.EntradaCaixa,
        },
      },
      {
        time: '8:05',
        value: 10.0,
        category: {
          id: 4,
          name: 'Padaria',
          type: CategoryType.DespesaDiaria,
        },
      },
      {
        time: '12:05',
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
