import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LugaresDispRoutingModule } from './lugares-disp-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LugaresDispComponent } from './components/lugares-disp/lugares-disp.component';


@NgModule({
  declarations: [LugaresDispComponent],
  imports: [
    CommonModule,
    LugaresDispRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class LugaresDispModule { }
