import { NgModule } from '@angular/core';

import {  RouterModule, Routes } from '@angular/router';
import { VacantesComponent } from './components/vacantes/vacantes.component';

const routes: Routes = [
  {path:'',
  component:VacantesComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacantesRoutingModule { }
