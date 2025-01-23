import { Component, Input, OnInit } from '@angular/core';
import { PlazaService } from '../services/plaza.service';
import { Respuesta } from 'src/app/private/interface/respuesta.interface';
import { MensajesService } from 'src/app/shared/services/mensajes.service';
import { ModalController } from '@ionic/angular';
import { DatosPlaza } from 'src/app/private/interface/datosPlaza.interface';

@Component({
  selector: 'app-modal-plaza',
  templateUrl: './modal-plaza.component.html',
  styleUrls: ['./modal-plaza.component.scss'],
})
export class ModalPlazaComponent implements OnInit {
  @Input() plaza: string;
  DatosPlaza:DatosPlaza[]=[];
  DatosMDP:any[]=[];
  loadingIndicator:boolean=true;
  constructor(private plazaSer:PlazaService,private msg:MensajesService,private modalCtrl: ModalController,) { }

  ngOnInit() {

    this.getEstatusPlaza();
    this.getEstatusPlazaMDP();
  }

  getEstatusPlaza(){
    let pl;
    pl = this.plazaSer.getEstatusPlaza({plazaF:this.plaza}).subscribe(response =>{
      if (response.isPresentAndNoError()) {
        var res:Respuesta<any>
        res=response.get();
        if (res.exito==1){
          this.DatosPlaza=res.data;
          this.loadingIndicator=false;
          //console.log(res.data);
        }else{
          this.msg.mostrarElementoToast(res.mensaje,"error",5000,"top");
           this.loadingIndicator=false
        }
      }
    })
  }
  getEstatusPlazaMDP(){
    let pl;
    pl = this.plazaSer.getEstatusPlazaMDP({plazaF:this.plaza}).subscribe(response =>{
      if (response.isPresentAndNoError()) {
        var res:Respuesta<any>
        res=response.get();
        if (res.exito==1){
          this.DatosMDP=res.data;
          this.loadingIndicator=false;
          //console.log(res.data);
        }else{
          this.msg.mostrarElementoToast(res.mensaje,"error",5000,"top");
           this.loadingIndicator=false
        }
      }
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss("", 'confirm');
  }
}
