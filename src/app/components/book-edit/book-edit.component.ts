import { Book } from './../../model/book';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})

export class BookEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  bookData: Book[];
  BookProfile: any = ['Fiction', 'Nonfiction', 'Biography', 'Teens', 'Children']

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateBook();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getBook(id);
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      category: ['', [Validators.required]],
      dop: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Choose options with select-dropdown
  updateProfile(e) {
    this.editForm.get('category').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getBook(id) {
    this.apiService.getBook(id).subscribe(data => {
      this.editForm.setValue({
        title: data['title'],
        author: data['author'],
        category: data['category'],
        dop: data['dop'],
      });
    });
  }

  updateBook() {
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      category: ['', [Validators.required]],
      dop: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateBook(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/books-list');
            console.log('Book updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}