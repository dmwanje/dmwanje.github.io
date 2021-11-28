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
    /* this.documents = MOCKDOCUMENTS; */
    this.maxDocumentId = this.getMaxId();

  }

  getDocuments(): Document[] {
    this.http.get<Document[]>('http://localhost:3000/documents')
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

addDocument(document: Document) {
  if (!document) {
    return;
  }

  // make sure id of the new Document is empty
  document.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
    document,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        /* this.sortAndSend(); */
      }
    );
}


updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === originalDocument.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newDocument.id = originalDocument.id;
  newDocument.id = originalDocument.id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.http.put('http://localhost:3000/documents/' + originalDocument.id,
    newDocument, { headers: headers })
    .subscribe(
      (response: Response) => {
        this.documents[pos] = newDocument;
       /*  this.sortAndSend(); */
      }
    );
}

deleteDocument(document: Document) {

  if (!document) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === document.id);

  if (pos < 0) {
    return;
  }

  // delete from database
  this.http.delete('http://localhost:3000/documents/' + document.id)
    .subscribe(
      (response: Response) => {
        this.documents.splice(pos, 1);
        /* this.sortAndSend(); */
      }
    );
}}
