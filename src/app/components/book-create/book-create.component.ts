import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})

export class BookCreateComponent implements OnInit {  
  submitted = false;
  bookForm: FormGroup;
  BookProfile:any = ['Fiction', 'Nonfiction', 'Biography', 'Teens', 'Chilren']
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      category: ['', [Validators.required]],
      dop: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Choose designation with select dropdown
  updateProfile(e){
    this.bookForm.get('category').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm(){
    return this.bookForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.bookForm.valid) {
      return false;
    } else {
      this.apiService.createBook(this.bookForm.value).subscribe(
        (res) => {
          console.log('Book successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/books-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
