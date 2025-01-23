import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Funcion } from 'src/app/shared/interfaces/catalogos';

@Component({
  selector: 'modal-datos-necesidad-ct',
  templateUrl: './datos-necesidad-ct.component.html',
})
export class DatosNecesidadCtComponent implements OnInit{

  public jsonFunciones: Funcion[];

  @Input() necesidad:any;

  public idFuncion:number;
  public funcion:string;
  public situacion:string;
  public fechaRegistro:string;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.obtenerFunciones();
    console.log(this.necesidad);
    this.idFuncion= this.necesidad.id_Funcion;
    this.situacion = this.necesidad.nombreSituacion;
    this.fechaRegistro =  (this.necesidad.fecha_Registro).substring(0,10);
    setTimeout(() => {
      this.funcion =  this.obtenerNombreFuncion(this.necesidad.id_Funcion);
    }, 100);

  }


  obtenerFunciones(){
    this.http.get('assets/data/cat-funciones.json').subscribe(data => {
      // this.jsonFunciones = data.toString());
      this.jsonFunciones = data as Funcion[];
      // console.log( this.jsonFunciones);

      console.log(this.jsonFunciones);
    });
  }

  obtenerNombreFuncion(idFuncion:number):string{
    console.log(idFuncion);
    const filteredItem = this.jsonFunciones.filter(item => item.id === idFuncion).map(item => item.funcion);
    return filteredItem.toString();
  }

}
