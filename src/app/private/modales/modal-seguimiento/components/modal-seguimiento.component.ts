import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosSeguimiento } from 'src/app/private/interface/datosSeguimiento.interface';
import { DatosSolicitud } from 'src/app/private/interface/datosSolicitud.interface';
import { Respuesta } from 'src/app/private/interface/respuesta.interface';
import { VacanciaService } from 'src/app/public/vacantes/services/vacancia.service';
import { DocumentosService } from '../../modal-documentos/services/documentos.service';
import { MensajesService } from 'src/app/shared/services/mensajes.service';
import { Documento } from 'src/app/private/interface/documento.interface';
import { ModalDocumentosComponent } from '../../modal-documentos/components/modal-documentos.component';

@Component({
  selector: 'app-modal-seguimiento',
  templateUrl: './modal-seguimiento.component.html',
  styleUrls: ['./modal-seguimiento.component.scss'],
})
export class ModalSeguimientoComponent implements OnInit {
  @Input() DatosSolicitud:DatosSolicitud[];
  public DatosSeg: DatosSeguimiento[];
  public documento:Documento = new Documento();
  public cargando:boolean=true;
  constructor(private modalCtrl: ModalController,private vacaServ:VacanciaService,
    private docSer:DocumentosService,private msg:MensajesService) {

  }

  ngOnInit() {
    this.obtenSeguimiento();
  }

  salir(){
    return this.modalCtrl.dismiss("this.name", 'confirm');
  }

    obtenSeguimiento(){
    var info = this.vacaServ.getSeguimientoPlazaVacante(this.DatosSolicitud[0].idPlaza).subscribe(response =>{
      if (response.isPresentAndNoError()) {
        var res:Respuesta<any>
        res=response.get();
        this.DatosSeg=res.data;
        this.cargando=false;
      }
    })
  }

  verDoc(ruta){
    this.docSer.obtenerDoc(ruta)
    .subscribe(response => {
      if (response.isPresentAndNoError()) {
        this.documento.base64 = response.get().data.obtenArchivoResult;
        this.mostrarModalDocumento(this.documento);
      }
      if (response.hasError()) {
        this.msg.mostrarElementoToast('Hubo un error al descargar el documento. Intenta nuevamente.', 'error', 15000);
      }
    });
  }


  private async mostrarModalDocumento(documento: Documento) {
    const modal = await this.modalCtrl.create({
      component: ModalDocumentosComponent,
      cssClass: 'fullscreen',
      componentProps: {
        titulo: "Evidencia",
        base64Doc: documento.base64
      }
    });
    await modal.present();
  }



}
