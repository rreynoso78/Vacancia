import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalPlantillaRoutingModule } from './modal-plantilla-routing.module';
import { ModalPlantillaComponent } from './components/modal-plantilla.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlantillaNominaComponent } from '../modal-datos-ct/components/plantilla-nomina/plantilla-nomina.component';
import { PlantillaSipseComponent } from '../modal-datos-ct/components/plantilla-sipse/plantilla-sipse.component';
import { PlantillaLaboralComponent } from '../modal-datos-ct/components/plantilla-laboral/plantilla-laboral.component';
import { DatosCTComponent } from './components/datos-ct/datos-ct.component';
import { ReceptorDirective } from '../receptor.directive';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ModalPlantillaComponent,
    PlantillaNominaComponent,
    PlantillaSipseComponent,
    PlantillaLaboralComponent,
    DatosCTComponent,
    ReceptorDirective,
  ],
  imports: [
    CommonModule,
    ModalPlantillaRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  entryComponents:[ PlantillaNominaComponent,
    PlantillaSipseComponent,
    PlantillaLaboralComponent,
    DatosCTComponent,
  ],

})
export class ModalPlantillaModule { }
