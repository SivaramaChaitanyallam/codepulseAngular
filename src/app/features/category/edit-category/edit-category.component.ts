import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit , OnDestroy{
  id: string | null = null;
  paramsubsciption?:Subscription;
  editcategorysubscription?:Subscription;
  deletecategorysubscription?:Subscription;
  category?: category;
  constructor(private route:ActivatedRoute,
    private categoryservice:CategoryService,
    private router:Router){
   
  }
  
  ngOnInit(): void {
   this.paramsubsciption =this.route.paramMap.subscribe({
      next:(params)=>{
       this.id= params.get('id');
       if(this.id)
       {
          this.categoryservice.getcategorybyid(this.id)
          .subscribe({
            next:(response)=>{
             this.category=response;
            }
          });
       }
      }
    });
  }
  onformsubmit():void{
    //console.log(this.category);
    const UpdateCategoryRequest :UpdateCategoryRequest={
      name:this.category?.name ?? '',
      urlHandle : this.category?.urlHandle ?? ''

    };
    if(this.id){

    this.editcategorysubscription= this.categoryservice.updatecategory(this.id,UpdateCategoryRequest)
    .subscribe({
      next:(response)=>{
       this.router.navigateByUrl('/admin/categories');
      }
    });
    }
  }
  Ondelete():void{
    if(this.id)
    {
      this.categoryservice.deletecategory(this.id)
      .subscribe({
        next:(response)=>{
          this.router.navigateByUrl('/admin/categories');
        }
      });
    }
  }
 

  ngOnDestroy(): void {
    this.paramsubsciption?.unsubscribe();
    this.editcategorysubscription?.unsubscribe();
    this.deletecategorysubscription?.unsubscribe();
  }

}
