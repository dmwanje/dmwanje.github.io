
import { Component, OnInit } from '@angular/core';
import { Message } from './message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  selectedMessage: Message;


  constructor() { }

  ngOnInit(): void {
  }

}

