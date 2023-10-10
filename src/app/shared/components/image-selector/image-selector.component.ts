import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import { blogimage } from '../../models/blog-image.models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit {
 private file?:File;
 filename:string='';
 title:string='';
 images$?:Observable<blogimage[]>;
 @ViewChild('form',{static:false}) imageuploadform?:NgForm;

  /**
   *
   */
  constructor(private imageservice:ImageService) {
    
    
  }
  ngOnInit(): void {
    this.getimages();
  }
  onfileuploadchange(event:Event):void{
    const element=event.currentTarget as HTMLInputElement;
    this.file=element.files?.[0];
  }
  uploadimage():void{
    if(this.file && this.filename!=='' && this.title!==''){
      //ima
     this.imageservice.uploadimage(this.file,this.filename,this.title)
     .subscribe({
      next:(response)=>{
       // console.log(response);
       this.imageuploadform?.resetForm();
        this.getimages();
      }
     });
    }
  }

  imageselect(image:blogimage):void{
   this.imageservice.selectimage(image);
  }

  private getimages(){
    this.images$= this.imageservice.getallimages();
  }

}
