import { Category } from '../Category/Category';
import { getTimeFormated } from '../../services/DateServices';

export class Entry {
  id: number;
  date: string;
  time: string;
  value: number;
  categoryId: number;
  category: Category;
  jsDate: Date;

  constructor(
    id: number,
    date: string,
    time: string,
    value: number,
    categoryId: number,
    category: Category
  ) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.value = value;
    this.categoryId = categoryId;
    this.category = category;
    this.jsDate = new Date(date + ' ' + time);
  }

  getId() {
    return this.id;
  }
  getDate() {
    return this.jsDate;
  }
  getTime() {
    return this.time;
  }
  getValue() {
    return this.value;
  }
  getCategory() {
    return this.category;
  }

  getFormatedTime() {
    return getTimeFormated(this.jsDate);
  }
  getFormatedDate() {
    return this.date.toLocaleString();
  }

  getFormatedValue() {
    return `R$ ${this.value.toFixed(2)}`;
  }
}
