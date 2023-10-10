import { Injectable } from '@angular/core';
import { Addblogpost } from '../Models/add-blogpost.model';
import { Observable } from 'rxjs';
import { blogpost } from '../Models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { updateblogpost } from '../Models/update-blogpost.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http:HttpClient) { }
  createblogpost(data:Addblogpost): Observable<blogpost>{
    return this.http.post<blogpost>(`${environment.apiBaseurl}/api/blogposts`,data);
  }
  getAllBlogposts(): Observable<blogpost[]>{
   return this.http.get<blogpost[]>(`${environment.apiBaseurl}/api/blogposts`);
  }
  getblogpostbyid(id:string):Observable<blogpost>
  {
    return this.http.get<blogpost>(`${environment.apiBaseurl}/api/blogposts/${id}`);
  }
  getblogpostbyurlhandle(urlHandle:string):Observable<blogpost>
  {
    return this.http.get<blogpost>(`${environment.apiBaseurl}/api/blogposts/${urlHandle}`);
  }
  updateblogpost(id:string,updateblogpost:updateblogpost):Observable<blogpost>{
    return this.http.put<blogpost>(`${environment.apiBaseurl}/api/blogposts/${id}`,updateblogpost);
  }
  deleteblogpost(id:string):Observable<blogpost>
  {
    return this.http.delete<blogpost>(`${environment.apiBaseurl}/api/blogposts/${id}`);
  }
}
