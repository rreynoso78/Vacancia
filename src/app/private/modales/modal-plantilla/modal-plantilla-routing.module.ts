import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalPlantillaComponent } from './components/modal-plantilla.component';
import { PlantillaNominaComponent } from '../modal-datos-ct/components/plantilla-nomina/plantilla-nomina.component';
import { PlantillaSipseComponent } from '../modal-datos-ct/components/plantilla-sipse/plantilla-sipse.component';
import { PlantillaLaboralComponent } from '../modal-datos-ct/components/plantilla-laboral/plantilla-laboral.component';
import { DatosCTComponent } from './components/datos-ct/datos-ct.component';

const routes: Routes =  [{
  path:'',
  redirectTo: 'ultimo/:ct/:rfc',
  pathMatch: 'full'
  },
  {
    path:'ultimo/:ct/:rfc', component:DatosCTComponent
  },
  {
    path:'nomina/:ct', component:PlantillaNominaComponent
  },
  {
    path:'sipse/:ct/:turno', component:PlantillaSipseComponent
  },
  {
    path:'laboral/:ct', component:PlantillaLaboralComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalPlantillaRoutingModule { }
