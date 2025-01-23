import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalSeguimientoRoutingModule } from './modal-seguimiento-routing.module';
import { ModalSeguimientoComponent } from './components/modal-seguimiento.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ModalSeguimientoComponent],
  imports: [
    CommonModule,
    ModalSeguimientoRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ModalSeguimientoModule { }
