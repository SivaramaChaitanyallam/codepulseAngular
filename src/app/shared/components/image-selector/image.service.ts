import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { blogimage } from '../../models/blog-image.models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
   selectedimage:BehaviorSubject<blogimage>=new BehaviorSubject<blogimage>({
    id:'',
    fileextension:'',
    filename:'',
    title:'',
    url:''
   });
  constructor(private http:HttpClient) { }
  uploadimage(file:File,filename:string,title:string):Observable<blogimage>{
    const formdata=new FormData();
    formdata.append('file',file);
    formdata.append('filename',filename);
    formdata.append('title',title);
   return this.http.post<blogimage>(`${environment.apiBaseurl}/api/images`,formdata);
  }
  getallimages():Observable<blogimage[]>{
    return this.http.get<blogimage[]>(`${environment.apiBaseurl}/api/images`);
  }
  selectimage(image:blogimage):void{
    this.selectedimage.next(image);
  }
  onselectimage():Observable<blogimage>{
    return this.selectedimage.asObservable()
  }
}
