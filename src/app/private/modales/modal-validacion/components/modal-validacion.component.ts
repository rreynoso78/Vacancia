import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { paramLugaresDisponiblesSolicita } from 'src/app/private/clases/paramLugaresDis';
import { DatosSolicitud } from 'src/app/private/interface/datosSolicitud.interface';
import { Respuesta } from 'src/app/private/interface/respuesta.interface';
import { LugaresDispService } from 'src/app/public/lugares-disp/services/lugares-disp.service';
import { MensajesService } from 'src/app/shared/services/mensajes.service';
import { UtilidadesService } from 'src/app/shared/services/utilidades.service';
import { DocumentosService } from '../../modal-documentos/services/documentos.service';
import { HttpEventType } from '@angular/common/http';
import { Documento } from 'src/app/private/interface/documento.interface';
import { ModalDocumentosComponent } from '../../modal-documentos/components/modal-documentos.component';

@Component({
  selector: 'app-modal-validacion',
  templateUrl: './modal-validacion.component.html',
  styleUrls: ['./modal-validacion.component.scss'],
})
export class ModalValidacionComponent implements OnInit {
  @Input() DatosSolicitud:DatosSolicitud[];
  public IdEstatus:number=0;
  public observa:string;
  public simple:true;
  public otroCT:string="";
  EstatusVacancia:[{'idEstatus':0,'descripcion':''}]
  public fileToUpload:any;
  public nombreDoc:string;
  public documento:Documento = new Documento();
  constructor(private modalCtrl: ModalController,private utilSrvc:UtilidadesService,
    private servLugar:LugaresDispService,
    private msg:MensajesService,private docServ:DocumentosService) {
    this.getEstatusVancancia();

  }

  ngOnInit() {}

  salir() {
    return this.modalCtrl.dismiss("this.name", 'confirm');
  }

  getEstatusVancancia(){
    var dataEsta:any;
    dataEsta = this.utilSrvc.getEstusVacancia(0).subscribe(s=>{
      var res:Respuesta<any>;
      res = s.get();
      this.EstatusVacancia = res.data.filter(f => f.idEstatus != 1  && f.idEstatus != 3)
      this.IdEstatus=2;
    })
  }

  Guardarvalidacion(){
    let datos:paramLugaresDisponiblesSolicita;
    datos = new paramLugaresDisponiblesSolicita();
    datos.CargaUSICAMM = 1;
    datos.Observaciones = this.observa
    datos.ReqRec=1;
    datos.EstatusVacancia=this.IdEstatus;
    datos.FechaDeCarga= this.DatosSolicitud[0].fechaDeCarga// pendiente para saber de donde se va a tomar
    datos.idClasifica =0
    datos.IdUsuario= Number(sessionStorage.getItem("IdUsuario"));
    datos.PlazaF = this.DatosSolicitud[0].plazaFONE;
    datos.IdPlaza = this.DatosSolicitud[0].idPlaza;// se manda cero porque se registra la solicitud.
    datos.Justificacion="";
    datos.CCT_Asigna = this.otroCT==""? this.DatosSolicitud[0].cct:this.otroCT;
    var info:any;
    info = this.servLugar.actualizaVacanciaPlaza(datos).subscribe(response =>{
    if (response.isPresentAndNoError()) {
        var res:Respuesta<any>
        res=response.get();
        if (res.exito==1){
          if (this.fileToUpload.size > 0)
            this.uploadFile(res.data[0].idSeguimiento,this.DatosSolicitud[0].plazaFONE,this.DatosSolicitud[0].cat_Puesto)

          this.msg.mostrarElementoToast("Se actualizó correctamente","correcto",5000,"top");
        }else{
          this.msg.mostrarElementoToast(res.mensaje,"error",5000,"top");

         // this.loadingIndicator=false
        }
      }else{
        this.msg.mostrarElementoToast("Ocurrió un error al actualizar,favor de verificar con el administrador","error",5000,"top");

      }
    })
    this.salir();
  }

  public selecionaImagen= (files:any) => {
    if (files.length === 0) {
      return;
    }
    this.fileToUpload = <File>files[0];
    this.nombreDoc = this.fileToUpload.name
  }

 public uploadFile = (IdSegProc,plaza,cat_Puesto) => {

    const formData = new FormData();
    formData.append('IdSegProc', IdSegProc.toString() || "");
    formData.append('plaza', plaza.toString() || "");
    formData.append('cat_puesto', cat_Puesto.toString() || "");

    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    let resp = this.docServ.subeDocs(formData);
    resp.then((event:any)=>{
      if (event.type === HttpEventType.Response) {
         //console.log(event);
         //alert("Se subió correctamente");
      }
    }).catch((error:any)=>{
      alert("Ocurrio un error, No se pudo guardar el archivo");
    });
  }

  verDoc(ruta){
    this.docServ.obtenerDoc(ruta)
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
