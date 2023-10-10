import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable } from 'rxjs';
import { blogpost } from '../Models/blog-post.model';



@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit{
  /**
   *
   */
  blogposts$?:Observable<blogpost[]> 
  constructor(private blogpostservice:BlogPostService) {
    
    
  }
  ngOnInit(): void {
    //get all blog posts from api
   this.blogposts$= this.blogpostservice.getAllBlogposts();
  }

}
