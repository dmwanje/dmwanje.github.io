import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contacts:Contact[] = [

    new Contact(2, "Rex Barzee", "BarzeeR@Byui.edu", "208-462-3222",
     "../../assets/barzeer.jpg", null)

  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}


  

  