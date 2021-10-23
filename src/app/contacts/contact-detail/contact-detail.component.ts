import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

import { Contact } from 'src/app/contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
@Input() contact: Contact;
id: string;
nativeWindow: any;

  constructor( 
    private contactService: ContactService,
    private windowRefService: WindRefService,
    private route: ActivatedRoute,
    private router: Router) { 
      this.nativeWindow = windowRefService.getNativeWindow();
    }

  ngOnInit() {
    this.route.params
    .subscribe((params: Params) => {
        this.id = params['id'];
        this.contact = this.contactService.getContact(this.id);
      }
    );
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['contacts']);
  }

onView(){
  if (this.contact.imageUrl) {
    this.nativeWindow.open(this.contact.imageUrl);
      }
    }

    
}
