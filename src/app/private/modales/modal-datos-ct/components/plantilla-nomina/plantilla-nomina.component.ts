import { Component, OnInit } from '@angular/core';
import { PlantillaService } from '../../../../../shared/services/plantilla.service';
import { Respuesta } from 'src/app/private/interface/respuesta.interface';
import { DatosPlantilla, DatosPlantillaNomina } from 'src/app/private/interface/plantilla.interface';
import { MensajesService } from 'src/app/shared/services/mensajes.service';
import { DatosCtService } from 'src/app/shared/services/datos-ct.service';


@Component({
  selector: 'app-plantilla-nomina',
  templateUrl: './plantilla-nomina.component.html',
  styleUrls: ['./plantilla-nomina.component.scss'],
})
export class PlantillaNominaComponent implements OnInit {
  public cct:string;
  datosPlantilla:DatosPlantillaNomina[]=[]
  constructor(private datosCtServ:DatosCtService,private msg:MensajesService) {
    this.cct =  sessionStorage.getItem("cctConsulta")

  }

  ngOnInit() {
    this.obtenIfoPlantilla()
  }

  obtenIfoPlantilla(){
    var info:any;
    info = this.datosCtServ.getHistoriaPlantillaNomina({CT:this.cct}).subscribe(response =>{
      if (response.isPresentAndNoError()) {
        var res:Respuesta<any>
        res=response.get();
        if (res.exito==1){
          this.datosPlantilla= res.data
          console.log(this.datosPlantilla);
        }else{
          this.msg.mostrarElementoToast(res.mensaje,"error",5000,"top");
          // this.loadingIndicator=false
        }
      }
    })
  }

}

