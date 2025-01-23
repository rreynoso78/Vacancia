import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from './components/principal.component';
import { VacantesRoutingModule } from '../vacantes/vacantes-routing.module';
 
@NgModule({
  declarations: [PrincipalComponent],
  imports: [
    IonicModule.forRoot({
      backButtonText: 'Volver',
      mode: 'ios',
      menuIcon: 'ios'
    }),
    
    CommonModule,
    IonicModule,
    PrincipalRoutingModule,
    VacantesRoutingModule
  ]
})
export class PrincipalModule { }
