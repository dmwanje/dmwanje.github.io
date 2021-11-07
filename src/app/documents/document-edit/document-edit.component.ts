import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router, Params} from '@angular/router';


@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id: any;

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (!this.id) {
          this.editMode = false;
          return;
        }
        this.originalDocument = this.documentService.getDocument(this.id);
    
        if(!this.originalDocument){
          return;
        }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      
      }
    )
  }

  onSubmit(f: NgForm) {
    const value = f.value;
    console.log('onSubmit', value);
    const newDocument = new Document(value.id, value.name, value.description, value.url, value.children);
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.editMode = false;
    this.router.navigate(['documents']);
    
  }


onCancel(){
  this.router.navigate(['documents']);
}

}
