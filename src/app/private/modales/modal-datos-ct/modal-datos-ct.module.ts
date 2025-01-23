import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaPlantillaComponent } from './components/consulta-plantilla/consulta-plantilla.component';
import { DatosCTComponent } from './components/datos-ct/datos-ct.component';
import { ModalDatosCtComponent } from './components/info-ct/info-ct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NecesidadesCtModule } from "../../../public/necesidades-ct/necesidades-ct.module";
import { IonicModule } from '@ionic/angular';
import { UltMovRfcCtComponent } from './components/ult-mov-rfc-ct/ult-mov-rfc-ct.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CapturaNecesidadComponent } from './components/captura/necesidad-captura.component';



@NgModule({
  declarations: [
    ConsultaPlantillaComponent,
    DatosCTComponent,
    ModalDatosCtComponent,
    UltMovRfcCtComponent,
    CapturaNecesidadComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NecesidadesCtModule,
    IonicModule,
    FormsModule,
    SharedModule,
], exports:[
  ModalDatosCtComponent,DatosCTComponent
]
})
export class ModalDatosCtModule { }
