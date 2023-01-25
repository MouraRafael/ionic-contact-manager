import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthenticationService } from '../services/firebase-authentication.service';
import { CredentialModel } from '../models/credential.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialFormGroup!:FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private FirebaseAuth:FirebaseAuthenticationService,
    private router:Router
  ) { }

  ngOnInit() {
    this.credentialFormGroup = this.formBuilder.group({
      email: ['',Validators.required, Validators.email],
      password:['',Validators.required,Validators.minLength(8)]
    })
  }

  async register():Promise<void>{
    const user = await this.FirebaseAuth.register(this.credentialFormGroup.value as CredentialModel);

    if(user){
      this.router.navigateByUrl('tabs/tab1',{replaceUrl:true})
    }
  }

}
