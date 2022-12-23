import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  public addCategory(category: any) {
    return this.httpClient.post(`${baseUrl}/category/`, category);
  }

  public getAllCategories() {
    return this.httpClient.get(`${baseUrl}/category/`);
  }

  public getCategory(categoryId: number) {
    return this.httpClient.get(`${baseUrl}/category/${categoryId}`);
  }

  public updateCategory(category: any) {
    return this.httpClient.put(`${baseUrl}/category/`, category);
  }

  public deleteCategory(categoryId: number) {
    return this.httpClient.delete(`${baseUrl}/category/${categoryId}`);
  }

}
