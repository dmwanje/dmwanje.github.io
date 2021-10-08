import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document (1, 'Letter', 'Hello Aunt Mabel, I hope you are doing well!', 'www.google.com', null),
    new Document (2, 'Email', 'Hello Dear Susan, I hope your dog is feeling better!', 'www.pets.com', null),
    new Document (3, 'Note', 'Hello Brother Harris, Remember to order the paper', 'www.churchofjesuschristoflatterdaysaints.com', null),
    new Document (4, 'Letter', ' Hello again, I hope you are still doing well!', 'www.google.com', null),
  ];


  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
   }

}
