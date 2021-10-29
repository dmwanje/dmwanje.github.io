import { Injectable, Output} from '@angular/core';
import { Subject } from 'rxjs';
import {Contact} from '../contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   contactSelectedEvent: Subject<Contact> = new Subject<Contact>();
   contactListChangedEvent: Subject<Contact[]> = new Subject<Contact[]>();

   contacts: Contact [] =[];
   maxContactId: number;


   constructor() {
      this.contacts = MOCKCONTACTS;
      this.maxContactId = this.getMaxId();
   }

   getContacts(): Contact[] {
     return this.contacts.slice();
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
  
  this.contactListChangedEvent.next(contactsListClone);
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
  
  this.contactListChangedEvent.next(documentsListClone)
      }

deleteContact(contact: Contact) {
    if (!contact){
      return;
    }
    
  let  pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    } 

    this.contacts.splice(pos, 1)
    var contactsListClone = this.contacts.slice()
    this.contactListChangedEvent.next(contactsListClone);
}
   
}

