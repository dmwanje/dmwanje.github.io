import { Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';



@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent: Subject<Document> = new Subject<Document>();
/*   documentChangedEvent: Subject<Document[]> = new Subject<Document[]>(); */
  documentListChangedEvent: Subject<Document[]> = new Subject<Document[]>(); 

 documents: Document [] =[];
 maxDocumentId: number;

  constructor( ) { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();

  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {

    for (let document of this.documents) {
        if (document.id === id) {
            return document;
        }
    }
    return null;
    
  }
  
   getMaxId(): number {
    let maxId = 0;

     for (let document of this.documents) {
      var currentId: number = parseInt(document.id);
          if ( currentId > maxId) {
            maxId = currentId;
               }
           }
          return maxId;
        }
      
addDocument(newDocument: Document) {
  if (!newDocument){
    return;
  }
  this.maxDocumentId++;
 var nn = parseInt(newDocument.id);
  nn = this.maxDocumentId;
  this.documents.push(newDocument);
  var documentsListClone = this.documents.slice();
  
  this.documentListChangedEvent.next(documentsListClone);
      }


updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    } 

  let  pos = this.documents.indexOf(originalDocument)
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    console.log(this.documents)
   var documentsListClone = this.documents.slice()
  
  this.documentListChangedEvent.next(documentsListClone)
      }

deleteDocument(document: Document) {
    if (!document){
      return;
    }
    
  let  pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    } 

    this.documents.splice(pos, 1)
    var documentsListClone = this.documents.slice()
    this.documentListChangedEvent.next(documentsListClone);
    }
      
  }
    
