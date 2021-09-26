import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts:Contact[]=[
    new Contact(1, "R.Kent Jackson", "JacksonK@Byui.edu", "2084620222",
     "../../assets/jacksonk.jpg", null),
     new Contact(2, "Rex Barzee", "BarzeeR@Byui.edu", "2084623222",
     "../../assets/barzeer.jpg", null),
    
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
