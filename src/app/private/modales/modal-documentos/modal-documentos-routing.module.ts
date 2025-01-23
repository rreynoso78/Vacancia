import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalDocumentosComponent } from './components/modal-documentos.component';
const routes: Routes = [{
  path:'',
  component:ModalDocumentosComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalDocumentosRoutingModule { }
