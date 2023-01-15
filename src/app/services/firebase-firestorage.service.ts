import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Avatar } from '../models/avatar.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

const COLLECTION_NAME = "contactCollection"

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


}
