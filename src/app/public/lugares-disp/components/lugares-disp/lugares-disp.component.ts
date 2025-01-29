import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { paramLugaresDisponibles } from 'src/app/private/clases/paramLugaresDis';
import { Observable, retry } from 'rxjs';
import { Respuesta, VacanciaResponse } from 'src/app/private/interface/respuesta.interface';

import { ModalDatosCtComponent } from 'src/app/private/modales/modal-datos-ct/components/info-ct/info-ct.component';

import { ModalPlantillaComponent } from 'src/app/private/modales/modal-plantilla/components/modal-plantilla.component';
import { ModalPlazaComponent } from 'src/app/private/modales/modal-plaza/components/modal-plaza.component';
import { ModalSeguimientoComponent } from 'src/app/private/modales/modal-seguimiento/components/modal-seguimiento.component';
import { ModalSolicitudComponent } from 'src/app/private/modales/modal-solicitud/components/modal-solicitud.component';
import { VacanciaService } from 'src/app/public/vacantes/services/vacancia.service';
import { MensajesService } from 'src/app/shared/services/mensajes.service';
import { UtilidadesService } from 'src/app/shared/services/utilidades.service';
import * as XLSX from 'xlsx';
import { ModalValidacionComponent } from 'src/app/private/modales/modal-validacion/components/modal-validacion.component';

@Component({
  selector: 'app-lugares-disp',
  templateUrl: './lugares-disp.component.html',
  styleUrls: ['./lugares-disp.component.scss'],
})
export class LugaresDispComponent implements OnInit {
  @ViewChild('myTable') table: any;
  labelBusqueda:string="";
  selected = [];
  SelectionType = SelectionType;
  loadingIndicator = false;
  ColumnMode = ColumnMode;
  reorderable = true;
  expanded: any = {};
  NivelesEducativos:[{'idNivelEducativo':0,'descripcion':''}]
  EstatusVacancia:[{'idEstatus':0,'descripcion':''}]
  public anios =[{anio:2021},{anio:2022},{anio:2023},{anio:2024},{anio:2025},];
  public quincena=['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
  FormVacantes:FormGroup
  public rows: any[];
  public temp = [];
  presentingElement = null;

  columns = [{ name: 'plaza',prop:'plazaFONE' },
             { name: 'cat_Puesto',prop:'cat_Puesto' },
             { name: 'categoria' },
             { name: 'horas' },
             { name: 'cct' },
             { name: 'ultimoMotivo' },
             { name: 'estatusAnalitico'}
            ];

  public IdNivel:number;
  public IdUsuario:number;

  constructor(
    private formBuilder:FormBuilder,public msg:MensajesService,
    private vacService:VacanciaService,
    private utilSrvc:UtilidadesService,
    private modalCtrl: ModalController
    ) {
      this.getNivelEducativos();
      this.getEstatusVancancia();
      this.IdNivel = Number(sessionStorage.getItem("IdNivelEUsu"));
      this.IdUsuario = Number(sessionStorage.getItem("IdUsuario"));
      // if (this.IdNivel == 35)
      //   this.IdNivel = 0

      if (this.IdUsuario == 582)
        this.IdNivel = 0
    }

  ngOnInit() {
    this.builderForm();
    this.presentingElement = document.querySelector('.ion-padding');
  }

  getNivelEducativos(){
    let login = sessionStorage.getItem("login");
    let niv;
    niv = this.utilSrvc.getNivelEducativo({'sistema':'F','login':login}).subscribe(n =>{
      var res:Respuesta<any>
      res=n.get();
      this.NivelesEducativos=res.data;
    })
  }

  getEstatusVancancia(){
    var dataEsta:any;
    dataEsta = this.utilSrvc.getEstusVacancia(0).subscribe(s=>{
      var res:Respuesta<any>;
      res = s.get();
      this.EstatusVacancia = res.data
      //console.log(this.EstatusVacancia);
    })
  }

  builderForm(){
    this.FormVacantes = this.formBuilder.group({
      clasificacion: [
         '1',
        {
          validators: Validators.compose([Validators.required]),
          updateOn: 'blur'
        }
      ],
      servidor: [
        '',
        {
          validators: Validators.compose([Validators.required])
        }
      ],
      funcion: [
        '1',
        {
          validators: Validators.compose([Validators.required])
        }
      ],
      nivelEducativo: [
        '0',//this.IdNivel,
        {
          validators: Validators.compose([Validators.required])
        }
      ],
      anioIni: [
        '0',
        {
          validators: Validators.compose([Validators.required])
        }
      ],
      quinIni: [
        '0',
        {
          validators: Validators.compose([Validators.required])
        }
      ],
      anioFin: [
        '0',
        {
          validators: Validators.compose([Validators.required])
        }
      ],
      quinFin: [
        '0',
        {
          validators: Validators.compose([Validators.required])
        }
      ],
      criterio: [
        '0',
        {
          validators: Validators.compose([Validators.required])
        }
      ],
      TextoBuscar: [
        "",
        {
          validators: Validators.compose([Validators.required])
        }
      ],
      IdEstatus: [
        '0',
        {
          validators: Validators.compose([Validators.required])
        }
      ]
    });

  }


  async buscar(){
    this.loadingIndicator= true
    let datos:paramLugaresDisponibles;
    datos = new paramLugaresDisponibles();
    var Qna_Fin
    var Qna_Ini

    Qna_Ini = this.FormVacantes.controls["anioIni"].value.toString() + this.FormVacantes.controls["quinIni"].value.toString() ;
    Qna_Fin = this.FormVacantes.controls["anioFin"].value.toString() + this.FormVacantes.controls["quinFin"].value.toString() ;

    datos.EsCatUsicamm=1
    datos.IdFuncion=this.FormVacantes.controls["funcion"].value
    datos.Qna_Ini=parseInt(Qna_Ini);
    datos.Qna_Fin=parseInt(Qna_Fin);
    datos.idClasifica=this.FormVacantes.controls["clasificacion"].value
    datos.idNivelEducativo=this.FormVacantes.controls["nivelEducativo"].value
    datos.sistema='F'
    datos.Criterio=this.FormVacantes.controls["criterio"].value
    datos.textoBusqueda=this.FormVacantes.controls["TextoBuscar"].value
    datos.IdEstatusVacancia=this.FormVacantes.controls["IdEstatus"].value
    datos.IdUsuario= Number(sessionStorage.getItem("IdUsuario"));
    var vac = (await this.vacService.getVacancia(datos)).subscribe(response =>{
      if (response.isPresentAndNoError()) {
        var res:Respuesta<any>
        res=response.get();
        if (res.exito==1){
          this.rows=res.data;
          this.temp = res.data;
          console.log(this.temp);
          this.loadingIndicator=false


        }else{
          this.msg.mostrarElementoToast(res.mensaje,"error",5000,"top");
          this.rows=[];
          this.temp = [];

          this.loadingIndicator=false
        }
      }
    })
  }

  exportar(){
     /* pass here the table id */
     var name = new Date();

     const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet( this.temp );

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, "LugaresDisponibles_"+name.toDateString() +".xlsx");
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', this.expanded);
    this.table.rowDetail.toggleExpandRow(row);
  }
  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  getRowClass = (row) => {
    switch(row.pagoDemasia) {
      case "Si": {
        return  {'incorrecto': true}
      }
      case "No": {
        return  {'correcto': true}
      }
    }
 }

