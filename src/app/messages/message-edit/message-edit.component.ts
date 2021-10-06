import { 
  Component, 
  OnInit, 
  Input, 
  Output, 
  EventEmitter, 
  ViewChild,
  ElementRef } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject', { static: false }) subjectInputRef: ElementRef;
  @ViewChild('msgText', { static: false }) msgTextInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender = 'Daniel';

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const msgSubject = this.subjectInputRef.nativeElement.value;
    const newMsgText = this.msgTextInputRef.nativeElement.value;
    const newMessageO = new Message(1, "Daniel", msgSubject, newMsgText);
    this.addMessageEvent.emit(newMessageO);
  }

onClear() {
  this.subjectInputRef.nativeElement.value = null;
  this.msgTextInputRef.nativeElement.value = null; 
}

}
