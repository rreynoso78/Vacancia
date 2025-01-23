import {  Component, ComponentFactoryResolver, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CT, DatosCT, DatosPlantilla } from 'src/app/private/interface/plantilla.interface';
import { Respuesta } from 'src/app/private/interface/respuesta.interface';
import { MensajesService } from 'src/app/shared/services/mensajes.service';
import { PlantillaService } from 'src/app/shared/services/plantilla.service';
import { HttpClient } from '@angular/common/http';
import { CentroTrabajoService } from 'src/app/shared/services/centro-trabajo.service';

@Component({
  selector: 'modal-datos-ct-datos',
   templateUrl: './datos-ct.component.html',
})
export class DatosCTComponent implements OnInit {

  @Input() public ctDatos: CT;
  @Input() public claveCT: string;

  public datosCT!:CT;

  constructor(

    private ctService: CentroTrabajoService ,
  ) {  }


  ngOnInit() {


    // console.log("ddd");

    this.obtenerDatosCT()
  }

  //  ngOnChanges(changes: SimpleChanges): void {

  //   //consultar si los datos son undefined o vacios
  //    this.datosCT = changes.ctDatos.currentValue;

  //   // console.log(this.datosCT);

  // }



  obtenerDatosCT(){


     console.log("val-"+ this.claveCT);
   // this.servPlan.obtenerDatos(this.ctBuscar); // Llamar al servicio con el nuevo valor

    // this.servPlan.getDatosCTFederal(this.ctBuscar);

    var info:any;
    info = this.ctService.getDatosCTFederal({ct:this.claveCT}).subscribe(response =>{
      if (response.isPresentAndNoError()) {

        var res:Respuesta<any>

     //   console.log(response.get());
        res = response.get();
      //  console.log(res);
      if(res[0]){
        this.datosCT= res[0];


        // console.log(this.datosCT);
         sessionStorage.setItem("turnoConsulta",this.datosCT.turno.id);
        //  console.log(this.datosCt.turno.id);
      }else{
        console.log("datos error");
      }

        // if(response.contents){
        //   console.log(res[0]);
        // }



        // if (res.exito==1){
        //   this.datosCt= res.data[0]
        //   console.log(res)
        // }else{
        //   this.msg.mostrarElementoToast(res.mensaje,"error",5000,"top");
        // // this.loadingIndicator=false
        // }


      }//que pasa si hay error
    });

}







}
