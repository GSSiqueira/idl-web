export interface Entry {
  time: string;
  name: string;
  value: number;
  expense: boolean;
}

class DailyFluxController {
  entries: Array<Entry> = [];

  constructor() {
    this.entries = [
      {
        time: '7:05',
        name: 'Caixa',
        value: 1000.0,
        expense: false,
      },
      {
        time: '7:15',
        name: 'Padaria',
        value: 20.0,
        expense: true,
      },
      {
        time: '8:05',
        name: 'Leite',
        value: 10.0,
        expense: true,
      },
      {
        time: '9:30',
        name: 'Caixa',
        value: 100.0,
        expense: false,
      },
      {
        time: '12:05',
        name: 'Sucos',
        value: 50.0,
        expense: true,
      },
      {
        time: '7:05',
        name: 'Caixa',
        value: 1000.0,
        expense: false,
      },
      {
        time: '7:15',
        name: 'Padaria',
        value: 20.0,
        expense: true,
      },
      {
        time: '8:05',
        name: 'Leite',
        value: 10.0,
        expense: true,
      },
      {
        time: '9:30',
        name: 'Caixa',
        value: 100.0,
        expense: false,
      },
      {
        time: '12:05',
        name: 'Sucos',
        value: 50.0,
        expense: true,
      },
      {
        time: '12:35',
        name: 'Vendas Cartão',
        value: 200.0,
        expense: true,
      },
      {
        time: '12:35',
        name: 'Caixa Final',
        value: 3000.0,
        expense: true,
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
