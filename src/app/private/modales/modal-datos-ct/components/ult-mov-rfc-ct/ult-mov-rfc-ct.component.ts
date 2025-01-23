import { Component, OnInit } from '@angular/core';
import { Respuesta } from 'src/app/private/interface/respuesta.interface';
import { PlantillaService } from 'src/app/shared/services/plantilla.service';
import { DatosPlantilla } from 'src/app/private/interface/plantilla.interface';
import { MensajesService } from 'src/app/shared/services/mensajes.service';

@Component({
  selector: 'shared-ultMov-RfcCt',
  templateUrl: './ult-mov-rfc-ct.component.html',
})
export class UltMovRfcCtComponent implements OnInit {
  datosPlantilla:DatosPlantilla[]=[]
  cct: string;
  rfc: string;
  nombreCt:string;

  public isLoading: boolean = false;

  constructor(private servPlan:PlantillaService,
      private msg:MensajesService,
      ) {
    this.cct =  sessionStorage.getItem("cctConsulta")
    this.rfc =  sessionStorage.getItem("rfcConsulta")


   }

  ngOnInit() {
    //Loader 1 second

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
            this.nombreCt= this.datosPlantilla[0].nombre;

        }else{
          this.msg.mostrarElementoToast(res.mensaje,"error",5000,"top");
        }
      }
    })
  }
}
