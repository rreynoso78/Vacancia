import { Component, OnInit } from '@angular/core';
import { PlantillaService } from '../../../../../shared/services/plantilla.service';
import { MensajesService } from 'src/app/shared/services/mensajes.service';
import { ActivatedRoute } from '@angular/router';
import { Respuesta } from 'src/app/private/interface/respuesta.interface';
import {  DatosPlantillaSipse } from 'src/app/private/interface/plantilla.interface';

@Component({
  selector: 'app-plantilla-sipse',
  templateUrl: './plantilla-sipse.component.html',
  styleUrls: ['./plantilla-sipse.component.scss'],
})
export class PlantillaSipseComponent implements OnInit {
  public cct:string;
  public turno:string;
  datosPlantilla:DatosPlantillaSipse[]=[]
  constructor(private servPlan:PlantillaService,private msg:MensajesService,public route: ActivatedRoute) {
    this.cct = sessionStorage.getItem("cctConsulta")
    this.turno =  sessionStorage.getItem("turnoConsulta")

   }

  ngOnInit() {
    this.obtenIfoPlantillaSipse()
  }

  obtenIfoPlantillaSipse(){
    var info:any;
    console.log(this.turno);
    info = this.servPlan.getPlantillaSipse({ct:this.cct,turno:this.turno}).subscribe(response =>{
      if (response.isPresentAndNoError()) {
        var res:Respuesta<any>
        res=response.get();
        if (res.exito==1){
          this.datosPlantilla= res.data
          console.log(res.data);
        }else{
          this.msg.mostrarElementoToast(res.mensaje,"error",5000,"top");
          // this.loadingIndicator=false
        }
      }
    })
  }

}
