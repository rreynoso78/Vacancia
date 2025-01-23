import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalPlazaRoutingModule } from './modal-plaza-routing.module';
import { ModalPlazaComponent } from './components/modal-plaza.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ModalPlazaComponent],
  imports: [
    CommonModule,
    ModalPlazaRoutingModule,    
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ModalPlazaModule { }
