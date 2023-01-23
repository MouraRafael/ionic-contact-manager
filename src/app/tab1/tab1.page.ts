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
  avatar:string = '../../assets/img/avatar.png';


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

    this.contactFormGroup.valueChanges.subscribe(()=>{
      this.defineAvatar()
    })
  }




  createContact(values:any){
    // pegar todos os dados do formulário e transformar em um novo contato
    let newContact:Contact = {...values}
    newContact.imageUrl = this.avatar;
    this.firebaseService.save(newContact);
    console.log(newContact)
    this.contactFormGroupDirective.reset();
  }

  uploadImage(){

  }

  defineAvatar(){
    const email = this.contactFormGroup.get('email');
    if(email?.valid){
      this.avatar = `https://robohash.org/${email.value}?set=set3&gravatar=yes`
    }
  }
}
