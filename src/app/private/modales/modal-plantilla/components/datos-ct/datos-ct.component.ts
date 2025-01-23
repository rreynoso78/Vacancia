import { Component, OnInit } from '@angular/core';
import { DatosPlantilla } from 'src/app/private/interface/plantilla.interface';
import { Respuesta } from 'src/app/private/interface/respuesta.interface';
import { PlantillaService } from '../../../../../shared/services/plantilla.service';
import { MensajesService } from 'src/app/shared/services/mensajes.service';

@Component({
  selector: 'app-datos-ct',
  templateUrl: './datos-ct.component.html',
  styleUrls: ['./datos-ct.component.scss'],
})
export class DatosCTComponent implements OnInit {
  datosPlantilla:DatosPlantilla[]=[]
  cct: string;
  rfc: string;
  constructor(private servPlan:PlantillaService,private msg:MensajesService) {
    this.cct =  sessionStorage.getItem("cctConsulta")
    this.rfc =  sessionStorage.getItem("rfcConsulta")
   }

  ngOnInit() {
    this.obtenIfoPlantilla();
  }

   obtenIfoPlantilla(){
    var info:any;
    info = this.servPlan.getHistoriaPlaza({CT:this.cct,RFC:this.rfc}).subscribe(response =>{
      if (response.isPresentAndNoError()) {
        var res:Respuesta<any>
        res=response.get();
        if (res.exito==1){
            this.datosPlantilla= res.data
        }else{
          this.msg.mostrarElementoToast(res.mensaje,"error",5000,"top");
        }
      }
    })
  }

}
