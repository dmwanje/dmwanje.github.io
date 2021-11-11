import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Contact } from 'src/app/contact.model';
import { ContactService } from '../contact.service';
import { ContactsFilterPipe } from '../contacts-filter.pipe';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  @Output() contactListChangedEvent = new Subject<Contact>();
  term: string;

  contacts: Contact[];
  private contChangeSub: Subscription;

  constructor(private contactService: ContactService) { 

  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.contChangeSub = this.contactService.contactListChangedEvent
      .subscribe(
        (contactsList: Contact[]) => {
          this.contacts = contactsList;
      
            }
    
        );
    }

    ngOnDestroy(): void {
      this.contChangeSub.unsubscribe();
    }

    
    search(value: string) {

      this.term = value;
      
      } 

  }