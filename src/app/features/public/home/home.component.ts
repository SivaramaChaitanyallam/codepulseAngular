import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { blogpost } from '../../blog-post/Models/blog-post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /**
   *
   */
  blogs$?:Observable<blogpost[]>;
  constructor(private blogpostservice:BlogPostService) {
   
  }
  ngOnInit(): void {
  this.blogs$= this.blogpostservice.getAllBlogposts();
  }

}
