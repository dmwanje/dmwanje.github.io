import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
@Output() documentlistChangedEvent = new Subject<Document>();

documents: Document[] = [];
private docChangeSub: Subscription;

  constructor(private documentService: DocumentService,
      private router: Router,
      private route: ActivatedRoute) {
    }
   

    ngOnInit() {
      this.documents = this.documentService.getDocuments();
      this.docChangeSub = this.documentService.documentChangedEvent
      .subscribe(
        (documentsList: Document[]) => {
          this.documents = documentsList;
   
          }
        );
    }

    
    ngOnDestroy(): void {
      this.docChangeSub.unsubscribe();
    }

  }
