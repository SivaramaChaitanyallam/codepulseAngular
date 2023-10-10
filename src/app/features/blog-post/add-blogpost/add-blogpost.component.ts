import { Component, OnDestroy, OnInit } from '@angular/core';
import { Addblogpost } from '../Models/add-blogpost.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { category } from '../../category/models/category.model';
import { Observable, Subscription } from 'rxjs';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit,OnDestroy{
  model:Addblogpost;
  isimageselectorvisible:boolean=false;
  categories$?:Observable<category[]>;
  imageselectorsubscription?:Subscription;
  /**
   *
   */
  constructor(private blogpostservie:BlogPostService ,private router:Router,private categoryservice:CategoryService,
    private imageservice:ImageService) {
    this.model={
      title:'',
      shortdescription:'',
      urlhandle:'',
      content:'',
      featureimageurl:'',
      author:'',
      isvisible:true,
      publishedate:new Date(),
      categories:[]
    }
  }
  
  ngOnInit(): void {
   this.categories$= this.categoryservice.getallcategories();
   this.imageselectorsubscription= this.imageservice.onselectimage()
   .subscribe({
    next:(selectedimage)=>{
      this.model.featureimageurl=selectedimage.url;
      this.closeimageselector();
    }
   })
  }
  onformsubmit():void{
    console.log(this.model);
    this.blogpostservie.createblogpost(this.model)
    .subscribe({
      //vi 60
      next: (response) => {
        this.router.navigateByUrl('admin/blogpost');
      }
    })
  }
  openimageselector():void{
    this.isimageselectorvisible=true;

  }
  closeimageselector():void{
    this.isimageselectorvisible=false;
  }
  ngOnDestroy(): void {
    this.imageselectorsubscription?.unsubscribe();
  }

}
