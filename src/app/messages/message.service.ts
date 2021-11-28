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
    this.http.get<Message[]>('http://localhost:3000/messages')
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

addMessage(message: Message) {
  if (!message) {
    return;
  }

  // make sure id of the new Document is empty
  message.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.http.post<{ /* message: string, */ message: Message }>('http://localhost:3000/messages',
    message,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new document to documents
        this.messages.push(responseData.message);
        /* this.sortAndSend(); */
      }
    );
}

updateMessage(originalMessage: Message, newMessage: Message) {
  if (!originalMessage || !newMessage) {
    return;
  }

  const pos = this.messages.findIndex(d => d.id === originalMessage.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newMessage.id = originalMessage.id;
  newMessage.id = originalMessage.id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.http.put('http://localhost:3000/documents/' + originalMessage.id,
    newMessage, { headers: headers })
    .subscribe(
      (response: Response) => {
        this.messages[pos] = newMessage;
        /* this.sortAndSend(); */
      }
    );
}

deleteMessage(message: Message) {

  if (!message) {
    return;
  }

  const pos = this.messages.findIndex(d => d.id === message.id);

  if (pos < 0) {
    return;
  }

  // delete from database
  this.http.delete('http://localhost:3000/documents/' + message.id)
    .subscribe(
      (response: Response) => {
        this.messages.splice(pos, 1);
        /* this.sortAndSend(); */
      }
    );
}

}






  