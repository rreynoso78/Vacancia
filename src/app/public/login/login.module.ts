import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    IonicModule,
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
  
})
export class LoginModule { }
