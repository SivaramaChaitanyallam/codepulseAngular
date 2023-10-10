import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { category } from '../models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent  implements OnInit {
 // categories?: category[];
 categories$?:Observable<category[]>;
  constructor(private categoryservices:CategoryService){

  }
  ngOnInit(): void {
   this.categories$= this.categoryservices.getallcategories();

    // .subscribe({
    //   next:(response) => {
    //     this.categories=response;
    //   }
    // })
  }

}
