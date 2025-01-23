import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal.component';

const routes: Routes = [
  {path:'',
    component:PrincipalComponent,
    children:
    [
      {
          path: 'vacantes',
      loadChildren: () => import('../vacantes/vacantes.module').then(m => m.VacantesModule),

      },
      {
         path: 'lugaresDisp',
         loadChildren: () => import('../lugares-disp/lugares-disp.module').then(m => m.LugaresDispModule)
       },
       {
          path: 'necesidadesCT',
          loadChildren: () => import('../necesidades-ct/necesidades-ct.module').then(m => m.NecesidadesCtModule)
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
