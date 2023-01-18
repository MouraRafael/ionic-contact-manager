import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Avatar } from '../models/avatar.model';
import { Observable } from 'rxjs';


const COLLECTION_NAME = "contactCollection"


@Injectable({
  providedIn: 'root'
})


export class FirebaseFirestorageService {
  private fileCollection!: AngularFirestoreCollection<Avatar>;
  private files!:Observable<Avatar[]>

  constructor(
    private afs: AngularFirestore,
    private afStorage:AngularFireStorage
  ) {
    this.fileCollection = this.getCollection(COLLECTION_NAME)
    this.files = this.fileCollection.valueChanges();
  }

    getCollection(collectionName:string):AngularFirestoreCollection<Avatar>{
      return this.afs.collection(collectionName);
    }

    imageReference(fileStoragePath:string):AngularFireStorageReference{
      return this.afStorage.ref(fileStoragePath);
    }

    uploadTask(fileStoragePath:string,file:File):AngularFireUploadTask{
      return this.afStorage.upload(fileStoragePath,file);
    }

    storeFile(avatar:Avatar){
      const fileId = this.afs.createId();

      this.fileCollection
      .doc(fileId)
      .set(avatar)
      .then(response => console.log(response))
      .catch(error => console.error(error));

    }

}
