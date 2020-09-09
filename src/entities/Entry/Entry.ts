import { Category } from '../Category/Category';

export class Entry {
  constructor(
    private id: number,
    private name: string,
    private value: number,
    private category: Category
  ) {}
}
