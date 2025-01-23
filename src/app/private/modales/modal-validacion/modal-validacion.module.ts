import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalValidacionRoutingModule } from './modal-validacion-routing.module';
import { ModalValidacionComponent } from './components/modal-validacion.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ModalValidacionComponent],
  imports: [
    CommonModule,
    ModalValidacionRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ModalValidacionModule { }
