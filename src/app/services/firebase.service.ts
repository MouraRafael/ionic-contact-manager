import { Injectable } from '@angular/core';
import { Firestore,doc, collection,setDoc, collectionData, docSnapshots } from '@angular/fire/firestore';
import { deleteDoc } from '@firebase/firestore';
import { map, Observable } from 'rxjs';

import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private fireStore: Firestore
  ) { }

  save(contact: Contact): Promise<void>{
    const document = doc(collection(this.fireStore, 'contacts'));
    return setDoc(document, contact)
  }

  list():Observable<Contact[]>{
    const contactsCcollection = collection(this.fireStore,'contacts');

    return collectionData(contactsCcollection, {idField: 'id'})
    .pipe(
      map(result => result as Contact[])
    );
  }

  find(id:string):Observable<Contact>{
    const document = doc(this.fireStore, `contacts/${id}`);

    return docSnapshots(document).pipe(
      map(doc =>{
        const id = doc.id;
        const data = doc.data();

        return { id, ...data } as Contact;
      })
    );
  }
  findByName(name:string):Observable<Contact[]>{
    const contacts = this.list();

    return contacts.pipe(
      map(
        contacts => contacts.filter(
          contact => {
            const fullName = contact.name.concat(" ", contact.lastname);
            //const regex = '/^.*' + name + '.*$/';

            return fullName.toLowerCase().match(name.toLowerCase())
          }
        )
      )
    )
  }

  update(contact:Contact): Promise<void>{
    const document = doc(this.fireStore, 'contacts', contact?.id)
    const {id, ...data} = contact;

    return setDoc(document,data)
  }
  delete(id: string): Promise<void>{
    const document = doc(this.fireStore, 'contact',id)
    return deleteDoc(document)
  }

}
