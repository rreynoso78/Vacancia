import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDocumentosRoutingModule } from './modal-documentos-routing.module';
 
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalDocumentosComponent } from './components/modal-documentos.component';




@NgModule({
 
  imports: [
    CommonModule,
    ModalDocumentosRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ModalDocumentosComponent],
  exports:[ ModalDocumentosComponent ]
 
  
})
export class ModalDocumentosModule { }
