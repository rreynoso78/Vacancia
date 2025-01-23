import { HttpClient } from '@angular/common/http';
import { Component,  ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

import { CT } from 'src/app/private/interface/plantilla.interface';
import { Respuesta } from 'src/app/private/interface/respuesta.interface';
import { ModalDatosCtComponent } from 'src/app/private/modales/modal-datos-ct/components/info-ct/info-ct.component';
import { ModalVacantesDispComponent } from 'src/app/private/modales/modal-lugares-compatibles/components/modal-vacantes-disp/modal-vacantes-disp.component';
import { Funcion } from 'src/app/shared/interfaces/catalogos';
import { MensajesService } from 'src/app/shared/services/mensajes.service';
import { NecesidadesCtService } from 'src/app/shared/services/necesidades-ct.service';

@Component({
  selector: 'app-necesidades-ct',
  templateUrl: './necesidades-ct-page.component.html',
  styleUrls: ['./necesidades-ct-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})

export class NecesidadesCtComponent   {


  @ViewChild('myTable') table: any;
  labelBusqueda:string="";
  selected = [];
  SelectionType = SelectionType;
  loadingIndicator = true;
  ColumnMode = ColumnMode;
  reorderable = true;
  expanded: any = {};
  public rows: any[];

  public temp = [];

  public  datosCt:CT;

  public  datosCtFiltered:CT;

  public ctBuscar:string='';
  public ctBuscado:string='';


  public jsonFunciones: Funcion[];


  @ViewChild('ctInput')public ctInput! : IonInput;
  // FormNecesidadesCT:FormGroup

  constructor(
    private modalController: ModalController,
    private necesidadesServ:NecesidadesCtService,
    public msg:MensajesService,
    private http: HttpClient,
    // private formBuilder:FormBuilder,
  ) {

   }



   ngOnInit() {
    // this.builderForm();
    this.obtenerFunciones();
    this.obtenerNeCesidades('',0);
  }



  async obtenerNeCesidades(ct:string,status:number){
    this.loadingIndicator= true

    let datos = {
       "Ct": ct,
      "Status":status
    }

    console.log(datos);
    var pp=  await this.necesidadesServ.getNecesidadesCT(datos)

    pp.subscribe(response =>{
      if (response.isPresentAndNoError()) {
        var res:Respuesta<any>
        res=response.get();
        if (res.exito==1){
          this.rows=res.data;
          this.temp = res.data;
          console.log(res.data);
          this.loadingIndicator=false

        }else{
          this.msg.mostrarElementoToast(res.mensaje,"error",3000,"top");
          this.rows=[];
          this.temp = [];

          this.loadingIndicator=false
        }
      }
    })
  }


  refreshComponent() {
    // Lógica para actualizar el componente, por ejemplo, volver a cargar datos
    console.log("Componente actualizado");
    this.obtenerNeCesidades('',0); // Llama a un método para actualizar datos
  }

  obtenerFunciones(){
    this.http.get('assets/data/cat-funciones.json').subscribe(data => {
      // this.jsonFunciones = data.toString());
      this.jsonFunciones = data as Funcion[];
      // console.log( this.jsonFunciones);
    });
  }

  obtenerNombreFuncion(idFuncion:number){
    const filteredItem = this.jsonFunciones.filter(item => item.id === idFuncion).map(item => item.funcion);;
    return filteredItem;
  }


  calcularSuma(ct:number, loc: number,mpio:number, reg:number): number {
    // console.log(ct);
    // return Object.values(registro).reduce((sum, value) => sum + value, 0);
    return ct+loc+mpio+reg;
  }








    buscarCT(){

      this.ctBuscar = this.ctInput.value.toString();

      this.rows = this.temp.filter(datos => datos.cct.includes(this.ctBuscar.toUpperCase()) );

      console.log(this.rows);

      console.log("buscar");
    }



    agregarNecesidad(){
      console.log("agregar necesidad");
     // this.obtenDatosCT();
      this.abrirModal();

    }


    async abrirModal() {

      this.ctBuscar = this.ctInput.value.toString();

      const modal = await this.modalController.create({
        component: ModalDatosCtComponent,
        cssClass: 'fullscreen',
        breakpoints: [0, 1],
        initialBreakpoint: 1,
        componentProps: {
          claveCT:   this.ctBuscar,
          // RFC:  null //'OIMC861111124' // Parámetro que deseas pasar al modal
          origen: 'necesidades'
        }
      });

      modal.onDidDismiss().then((response) => {
        // if (response.role === 'confirm') {
        //   console.log('Modal cerrada con:', response.data);
        // } else {
        //   console.log('Modal cerrada sin confirmar.');
        // }

        this.refreshComponent();

      });



      return await modal.present();
    }




  async openModalDetalleCt(ct: string) {
    // console.log("detalleCT");

      const modal = await this.modalController.create({
        component: ModalDatosCtComponent,
        cssClass: 'fullscreen',
        breakpoints: [0, 1],
        initialBreakpoint: 1,
        componentProps: {
          claveCT: ct,//  this.ctBuscar,
          // RFC:  null //'OIMC861111124' // Parámetro que deseas pasar al modal

        }
      });
      return await modal.present();
    }


  async openModalVacantesComp(row: any) {
    // console.log(row);
    // console.log(row.cct);

    const modal = await this.modalController.create({
      component: ModalVacantesDispComponent,
      cssClass: 'fullscreen',
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      componentProps: {
        claveCt: row.cct ,
        necesidad: row, // this.ctBuscar,
        // RFC:  null //'OIMC861111124' // Parámetro que deseas pasar al modal

      }
    });
    return await modal.present();
  }



    onClearInput(ev: any) {
      this.rows=this.temp;
      console.log("borrar datos1");
    }


    getRowClass(row) {
      return 'table-active' ;
    }
    //const claveCT = this.tagInput.value;
    //this.ctBuscado = claveCT;
    //const newTag = this.tagInput;
    //this.claveCT = newTag;

    //this.servPlan.getDatosCTFederal(this.ctInput);


    // var info:any;
    // info = this.servPlan.getDatosCTFederal({ct:this.ctInput}).subscribe(response =>{
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
    // });


































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


}
