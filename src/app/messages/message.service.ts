import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKDOCUMENTS } from '../documents/MOCKDOCUMENTS';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { MessagesComponent } from './messages.component';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message [] =[];

  constructor() {
    this.messages = MOCKMESSAGES;
   }

   getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {

     for (let message of this.messages) {
         if (message.id == id) {
             return message;
         }
     }
   return null;
  }

  addMessage(message: Message){
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
}

}






  