import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { category } from '../models/category.model';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }
  addCategory(model:AddCategoryRequest):Observable<void>{
    return this.http.post<void>(`${environment.apiBaseurl}/api/categories`,model);
  }

  getallcategories():Observable<category[]>{
     return this.http.get<category[]>(`${environment.apiBaseurl}/api/categories`);
  }
  getcategorybyid(id:string):Observable<category>{
   return this.http.get<category>(`${environment.apiBaseurl}/api/categories/${id}`);

  }
  updatecategory(id:string,UpdateCategoryRequest:UpdateCategoryRequest):Observable<category>{
   return this.http.put<category>(`${environment.apiBaseurl}/api/categories/${id}`,UpdateCategoryRequest);

  }
deletecategory(id:string):Observable<category>{
  return this.http.delete<category>(`${environment.apiBaseurl}/api/categories/${id}`)

}
}
