import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NecesidadesCtModule } from '../public/necesidades-ct/necesidades-ct.module';
import { ScrollToTopComponent } from './components/scroll-to-top-component/scroll-to-top-component.component';


@NgModule({
  declarations: [
    ScrollToTopComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NecesidadesCtModule,

  ],exports:[
ScrollToTopComponent
    // DatosCTComponent,
    // ModalPage,

  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
