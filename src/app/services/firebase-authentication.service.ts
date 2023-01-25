import { Injectable } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { CredentialModel } from '../models/credential.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {

  constructor(
    private auth:Auth,
  ) { }


  async register(credentials: CredentialModel):Promise<UserCredential | null>{
    return createUserWithEmailAndPassword(this.auth,credentials.email,credentials.password)
    .then((user:UserCredential)=> user)
    .catch(error=>{
      console.error(error);
      return null
    })

  }
  async signIn(){}
  async signOut():Promise<void>{
    return signOut(this.auth)
  }
  async recovery(){}


}
