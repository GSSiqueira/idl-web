import Axios, { AxiosInstance } from 'axios';
import { CategoryDTO } from '../controllers/Categories/CategoriesController';
import { EntryDTO } from '../controllers/Entries/EntriesController';
import { Category } from '../entities/Category/Category';
import { Entry } from '../entities/Entry/Entry';
import { getToken } from './AuthService';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export class HTTPClient {
  private connection: AxiosInstance;

  constructor() {
    this.connection = Axios.create({
      baseURL: 'http://localhost:3030',
      timeout: 20000,
      headers: { 'X-Custom-Header': 'foobar' },
    });

    this.connection.interceptors.request.use(async (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  getAllCategories() {
    return this.connection.get<Category[]>('/categorias');
  }

  addNewCategory(data: CategoryDTO) {
    return this.connection.post<Category>('/categorias', { ...data });
  }

  removeCategory(id: number) {
    return this.connection.delete(`/categorias/${id}`);
  }

  addNewEntry(data: EntryDTO) {
    return this.connection.post<Entry>(`/entradas`, { ...data });
  }

  removeEntry(id: number) {
    return this.connection.delete(`/entradas/${id}`);
  }

  getDailyEntries(date: string) {
    return this.connection.get<Entry[]>(`/entradas/data/${date}`);
  }

  getRegularExpenseEntries(date: string) {
    return this.connection.get<Entry[]>(`/fixos/${date}`);
  }

  validateUser(username: string, password: string) {
    return this.connection.post(`/auth`, { username, password });
  }
}
