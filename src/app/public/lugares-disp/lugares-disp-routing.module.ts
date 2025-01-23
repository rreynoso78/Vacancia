import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LugaresDispComponent } from './components/lugares-disp/lugares-disp.component';

const routes: Routes = [
  {path:'',
  component:LugaresDispComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LugaresDispRoutingModule { }
