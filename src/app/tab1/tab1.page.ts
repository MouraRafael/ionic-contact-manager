import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Contact } from '../models/contact.model';
import { FirebaseFirestoreService } from '../services/firebase.firestore.service';
import { AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable, finalize, tap } from 'rxjs';
import { FirebaseFirestorageService } from '../services/firebase-firestorage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  contactFormGroup!:FormGroup

  @ViewChild('contactFormGroupDirective') contactFormGroupDirective!:FormGroupDirective

  isFileUploading!:boolean;
  isFileUploaded!:boolean;
  imageSize!:number;

  uploadTask!:AngularFireUploadTask

  percentageUpload!:Observable<number | undefined>
  trackSnapshot!:Observable<any>;
  avatarUrl!:Observable<string>





  constructor(
    private firebaseFireStoreService: FirebaseFirestoreService,
    private firebaseFireStorageService: FirebaseFirestorageService
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
    this.firebaseFireStoreService.save(newContact);
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


    //define o stado de upload
    this.isFileUploading = true;
    this.isFileUploaded = false;

    const fileStoragePath = `contactsStorage/${new Date().getTime()}${file.name}`

    const avatarRef = this.firebaseFireStorageService.imageReference(fileStoragePath)

    this.uploadTask = this.firebaseFireStorageService.uploadTask(fileStoragePath,file)

    //animação de carregamento
    this.percentageUpload = this.uploadTask.percentageChanges();

    this.trackSnapshot = this.uploadTask.snapshotChanges().pipe(
      finalize(()=>{
          this.avatarUrl = avatarRef.getDownloadURL();
          this.avatarUrl.subscribe({
            next:response=>{
              this.firebaseFireStorageService.storeFile({
                name:file.name,
                filepath:response,
                size:this.imageSize
              });
              this.isFileUploading = false;
              this.isFileUploaded = true;
            },
            error: err => console.error(err),

          })
      }),
      tap( snapshot =>this.imageSize = snapshot!.totalBytes)
    );

  }
}
