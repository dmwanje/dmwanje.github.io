import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
@Output() selectedMessageEvent = new EventEmitter<Message>();


  messages: Message[] = [
    new Message (1, "Hello!", "This is my message text", "Daniel Mwanje"),
    new Message(2, "How are you?", "How have you been?", "Daniel Mwanje"),
    new Message(2, "Our next meeting", "When can you meet?", "Daniel Mwanje"),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }


}
