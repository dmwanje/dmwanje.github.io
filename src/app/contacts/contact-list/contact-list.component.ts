import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts:Contact[]=[
    new Contact(1, "R.Kent Jackson", "JacksonK@Byui.edu", "208-462-0222",
     "../../assets/jacksonk.jpg", null),
     new Contact(2, "Rex Barzee", "BarzeeR@Byui.edu", "208-462-3222",
     "../../assets/barzeer.jpg", null),
    
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
