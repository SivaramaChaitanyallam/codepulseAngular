import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouteReuseStrategy, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { blogpost } from '../Models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { category } from '../../category/models/category.model';
import { updateblogpost } from '../Models/update-blogpost.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit,OnDestroy{
  id:string| null=null;
  model?:blogpost;
  categories$?:Observable<category[]>;
  selectedcategories?:string[];
  isimageselectorvisible:boolean=false;
  routesubscription?:Subscription;
  updateblogpostsubscription?:Subscription;
  getblogpostsubscription?:Subscription;
  deleteblogpostsubscription?:Subscription;
  imageselectsubscription?:Subscription;

  constructor(private route:ActivatedRoute,
    private blogpostservice:BlogPostService,
    private categoryservice:CategoryService,
    private router:Router,
    private imageservice:ImageService) {
    
    
  }
  
  ngOnInit(): void {
    
   this.categories$ = this.categoryservice.getallcategories(); 
    this.route.paramMap.subscribe({
      next:(params)=>{
      this.id=  params.get('id');
      //get blogpost from api
      if(this.id){
     this.getblogpostsubscription= this.blogpostservice.getblogpostbyid(this.id)
      .subscribe({
        next:(response)=>{
          this.model=response;
          this.selectedcategories=response.categories.map(x=>x.id);
        }
      });
      }
      this.imageservice.onselectimage()
      .subscribe({
        next:(response)=>{
          if(this.model){
            this.model.featureimageurl=response.url;
            this.isimageselectorvisible=false;
;          }
        }
      })
      }
    })
  }
  onformsubmit():void{
    //model to request object
    if(this.model && this.id)
    {
      var updateblogpost:updateblogpost={
        author:this.model.author,
        content:this.model.content,
        shortdescription:this.model.shortdescription,
        featureimageurl:this.model.featureimageurl,
        isvisible:this.model.isvisible,
        publishedate:this.model.publishedate,
        title:this.model.title,
        urlhandle:this.model.UrlHandle,
        categories:this.selectedcategories??[]
      };
     this.updateblogpostsubscription= this.blogpostservice.updateblogpost(this.id,updateblogpost)
      .subscribe({
        next:(respose)=>{
         this.router.navigateByUrl('/admin/blogpost');
        }
      })
    }

  }
  openimageselector():void{
    this.isimageselectorvisible=true;

  }
  closeimageselector():void{
    this.isimageselectorvisible=false;
  }
  ondelete():void{
    if(this.id)
    {
     this.deleteblogpostsubscription= this.blogpostservice.deleteblogpost(this.id)
      .subscribe({
        next:(response)=>{
          this.router.navigateByUrl('/admin/blogpost');
        }
      })
    }
  }
  ngOnDestroy(): void {
    this.routesubscription?.unsubscribe();
    this.updateblogpostsubscription?.unsubscribe();
    this.getblogpostsubscription?.unsubscribe();
    this.deleteblogpostsubscription?.unsubscribe();
    this.imageselectsubscription?.unsubscribe();
  }

}
