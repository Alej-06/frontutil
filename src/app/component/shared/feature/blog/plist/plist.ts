import { Component } from '@angular/core';
import { BlogService } from '../../../../../service/blog';
import { IPage } from '../../../../../model/plistmodel';
import { Blog } from '../../../../../model/blog';

@Component({
  selector: 'app-plist',
  imports: [],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class PlistBlogPavon {

  oPage: IPage<Blog>|null = null; //ESTO ES PARA QUE SE INICIE A NULL
  constructor(private blogService: BlogService) {}

  ngOnInit(){
    this.getPage();
  }

getPage(){
  this.blogService.getPage(0,10).subscribe({
    next: (data: IPage<Blog>) => {
      this.oPage = data;
    },
    error: (error) => {
      console.log(error)
    }
  })
}


}
