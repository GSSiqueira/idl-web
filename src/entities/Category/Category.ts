import { IBasicCategory } from './IBasicCategory';

export class Category implements IBasicCategory {
  id: number = 0;
  name: string = '';
  type: CategoryType = 0;

  constructor(id: number, name: string, type: CategoryType) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}

export enum CategoryType {
  EntradaCaixa = 0,
  FechamentoCaixa = 1,
  DespesaDiaria = 2,
  DespesaFixa = 3,
}
