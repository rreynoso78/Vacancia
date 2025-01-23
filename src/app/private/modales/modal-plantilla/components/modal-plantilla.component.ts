import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import {  ModalController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { DatosCT, DatosPlantilla } from 'src/app/private/interface/plantilla.interface';
import { Respuesta } from 'src/app/private/interface/respuesta.interface';

import { DatosCTComponent } from './datos-ct/datos-ct.component';

import { PlantillaNominaComponent } from '../../modal-datos-ct/components/plantilla-nomina/plantilla-nomina.component';
import { PlantillaSipseComponent } from '../../modal-datos-ct/components/plantilla-sipse/plantilla-sipse.component';
import { PlantillaLaboralComponent } from '../../modal-datos-ct/components/plantilla-laboral/plantilla-laboral.component';

import { ReceptorDirective } from '../../receptor.directive';
import { MensajesService } from 'src/app/shared/services/mensajes.service';
import { PlantillaService } from '../../../../shared/services/plantilla.service';


@Component({
  selector: 'app-modal-plantilla',
  templateUrl: './modal-plantilla.component.html',
  styleUrls: ['./modal-plantilla.component.scss'],
})
export class ModalPlantillaComponent implements OnInit {
  @Input() rfc: string;
  @Input() cct: string;
  @ViewChild(ReceptorDirective, {static: true}) receptor: ReceptorDirective;
  @Input() compo: any;



  datosCt:DatosCT[]=[]
  name: string;
  public url: SafeResourceUrl;
  public showDefaultMessage = true; // default state


  constructor(private modalCtrl: ModalController,  private sanitizer: DomSanitizer,
              private servPlan:PlantillaService,
              private msg:MensajesService,private componentFactoryResolver: ComponentFactoryResolver
  ) {


  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
  ngOnInit() {
    this.obtenDatosCT();

  }
  ngAfterViewInit(){
    this.navega(1)
    }


  obtenDatosCT(){

    // var info:any;
    // info = this.servPlan.getDatosCTFederal({ct:this.cct}).subscribe(response =>{
    //   if (response.isPresentAndNoError()) {
    //     var res:Respuesta<any>
    //     res=response.get();
    //     if (res.exito==1){
    //        this.datosCt= res.data
    //        console.log(this.datosCt)
    //     }else{
    //       this.msg.mostrarElementoToast(res.mensaje,"error",5000,"top");
    //      // this.loadingIndicator=false
    //     }
    //   }
    // })
  }


  navega(value){
    sessionStorage.setItem("cctConsulta",this.cct);
    sessionStorage.setItem("rfcConsulta",this.rfc);
    sessionStorage.setItem("turnoConsulta",this.datosCt[0].turno);

    let miCompontente:any
    if (value==1)
      miCompontente= DatosCTComponent;

    if (value==2)
      miCompontente= PlantillaNominaComponent
    if (value==3)
      miCompontente= PlantillaSipseComponent
    if (value==4)
      miCompontente= PlantillaLaboralComponent

    if (miCompontente) {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(miCompontente);
      let viewContainerRef = this.receptor.viewContainerRef;
      viewContainerRef.clear();
      viewContainerRef.createComponent(componentFactory);
    }

  }






}
