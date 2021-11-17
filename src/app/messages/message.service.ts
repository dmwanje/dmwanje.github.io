import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKDOCUMENTS } from '../documents/MOCKDOCUMENTS';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { MessagesComponent } from './messages.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  messageChangedEvent = new EventEmitter<Message[]>();
  

  messages: Message [] =[];
  maxMessageId: number;

  constructor( private http: HttpClient ) {
   /*  this.messages = MOCKMESSAGES; */
    this.maxMessageId = this.getMaxId(); 
   }

   getMessages(): Message[] {
    this.http.get<Message[]>('https://cmsapp-e0aae-default-rtdb.firebaseio.com/messages.json')
    .subscribe(
    //success method
    (messages:Message[]) =>{
      this.messages = messages;
      this.maxMessageId = this.getMaxId();
      messages.sort((a,b) =>{
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        return 0;
      
      })
      this.messageChangedEvent.next(this.messages.slice());
    },
    (error: any) => {
      console.log(error);
        }
    )
    
    return this.messages;
    
  }

  getMessage(id: string): Message {

     for (let message of this.messages) {
         if (message.id == id) {
             return message;
         }
     }
   return null;
  }

  getMaxId(): number {
    let maxId = 0;

     for (let message of this.messages) {
      var currentId: number = parseInt(message.id);
          if ( currentId > maxId) {
            maxId = currentId;
               }
           }
          return maxId;
        }

storeMessages(){
  
 const messages = JSON.parse(JSON.stringify(this.messages));
  const headers= new HttpHeaders()
  .set('content-type', 'application/json');
  
  this.http
  .put(
    'https://cmsapp-e0aae-default-rtdb.firebaseio.com/messages.json',
    messages
  )
  .subscribe(response => {
    
    var messagesListClone = this.messages.slice();
  
    this.messageChangedEvent.next(messagesListClone);
 
   
  });
}

  addMessage(message: Message){
    this.messages.push(message);
    /* this.messageChangedEvent.emit(this.messages.slice()); */
    this.storeMessages();
}

}






  