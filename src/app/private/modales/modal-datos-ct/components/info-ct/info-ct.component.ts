import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CT } from '../../../../interface/plantilla.interface';
import { ModalController, NavParams } from '@ionic/angular';
import { CentroTrabajoService } from 'src/app/shared/services/centro-trabajo.service';
import { Respuesta } from '../../../../interface/respuesta.interface';

import { IonContent } from '@ionic/angular';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'modal-datos-ct-info',
  templateUrl: './info-ct.component.html',
  styleUrls: ['./info-ct.component.scss'],
})
export class ModalDatosCtComponent implements OnInit {

  @ViewChild('content', { static: false }) content: IonContent;
  isVisible = false;



    public claveCT: string;
    public RFC: string | null = null;

    public origen:string | null = null;

    // public  datosCt:CT;


    // @ViewChild('receptor', { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;


    constructor(private modalController: ModalController,
      private navParams: NavParams,
      private modalService: ModalService
    ) {}


    ngOnInit(): void {
      this.claveCT = this.navParams.get('claveCT')
      this.RFC=this.navParams.get('RFC')
      this.origen = this.navParams.get('origen')||''



      console.log("origen:"+this.origen.length);

    }



    cerrarModal() {
      this.modalController.dismiss();
    }


  // Detecta el evento de desplazamiento
  onContentScroll(event: any) {
    // console.log(event);
    // console.log("asdasdasd");
    const yOffset = event.detail.scrollTop;
    // console.log("desp_"+yOffset);
    this.isVisible = yOffset > 300; // Muestra el botón si el desplazamiento es mayor a 100px
  }

  // Desplaza hacia la parte superior
  scrollToTop() {
    this.content.scrollToTop(500); // Desplazamiento suave de 500ms
  }


}
