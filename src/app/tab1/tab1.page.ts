import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Contact } from '../models/contact.model';
import { FirebaseFirestoreService } from '../services/firebase.firestore.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  contactFormGroup!:FormGroup

  @ViewChild('contactFormGroupDirective') contactFormGroupDirective!:FormGroupDirective






  constructor(
    private firebaseService: FirebaseFirestoreService
  ) {}



  ngOnInit(): void {
    this.contactFormGroup = new FormGroup({
      'name': new FormControl('',[Validators.required]),
      'lastname': new FormControl('',[Validators.required]),
      'phone': new FormControl('',[Validators.required]),
      'email': new FormControl('',[Validators.required]),
      'category': new FormControl('',[Validators.required])
    })
  }




  createContact(values:any){
    // pegar todos os dados do formulário e transformar em um novo contato
    let newContact:Contact = {...values}
    this.firebaseService.save(newContact);
    console.log(newContact)
    this.contactFormGroupDirective.reset();
  }

  uploadImage(event: FileList){
    const file = event.item(0);
    // Validação da imagem

    if(file?.type.split('/')[0] !=='image'){
      console.error(`Tipo de arquivo inválido`)
      return;
    }

    //animação de carregamento

  }
}
