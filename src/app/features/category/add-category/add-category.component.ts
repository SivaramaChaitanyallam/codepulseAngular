import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy {
  model:AddCategoryRequest;
  private addcategorysubscription?:Subscription;
  constructor(private categoryservices:CategoryService,
    private router:Router)
  {
    this.model={
      name:'',
      urlHandle:''
    };
  }
  
  onformsubmit(){
   this.addcategorysubscription= this.categoryservices.addCategory(this.model)
    .subscribe({
      next:(response)=>{
      // console.log('this was succesful');
      this.router.navigateByUrl('admin/categories');

      }
      
    })
  }
  ngOnDestroy(): void {
    this.addcategorysubscription?.unsubscribe();
  }

}
