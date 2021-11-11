import { Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent: Subject<Document> = new Subject<Document>();
/*   documentChangedEvent: Subject<Document[]> = new Subject<Document[]>(); */
  documentListChangedEvent: Subject<Document[]> = new Subject<Document[]>(); 

 documents: Document [] =[];
 maxDocumentId: number;

  constructor( private http: HttpClient) { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();

  }

  getDocuments(): Document[] {
    this.http.get<Document[]>('https://cmsapp-e0aae-default-rtdb.firebaseio.com/documents.json')
    .subscribe(
    //success method
    (documents:Document[]) =>{
      this.documents = documents;
      this.maxDocumentId = this.getMaxId();
      documents.sort((a,b) =>{
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        return 0;
      
      })
      this.documentListChangedEvent.next(this.documents.slice());
    },
    (error: any) => {
      console.log(error);
        }
    )
    
    return this.documents;
    
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
      
storeDocuments(){
  
 const documents = JSON.parse(JSON.stringify(this.documents));
  const headers= new HttpHeaders()
  .set('content-type', 'application/json');
  
  this.http
  .put(
    'https://cmsapp-e0aae-default-rtdb.firebaseio.com/documents.json',
    documents
  )
  .subscribe(response => {
    
    var documentsListClone = this.documents.slice();
  
    this.documentListChangedEvent.next(documentsListClone);
 
   
  });
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
  
  this.storeDocuments();
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
  
  this.storeDocuments();
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
    this.storeDocuments();
    }
      
  }
    
