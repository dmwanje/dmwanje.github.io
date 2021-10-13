import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
@Output() selectedMessageEvent = new EventEmitter<Message>();


  messages: Message[] = [];

  constructor(private msgService: MessageService) { }

  ngOnInit() {
    this.messages = this.msgService.getMessages();
    this.msgService.messageChangedEvent
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      );
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}

