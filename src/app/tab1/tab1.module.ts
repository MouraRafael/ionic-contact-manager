import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';


import { Tab1PageRoutingModule } from './tab1-routing.module';
import { FirebaseFirestoreService } from '../services/firebase.firestore.service';
import { FirebaseFirestorageService } from '../services/firebase-firestorage.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page],
  providers:[FirebaseFirestoreService,FirebaseFirestorageService]
})
export class Tab1PageModule {}
