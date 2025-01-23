import { Component, Input, OnInit,ViewEncapsulation  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { paramLugaresDisponiblesSolicita } from 'src/app/private/clases/paramLugaresDis';
import { DatosSolicitud } from 'src/app/private/interface/datosSolicitud.interface';
import { Respuesta } from 'src/app/private/interface/respuesta.interface';
import { LugaresDispService } from 'src/app/public/lugares-disp/services/lugares-disp.service';
import { MensajesService } from 'src/app/shared/services/mensajes.service';
import { DocumentosService } from '../../modal-documentos/services/documentos.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-modal-solicitud',
  templateUrl: './modal-solicitud.component.html',
  styleUrls: ['./modal-solicitud.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalSolicitudComponent implements OnInit {
  @Input() DatosSolicitud:DatosSolicitud
  public observa:string="";
  public justifica:string="";
  public simple:true;
  public otroCT:string="";
  public fileToUpload:any;
  public nombreDoc:string;

  slcPrioridad: string;
    optionsPrioridad = [
      { value: '1', label: 'Alta' },
      { value: '2', label: 'Media' },
      { value: '3', label: 'Baja' },
    ];


  constructor(private modalCtrl: ModalController,
    private servLugar:LugaresDispService,
    private msg:MensajesService,
    private docServ:DocumentosService) {

  }

  ngOnInit() {

  }

  solicitar(){
    let datos:paramLugaresDisponiblesSolicita;
    datos = new paramLugaresDisponiblesSolicita();
    datos.CargaUSICAMM = 1;
    datos.Observaciones = this.observa
    datos.ReqRec=1;
    datos.EstatusVacancia=this.DatosSolicitud.idPlaza==0?1:3;
    datos.FechaDeCarga= this.DatosSolicitud.fechaDeCarga// pendiente para saber de donde se va a tomar
    datos.idClasifica =0
    datos.IdUsuario= Number(sessionStorage.getItem("IdUsuario"));
    datos.PlazaF = this.DatosSolicitud.plazaFONE;
    datos.IdPlaza = this.DatosSolicitud.idPlaza ;// se manda cero porque se registra la solicitud.
    datos.Justificacion= this.justifica;
    datos.CCT_Asigna = this.otroCT==""? this.DatosSolicitud.cct:this.otroCT;
    var info:any;
    info = this.servLugar.actualizaVacanciaPlaza(datos).subscribe(response =>{
    if (response.isPresentAndNoError()) {
        var res:Respuesta<any>
        res=response.get();
        if (res.exito==1){
          this.msg.mostrarElementoToast("Se hizo la solicitud correctamente","correcto",3000,"top");
            if (this.fileToUpload.size > 0)
              this.uploadFile(res.data[0].idSeguimiento,this.DatosSolicitud.plazaFONE,this.DatosSolicitud.cat_Puesto)

        }else{
          this.msg.mostrarElementoToast(res.mensaje,"error",3000,"top");
        }
      }else{
        this.msg.mostrarElementoToast("Ocurrió un error al actualizar, reportar al administrador del sistema","error",5000,"top");
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


  salir() {
    return this.modalCtrl.dismiss("this.name", 'confirm');
  }
}
