export interface Entry {
  time: string;
  name: string;
  value: number;
}

class DailyFluxController {
  getEntriesList(): Array<Entry> {
    return [
      {
        time: '7:05',
        name: 'Caixa',
        value: 1000.0,
      },
      {
        time: '7:15',
        name: 'Padaria',
        value: -20.0,
      },
      {
        time: '8:05',
        name: 'Leite',
        value: -10.0,
      },
      {
        time: '9:30',
        name: 'Caixa',
        value: 100.0,
      },
      {
        time: '12:05',
        name: 'Sucos',
        value: -50.0,
      },
      {
        time: '7:05',
        name: 'Caixa',
        value: 1000.0,
      },
      {
        time: '7:15',
        name: 'Padaria',
        value: -20.0,
      },
      {
        time: '8:05',
        name: 'Leite',
        value: -10.0,
      },
      {
        time: '9:30',
        name: 'Caixa',
        value: 100.0,
      },
      {
        time: '12:05',
        name: 'Sucos',
        value: -50.0,
      },
    ];
  }
}

export default DailyFluxController;
