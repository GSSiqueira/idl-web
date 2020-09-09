import { Category } from '../Category/Category';
import { getTimeFormated } from '../../services/DateServices';

export class Entry {
  constructor(
    private id: number,
    private date: Date,
    private value: number,
    private category: Category
  ) {}

  getId() {
    return this.id;
  }
  getDate() {
    return this.date;
  }
  getValue() {
    return this.value;
  }
  getCategory() {
    return this.category;
  }

  getFormatedTime() {
    return getTimeFormated(this.date);
  }
  getFormatedDate() {
    return this.date.toLocaleString();
  }

  getFormatedValue() {
    return `R$ ${this.value.toFixed(2)}`;
  }
}
