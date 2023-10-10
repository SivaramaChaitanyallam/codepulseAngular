import { category } from "../../category/models/category.model";

export interface blogpost{
    id:string;
    title:string;
    shortdescription:string;
    content:string;
    featureimageurl:string;
    UrlHandle:string;
    author:string;
    publishedate:Date;
    isvisible:boolean;
    categories:category[];
}