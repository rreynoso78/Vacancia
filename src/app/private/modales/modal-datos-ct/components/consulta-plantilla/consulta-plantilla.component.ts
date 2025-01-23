import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { UltMovRfcCtComponent } from '../ult-mov-rfc-ct/ult-mov-rfc-ct.component';


import { PlantillaNominaComponent } from 'src/app/private/modales/modal-datos-ct/components/plantilla-nomina/plantilla-nomina.component';
import { PlantillaSipseComponent } from 'src/app/private/modales/modal-datos-ct/components/plantilla-sipse/plantilla-sipse.component';
import { PlantillaLaboralComponent } from 'src/app/private/modales/modal-datos-ct/components/plantilla-laboral/plantilla-laboral.component';

import { MensajesService } from '../../../../../shared/services/mensajes.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'modal-datos-ct-consulta-plantilla',
  templateUrl: './consulta-plantilla.component.html',
})
export class ConsultaPlantillaComponent implements OnInit {
  @Input() public claveCT: string;
  @Input() public RFC: string | null = null;


  @ViewChild('receptor', { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;

  constructor(
    private msg:MensajesService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private http: HttpClient) { }

  ngOnInit() {

    console.log("RFC -->"+this.RFC);

    if(this.RFC){
      this.openTab(1)
    }else{
      this.openTab(2)
    }

  }

  ngAfterViewInit(){

    }


  openTab(value){

    sessionStorage.setItem("cctConsulta",this.claveCT);
    sessionStorage.setItem("rfcConsulta",this.RFC);
    // sessionStorage.setItem("rfcConsulta",this.rfc);
    // sessionStorage.setItem("turnoConsulta",this.datosCt[0].turno);

    let miCompontente:any

    switch(value){
      case 1:
        miCompontente= UltMovRfcCtComponent
        break;
      case 2:
        miCompontente= PlantillaNominaComponent
        break;
      case 3:
        miCompontente= PlantillaSipseComponent
        break;
      case 4:
        miCompontente= PlantillaLaboralComponent
        break;
      default:
        miCompontente= PlantillaNominaComponent
    }

    if (miCompontente) {
      this.viewContainerRef.clear();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(miCompontente);

      // Crear el componente dinámicamente en el ViewContainerRef
      this.viewContainerRef.createComponent(componentFactory);
    }
  }
}
