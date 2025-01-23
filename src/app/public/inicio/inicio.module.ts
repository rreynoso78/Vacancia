import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from './inicio-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoginModule } from '../login/login.module';
import { InicioComponent } from './components/inicio.component';



@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    FormsModule,
    InicioRoutingModule,
    IonicModule,
    LoginModule
  ]
})

export class InicioModule { }
