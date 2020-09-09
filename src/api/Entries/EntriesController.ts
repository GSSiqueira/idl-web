import { getISODate, getISOMonth } from '../../services/DateServices';
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
      {
        id: 3,
        date: new Date(),
        value: 300.0,
        category: {
          id: 7,
          name: 'Camarão',
          type: CategoryType.DespesaFixa,
        },
      },
    ];
  }

  getDailyEntriesByDate(date: Date): Array<Entry> {
    const dateEntries = this.entries.filter((entry) => {
      return (
        getISODate(entry.date) === getISODate(date) &&
        entry.category.type !== CategoryType.DespesaFixa
      );
    });
    return dateEntries;
  }

  getRegularExpensesEntriesByMonth(date: Date): Array<Entry> {
    const dateEntries = this.entries.filter((entry) => {
      return (
        getISOMonth(entry.date) === getISOMonth(date) &&
        entry.category.type === CategoryType.DespesaFixa
      );
    });
    return dateEntries;
  }

  addEntry(newEntry: Entry) {
    this.entries.push(newEntry);
  }
}

export default EntriesController;
