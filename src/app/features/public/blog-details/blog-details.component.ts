import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { blogpost } from '../../blog-post/Models/blog-post.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit{

  /**
   *
   */
  url :string | null = null;
  blogpost$?:Observable<blogpost>;
  constructor(private route:ActivatedRoute,
   private blogpostservice:BlogPostService ) {
    
    
  }
  ngOnInit(): void {
    this.route.paramMap
    .subscribe({
      next:(params)=>{
       this.url= params.get('url');
      }
    });
    if(this.url)
    {
     this.blogpost$= this.blogpostservice.getblogpostbyurlhandle(this.url);

    }
  }
}
