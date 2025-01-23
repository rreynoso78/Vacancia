
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController, NavParams } from '@ionic/angular';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'modal-vacantes-disp',
  templateUrl: './modal-vacantes-disp.component.html',
  styleUrls: ['./modal-vacantes-disp.component.css'],
})
export class ModalVacantesDispComponent implements OnInit {


  @ViewChild('content', { static: false }) content: IonContent;
  isVisible = false;

  public claveCT: string;
  public necesidad:any;

  public situacion:string;


  constructor(private modalController: ModalController,
    private navParams: NavParams,
    private modalService: ModalService

  ) {}

  ngOnInit(): void {
    console.log(this.navParams);
    this.claveCT= this.navParams.get('claveCt');
    this.necesidad = this.navParams.get('necesidad');
    // console.log(this.necesidad);
    // this.situacion= this.necesidad.nombreSituacion;
    //recibe el row
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
