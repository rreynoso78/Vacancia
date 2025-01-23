import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSolicitudRoutingModule } from './modal-solicitud-routing.module';
import { ModalSolicitudComponent } from './components/modal-solicitud.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ModalSolicitudComponent],
  imports: [
    CommonModule,
    ModalSolicitudRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ModalSolicitudModule { }
