import { getSQLDate } from '../../services/DateServices';
import { Entry } from '../../entities/Entry/Entry';
import { HTTPClient } from '../../services/HTTPClient';

export interface EntryDTO {
  date: string;
  time: string;
  value: number;
  categoryId: number;
}

class EntriesController {
  constructor(private db: HTTPClient) {}

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

  async removeEntry(idToDelete: number) {
    return await this.db.removeEntry(idToDelete);
  }
}

export default EntriesController;
