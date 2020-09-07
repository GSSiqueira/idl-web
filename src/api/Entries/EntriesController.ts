import { getISODate } from '../../services/DateServices';
import { Category, CategoryType } from '../../entities/Category/Category';

export interface Entry {
  id?: number;
  date: Date;
  value: number;
  category: Category;
}

class EntriesController {
  entries: Array<Entry> = [];

  constructor() {
    this.entries = [
      {
        id: 1,
        date: new Date(1598131624143),
        value: 1000.0,
        category: {
          id: 1,
          name: 'Entrada no Caixa',
          type: CategoryType.EntradaCaixa,
        },
      },
      {
        id: 2,
        date: new Date(1598121324149),
        value: 10.0,
        category: {
          id: 4,
          name: 'Padaria',
          type: CategoryType.DespesaDiaria,
        },
      },
      {
        id: 3,
        date: new Date(1598134324443),
        value: 3000.0,
        category: {
          id: 2,
          name: 'Caixa Final',
          type: CategoryType.FechamentoCaixa,
        },
      },
    ];
  }

  getEntriesByDate(date: Date): Array<Entry> {
    const dateEntries = this.entries.filter((entry) => {
      return getISODate(entry.date) === getISODate(date);
    });
    return dateEntries;
  }

  addEntry(newEntry: Entry) {
    this.entries.push(newEntry);
  }
}

export default EntriesController;
