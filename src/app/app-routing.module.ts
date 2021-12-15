import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookCreateComponent } from './components/book-create/book-create.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-book' },
  { path: 'create-book', component: BookCreateComponent },
  { path: 'edit-book/:id', component: BookEditComponent },
  { path: 'books-list', component: BookListComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }