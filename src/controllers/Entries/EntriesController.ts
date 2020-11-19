import {
  getISODate,
  getISOMonth,
  getSQLDate,
} from '../../services/DateServices';
import { CategoryType } from '../../entities/Category/Category';
import { Entry } from '../../entities/Entry/Entry';
import { HTTPClient } from '../../services/HTTPClient';

export interface EntryDTO {
  date: string;
  time: string;
  value: number;
  categoryId: number;
}

class EntriesController {
  entries: Array<Entry> = [];

  constructor(private db: HTTPClient) {
    this.entries = [
      new Entry(
        1,
        new Date(1598131624143).toISOString(),
        new Date(1598131624143).toISOString(),
        1000.0,
        1,
        {
          id: 1,
          name: 'Entrada no Caixa',
          type: CategoryType.EntradaCaixa,
        }
      ),
      new Entry(
        2,
        new Date(1598121324149).toISOString(),
        new Date(1598121324149).toISOString(),
        1000.0,
        1,
        {
          id: 4,
          name: 'Padaria',
          type: CategoryType.DespesaDiaria,
        }
      ),
      new Entry(
        3,
        new Date(1598134324443).toISOString(),
        new Date(1598134324443).toISOString(),
        1000.0,
        1,
        {
          id: 2,
          name: 'Caixa Final',
          type: CategoryType.FechamentoCaixa,
        }
      ),
      new Entry(
        4,
        new Date().toISOString(),
        new Date().toISOString(),
        1000.0,
        1,
        {
          id: 7,
          name: 'Camarão',
          type: CategoryType.DespesaFixa,
        }
      ),
    ];
  }

  async getDailyEntriesByDate(date: Date) {
    return await this.db.getDailyEntries(getSQLDate(date)).then((response) => {
      let entryList = response.data.map((entry) => {
        return new Entry(
          entry.id,
          entry.date,
          entry.time,
          entry.value,
          entry.categoryId,
          entry.category
        );
      });
      return entryList;
    });
  }

  async getRegularExpensesEntriesByMonth(date: Date) {
    return await this.db
      .getRegularExpenseEntries(getSQLDate(date))
      .then((response) => {
        let entryList = response.data.map((entry) => {
          return new Entry(
            entry.id,
            entry.date,
            entry.time,
            entry.value,
            entry.categoryId,
            entry.category
          );
        });
        return entryList;
      });
  }

  async addEntry(entryData: EntryDTO) {
    return await this.db.addNewEntry(entryData);
  }

  removeEntry(idToDelete: number) {
    this.entries = this.entries.filter((entry) => {
      return entry.getId() !== idToDelete;
    });
    return true;
  }
}

export default EntriesController;
