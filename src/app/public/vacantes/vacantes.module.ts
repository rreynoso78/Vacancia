import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacantesRoutingModule } from './vacantes-routing.module';
import { VacantesComponent } from './components/vacantes/vacantes.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [VacantesComponent],
  imports: [
    CommonModule,
    VacantesRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class VacantesModule { }
