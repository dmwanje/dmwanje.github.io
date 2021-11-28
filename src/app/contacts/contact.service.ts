import { Injectable, Output} from '@angular/core';
import { Subject } from 'rxjs';
import {Contact} from '../contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   contactSelectedEvent: Subject<Contact> = new Subject<Contact>();
   contactListChangedEvent: Subject<Contact[]> = new Subject<Contact[]>();

   contacts: Contact [] =[];
   maxContactId: number;


   constructor( private http: HttpClient ) {
      this.contacts = MOCKCONTACTS;
      this.maxContactId = this.getMaxId();
   }

   getContacts(): Contact[] {
    this.http.get<Contact[]>('http://localhost:3000/contacts')
    .subscribe(
    //success method
    (contacts:Contact[]) =>{
      this.contacts = contacts;
      this.maxContactId = this.getMaxId();
      contacts.sort((a,b) =>{
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        return 0;
      
      })
      this.contactListChangedEvent.next(this.contacts.slice());
    },
    (error: any) => {
      console.log(error);
        }
    )
    
    return this.contacts;
    
  }

   getContact(id: string): Contact {

      for (let contact of this.contacts) {
          if (contact.id === id) {
              return contact;
          }
      }
    return null;
   }

   getMaxId(): number {
      let maxId = 0;
  
       for (let contact of this.contacts) {
        var currentId: number = parseInt(contact.id);
            if ( currentId > maxId) {
              maxId = currentId;
                 }
             }
            return maxId;
          }


addContact(newContact: Contact) {
  if (!newContact){
    return;
  }

this.maxContactId++;
 var nn = parseInt(newContact.id);
  nn = this.maxContactId;
  this.contacts.push(newContact);
  var contactsListClone = this.contacts.slice();
  
  this.storeContacts();
      }       

updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    } 

  let  pos = this.contacts.indexOf(originalContact)
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
   var documentsListClone = this.contacts.slice()
  
   this.storeContacts();
      }


      deleteContact(contact: Contact) {

        if (!contact) {
          return;
        }
    
        const pos = this.contacts.findIndex(d => d.id === contact.id);
    
        if (pos < 0) {
          return;
        }
    
        // delete from database
        this.http.delete('http://localhost:3000/contacts/' + contact.id)
          .subscribe(
            (response: Response) => {
              this.contacts.splice(pos, 1);
              /* this.sortAndSend(); */
            }
          );
      }
   
storeContacts(){
  
  const contacts = JSON.parse(JSON.stringify(this.contacts));
   const headers= new HttpHeaders()
   .set('content-type', 'application/json');
   
   this.http
   .put(
     'https://cmsapp-e0aae-default-rtdb.firebaseio.com/contacts.json',
     contacts
   )
   .subscribe(response => {
     
     var contactsListClone = this.contacts.slice();
   
     this.contactListChangedEvent.next(contactsListClone);
  
    
   });
 }

}

