import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit {
  
  Book:any = [];

  constructor(private apiService: ApiService) { 
    this.readBook();
  }

  ngOnInit() {}

  readBook(){
    this.apiService.getBooks().subscribe((data) => {
     this.Book = data;
    })    
  }

  removeBook(book, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteBook(book._id).subscribe((data) => {
          this.Book.splice(index, 1);
        }
      )    
    }
  }

}