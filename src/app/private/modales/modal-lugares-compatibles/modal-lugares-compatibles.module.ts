import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DatosNecesidadCtComponent } from './components/datos-necesidad-ct/datos-necesidad-ct.component';
import { TablaLugaresCompatiblesComponent } from './components/tabla-compatibles/tabla-compatibles.component';
import { ModalVacantesDispComponent } from './components/modal-vacantes-disp/modal-vacantes-disp.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatosCTComponent } from '../modal-datos-ct/components/datos-ct/datos-ct.component';
import { ModalDatosCtModule } from '../modal-datos-ct/modal-datos-ct.module';



@NgModule({
  declarations: [
    DatosNecesidadCtComponent,
    TablaLugaresCompatiblesComponent,
    ModalVacantesDispComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule,
    NgxDatatableModule,
    ModalDatosCtModule,
], exports:[
  ModalVacantesDispComponent
]
})
export class ModalLugaresCompatiblesModule { }
