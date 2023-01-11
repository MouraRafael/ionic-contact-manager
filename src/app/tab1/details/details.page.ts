import { Component, ViewChild, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Contact } from '../../models/contact.model';
import { FirebaseService } from '../../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { emit } from 'process';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public contact!:Contact;
  contactFormGroup!: FormGroup;

  @ViewChild('contactFormGroupDirective')
  contactFormGroupDirective!: FormGroupDirective;

  constructor(
    private firebaseService: FirebaseService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    this.firebaseService.find(id!).subscribe({
      next:(data)=>{
        if(!data.name){
          console.log("===> " + JSON.stringify(data));
          this.router.navigateByUrl('/tabs/list')
        }else{
          this.contact = data;

          this.contactFormGroup = new FormGroup({
            name: new FormControl(this.contact.name, [Validators.required]),
            lastname: new FormControl(this.contact.lastname, [Validators.required]),
            phone: new FormControl(this.contact.phone, [Validators.required]),
            email: new FormControl(this.contact.email, [Validators.required]),
            category: new FormControl(this.contact.category, [Validators.required]),
          });
        }
      },
      error:(error)=>console.error(`Error on get contact data. Error: ${error}`)

    })



  }

  editContact(values: any) {
    // pegar todos os dados do formulário e transformar em um novo contato
    let updateContact: Contact = { id:this.contact.id, ...values };
    this.firebaseService.update(updateContact)
    .then(
      ()=> this.router.navigateByUrl('/tabs/list')
    ).catch(
      responseError => console.error(responseError)
    )
    console.log(updateContact);
    this.contactFormGroupDirective.reset();
  }

  deleteContact(){
    console.log(this.contact.id)
    this.firebaseService.delete(this.contact.id)
    .then(
      _ => this.router.navigateByUrl('tabs/list')
      )
      .catch(err => console.error(err))
  }
}
