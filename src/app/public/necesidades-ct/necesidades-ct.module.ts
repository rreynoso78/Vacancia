import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NecesidadesCtComponent } from './pages/necesidades-ct/necesidades-ct-page.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NecesidadesCTRoutingModule } from './necesidades-ct-routing.modules';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalDatosCtModule } from 'src/app/private/modales/modal-datos-ct/modal-datos-ct.module';

@NgModule({
  declarations: [
    NecesidadesCtComponent

  ],
  imports: [
    CommonModule,
    NecesidadesCTRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
],exports:[
  ]
})
export class NecesidadesCtModule {


}
