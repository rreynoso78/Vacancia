import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, HostListener, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Respuesta } from 'src/app/private/interface/respuesta.interface';
import { MensajesService } from 'src/app/shared/services/mensajes.service';
import { NecesidadesCtService } from 'src/app/shared/services/necesidades-ct.service';
import { ModalSolicitudComponent } from '../../../modal-solicitud/components/modal-solicitud.component';

@Component({
  selector: 'modal-tabla-vacantes-disponibles',
  templateUrl: './tabla-compatibles.component.html',
  styleUrls: ['./tabla-compatibles.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TablaLugaresCompatiblesComponent implements OnInit {

  @ViewChild('myTable') table: any;
  // selected = [];
  // SelectionType = SelectionType;
  // loadingIndicator = true;
  ColumnMode = ColumnMode;
  expanded: any = {};
  // reorderable = true;
  public rows: any[];

  public temp = [];

  @Input() public claveCT: string;
  public distancia:number;
  public distanciaMax:number = 45;
  public vacantes:number=0;


  private loading: HTMLIonLoadingElement | null = null; // Almacena la instancia del loader

  constructor(
    private necesidadesServ:NecesidadesCtService,
    public msg:MensajesService,
    private http: HttpClient,
    private loadingCtrl: LoadingController,

    private modalCtrl: ModalController,
  ) { }

  ngOnInit(
  ) {
    this.distancia = this.distanciaMax;
    console.log(this.claveCT);
     this.obtenerVacantesDistancia(this.claveCT,this.distancia);
  }


//   @HostListener('window:resize')
// onResize() {
// if (this.table) {
// setTimeout(() => {
// this.table.element.querySelector('.datatable-scroll').setAttribute('style', 'width:' + this.table.element.querySelector('.datatable-body-row').clientWidth + 'px');
// }, 10);
// }
// }


onDistanciaChange(event: any) {
  console.log('Distancia move end:', event.detail.value);
  this.distancia = event.detail.value; // Updating the volume value

  this.obtenerVacantesDistancia(this.claveCT,this.distancia);
}



  getRowClass(row) {
    return 'table-active' ;
  }



  async obtenerVacantesDistancia(ct:string,distancia:number){
    // this.loadingIndicator= true


    await this.showLoading();

    let datos = {
       "Ct": ct,
      "Distancia":distancia
    }

    console.log(datos);
    var pp=  await this.necesidadesServ.getVacantesParaCTNecesidad(datos)

    pp.subscribe(async response =>{
      if (response.isPresentAndNoError()) {
        var res:Respuesta<any>
        res=response.get();
        if (res.exito==1){
          this.rows=res.data;
          this.temp = res.data;
          console.log(res.data);
          // this.loadingIndicator=false
          this.vacantes = this.rows.length;

        }else{
          this.msg.mostrarElementoToast(res.mensaje,"error",3000,"top");
          this.rows=[];
          this.temp = [];

          // this.loadingIndicator=false

        }

        await this.hideLoading();
      }
    })
  }


  getCellClass({ row, column, value }): any {
    return {
      'getCellClass': true
    };
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

    // if (role === 'confirm') {
    //     this.buscar()
    // }
  }


  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Obteniendo información...',
      // Puedes establecer duration si deseas que se oculte automáticamente
      // duration: 3500,
    });
    await this.loading.present();
  }

  async hideLoading() {
    // console.log("cerrar loading");
    if (this.loading) {
      await this.loading.dismiss(); // Oculta el loader
      this.loading = null; // Limpia la instancia
    }
  }


}
