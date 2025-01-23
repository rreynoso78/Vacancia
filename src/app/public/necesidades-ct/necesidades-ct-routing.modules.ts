import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';

import { NecesidadesCtComponent } from './pages/necesidades-ct/necesidades-ct-page.component';


const routes: Routes = [
  {path:'',
  component:NecesidadesCtComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NecesidadesCTRoutingModule { }
