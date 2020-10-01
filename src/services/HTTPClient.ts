import Axios, { AxiosInstance } from 'axios';
import { CategoryDTO } from '../controllers/Categories/CategoriesController';
import { Category } from '../entities/Category/Category';

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
}