 getCellClass({ row, column, value }): any {
  return {
    'getCellClass': true
  };
}

  toggleMenu() {
    const splitPane = document.querySelector('ion-split-pane');
    const windowWidth = window.innerWidth;
    const splitPaneShownAt = 992;
    const when = `(min-width: ${splitPaneShownAt}px)`;
    if (windowWidth >= splitPaneShownAt) {
      // split pane view is visible
        const open = splitPane.when === when;
        splitPane.when = open ? false : when;
    } else {
      // split pane view is not visible
      // toggle menu open
        const menu = splitPane.querySelector('ion-menu');
        menu.animate( {duration: 3000,iterations: Infinity})
        return menu.open();
    }
  }

  async openPlantilla(Cct:string,Rfc:string){
    const modal = await this.modalCtrl.create({
      // component: ModalPlantillaComponent,
      component: ModalDatosCtComponent,
      cssClass: 'fullscreen',
      componentProps: {
        claveCT: Cct,
        RFC: Rfc
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {

      //this.message = `Hello, ${data}!`;
    }
  }

  async openDetallePlaza(plazaF:string){
    const modal = await this.modalCtrl.create({
      component: ModalPlazaComponent,
      cssClass: 'fullscreen',
      componentProps: {
        plaza: plazaF
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {

      //this.message = `Hello, ${data}!`;
    }
  }


  FiltrarPor(event,filtro) {
    let val;
    if (filtro==2)
      val= event.detail.value;
    else
      val = event.target.value.toLowerCase();
    var data;
    // filter our data
    switch(filtro) {
      case 1: {
        data = this.temp.filter(function (d) {
          return d.plazaFONE.toLowerCase().indexOf(val) !== -1 || !val;
        });

         break;
      }
      case 2: {
        data = this.temp.filter(function (d) {
          return val==0? d.idEstatus_Vacante>=0:d.idEstatus_Vacante==val;
        });

         break;
      }
      case 3: {
        data = this.temp.filter(function (d) {
          return d.cct.toLowerCase().indexOf(val) !== -1 || !val;
        });

        break;
     }

   }

    // update the rows
    this.rows = data;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  async AbreSolicitud(dt) {
    console.log(dt);
    const modal = await this.modalCtrl.create({
      component: ModalSolicitudComponent,
      cssClass: 'medium',
      componentProps: {
        DatosSolicitud:dt
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
        this.buscar()
    }
  }

  async AbreSeguimiento(dt){
    var datos: any[] = [];
    datos.push(dt);
    const modal = await this.modalCtrl.create({
      component: ModalSeguimientoComponent,
      cssClass: 'fullscreen',
      componentProps: {
        DatosSolicitud:datos
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      //this.message = `Hello, ${data}!`;
    }
  }

  getfiltro(){
    let value = this.FormVacantes.controls["criterio"].value;
    console.log(value);
    switch (value) {
      case "1":{
       this.labelBusqueda= "C.T. "
        break;
      }
      case "2":{
        this.labelBusqueda="Municipio"
        break;
      }
      case "3":{
        this.labelBusqueda="Localidad"
        break;
      }
      case "4":{
        this.labelBusqueda="RFC"
        break;
      }
      case "5":{
        this.labelBusqueda="Plaza"
        break;
      }
      case "6":{
        this.labelBusqueda="Región"
        break;
      }
      default:
        this.labelBusqueda= ""
        break;
    }
    this.FormVacantes.controls["TextoBuscar"].setValue("");
  }

  getDescEstatus(id){
    var data =this.EstatusVacancia.filter(function (d) {
      return d.idEstatus == id
    })

    return  data.length >0?data[0].descripcion||"":"";
  }
}
