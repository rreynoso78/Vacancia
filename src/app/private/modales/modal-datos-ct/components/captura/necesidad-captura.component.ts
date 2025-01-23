import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Funcion, Prioridad, Situaciones} from 'src/app/shared/interfaces/catalogos';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CT } from 'src/app/private/interface/plantilla.interface';
import { CentroTrabajoService } from 'src/app/shared/services/centro-trabajo.service';
import { Respuesta } from 'src/app/private/interface/respuesta.interface';
import { MensajesService } from 'src/app/shared/services/mensajes.service';
import { paramNecesidadesCT } from 'src/app/private/clases/paramNecesidadCt';
import { NecesidadesCtService } from 'src/app/shared/services/necesidades-ct.service';
import { clippingParents } from '@popperjs/core';
import { UtilidadesService } from 'src/app/shared/services/utilidades.service';

@Component({
  selector: 'necesidad-captura',
  templateUrl: './necesidad-captura.components.html',
})

export class CapturaNecesidadComponent implements OnInit {


  @Input() public claveCT: string;
  selectedFunction: number = 0;


  public errorMessage: string | null = null;


  public jsonFunciones: Funcion[];
  public jsonPrioridades: Prioridad[] ;
// Almacena las opciones filtradas
  selectedMateria: number = 0;            // Almacena la materia seleccionada
  searchTerm: string = '';
  prioridad:Prioridad;
  datosCT:CT;
  situaciones: Situaciones [];


  formCapturaNecesidadCT: FormGroup;

  constructor(private modalController: ModalController,
    private ctService: CentroTrabajoService ,
    private http: HttpClient,
    private msg:MensajesService,
    private fb: FormBuilder,
    private servNecesidadCt:NecesidadesCtService,
    private utilService: UtilidadesService
  ) {
    this.formCapturaNecesidadCT = this.fb.group({
      funcion: [''],
      materia: [''],
      prioridad: [''],
      situacion: [''],
      observaciones: [''],

    });
  }

  ngOnInit() {
    console.log("ct->"+this.claveCT);
    this.obtenerFunciones()
    this.obtenerPrioridades()
    this.obtenerDatosCT()
    this.obtenerSituaciones()
  }



  obtenerFunciones(){
    this.http.get('assets/data/cat-funciones.json').subscribe(data => {
      // this.jsonFunciones = data.toString());
      this.jsonFunciones = data as Funcion[];
      // console.log( this.jsonFunciones);
    });
  }


  onSelectChange(event: any) {
    this.selectedFunction = event.detail.value;  // Obtenemos el valor seleccionado
    // console.log(typeof(event.detail.value));
    // console.log(typeof(this.selectedFunction));
  }


  obtenerPrioridades(){
    this.http.get('assets/data/cat-prioridades.json').subscribe(data => {
      this.jsonPrioridades = data as Prioridad[];
    });
  }


  obtenerSituaciones(){
    var dataEsta:any;
    dataEsta = this.utilService.getSituaciones().subscribe(s=>{
      var res:Respuesta<any>;
      res = s.get();
      console.log(res.data);
      this.situaciones = res.data;
    })
  }


  cancelarCaptura() {
    this.modalController.dismiss();
  }


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


        console.log(this.datosCT);
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

  async guardarNecesidad() {

    console.log("guardaNecesidad");

    let resp:any;
    let datos:any;

    let params:paramNecesidadesCT;
    params = new paramNecesidadesCT();

    params.claveCt = this.datosCT.clave;
    params.idFuncion = this.formCapturaNecesidadCT.get('funcion')?.value;
    params.idMateria=1;
    params.idPrioridad= this.formCapturaNecesidadCT.get('prioridad')?.value;
    params.idSituacion= this.formCapturaNecesidadCT.get('situacion')?.value;
    params.region = this.datosCT.region;
    params.latitud= this.datosCT.georeferencia.latitud;
    params.longitud = this.datosCT.georeferencia.longitud;
    params.observaciones = this.formCapturaNecesidadCT.get('observaciones')?.value;
    params.idMunicipio = Number(this.datosCT.municipio.id);
    params.idLocalidad = Number(this.datosCT.localidad.id);
    params.idNivelEducativo = 2; //Tomarlo de la sesion
    params.statusAtencion=2; //Ver de donde se va a tomar
    params.horas=10;
    // var info:any;
    // info = this.servNecesidadCt.guardaNecesidadCt(datos).subscribe(

    //   response =>{
    // if (response.isPresentAndNoError()) {
    //     var res:Respuesta<any>
    //     res=response.get();
    //     if (res.exito==1){

    //       this.msg.mostrarElementoToast("Se actualizó correctamente","correcto",5000,"top");
    //     }else{
    //       this.msg.mostrarElementoToast(res.mensaje,"error",5000,"top");

    //      // this.loadingIndicator=false
    //     }
    //   }else{
    //     console.log(response.getError);
    //     this.msg.mostrarElementoToast("Ocurrió un error al crear el registro,favor de verificar con el administrador","error",5000,"top");

    //   }
    // })

      console.log(params);

    resp = this.servNecesidadCt.guardaNecesidadCt(
      params).subscribe(

    {
      next: async (data) => {
        datos = data;

        console.log(datos);

        this.errorMessage = null; // Limpia el mensaje de error si la solicitud es exitosa

      },
      error: async (error) => {
        console.log("error ");
        this.errorMessage = error; // Maneja el error aquí
        console.log(this.errorMessage);


      }

    });

    this.modalController.dismiss();

    }

 }
