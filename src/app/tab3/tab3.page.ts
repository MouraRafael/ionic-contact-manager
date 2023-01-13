import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { FirebaseFirestoreService } from '../services/firebase.firestore.service';
import { Contact } from '../models/contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  contactList!:Contact[]
  searchFG!:FormGroup
  @ViewChild('searchFGD')  searchFGD!:FormGroupDirective

  constructor(
    private teastController:ToastController,
    private firebase:FirebaseFirestoreService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.searchFG = new FormGroup({
      'name': new FormControl('', Validators.required)
    })
  }

  search(contact:any){
    this.firebase.findByName(contact.name).subscribe({
      next:(result)=>{
        if(!result){
          this.presentToast(`Contact not found: ${contact.name}`)
        }
        console.log(result)
        this.contactList = result as Contact[]
      },
      error: (err)=>{
        console.error(err);
        this.presentToast(`EService inavailable`)
      }
    });
    this.presentToast(contact.name);
    this.searchFG.reset()
  }

  async presentToast(msg:string){
    const toast = await this.teastController.create({
      message: msg,
      duration: 1500,
      position:'middle',
    });
    console.log(msg)
    await toast.present();
  }

  ionViewDidEnter(){ this.contactList = []}



  editContact(id:string){
    this.router.navigateByUrl(`/tabs/details/${id}`)
  }

}
