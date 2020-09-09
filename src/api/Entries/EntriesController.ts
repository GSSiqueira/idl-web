import { getISODate, getISOMonth } from '../../services/DateServices';
import { CategoryType } from '../../entities/Category/Category';
import { Entry } from '../../entities/Entry/Entry';

export interface EntryDTO {
  date: Date;
  value: number;
  categoryId: number;
}

class EntriesController {
  entries: Array<Entry> = [];

  constructor() {
    this.entries = [
      new Entry(1, new Date(1598131624143), 1000.0, {
        id: 1,
        name: 'Entrada no Caixa',
        type: CategoryType.EntradaCaixa,
      }),
      new Entry(2, new Date(1598121324149), 1000.0, {
        id: 4,
        name: 'Padaria',
        type: CategoryType.DespesaDiaria,
      }),
      new Entry(3, new Date(1598134324443), 1000.0, {
        id: 2,
        name: 'Caixa Final',
        type: CategoryType.FechamentoCaixa,
      }),
      new Entry(4, new Date(), 1000.0, {
        id: 7,
        name: 'Camarão',
        type: CategoryType.DespesaFixa,
      }),
    ];
  }

  getDailyEntriesByDate(date: Date): Array<Entry> {
    const dateEntries = this.entries.filter((entry) => {
      return (
        getISODate(entry.getDate()) === getISODate(date) &&
        entry.getCategory().type !== CategoryType.DespesaFixa
      );
    }); //Fake Method, should be replaced by API call
    return dateEntries;
  }

  getRegularExpensesEntriesByMonth(date: Date): Array<Entry> {
    const dateEntries = this.entries.filter((entry) => {
      return (
        getISOMonth(entry.getDate()) === getISOMonth(date) &&
        entry.getCategory().type === CategoryType.DespesaFixa
      );
    }); //Fake Method, should be replaced by API call
    return dateEntries;
  }

  addEntry(entryData: EntryDTO) {
    const newEntry = new Entry(Math.random(), entryData.date, entryData.value, {
      id: 99,
      name: 'Categoria Teste',
      type: CategoryType.DespesaDiaria,
    }); //Fake Method, should be replaced by API call
    this.entries.push(newEntry);
    return newEntry;
  }

  removeEntry(idToDelete: number) {
    this.entries = this.entries.filter((entry) => {
      return entry.getId() !== idToDelete;
    });
    return true;
  }
}

export default EntriesController;
