import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceSupport, ProblemDetailsBuilder, ResponseData } from 'ngx-gs-utils';
import { Observable, map } from 'rxjs';
import { Respuesta } from 'src/app/private/interface/respuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class PlantillaService extends HttpServiceSupport{

  constructor(
    private http: HttpClient,
    pdb: ProblemDetailsBuilder
  ) {
    super(pdb);
  }





  public getHistoriaPlaza(p :any): Observable<ResponseData<Respuesta<any>>> {

    const params = new HttpParams()
      .set('claveCCT',p.CT)
      .set('rfc',p.RFC)

    const head = new HttpHeaders({
        'Content-Type': 'application/json',
         'Authorization': 'Bearer ' +sessionStorage.getItem('jwttoken')
      })
    return this.http.get<Respuesta<any>>(this.buildUrl('Plantilla/getHistorialPlaza'),{headers:head,params})
      .pipe(
        map(this.procesarRespuesta()),
       // catchError(this.handleError<ResultadoOperacionDocumento>())
      );
  }

  public getPlantillaSipse(p :any): Observable<ResponseData<Respuesta<any>>> {

    const params = new HttpParams()
      .set('claveCT',p.ct)
      .set('turno',p.turno)

    const head = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +sessionStorage.getItem('jwttoken')
      })
    return this.http.get<Respuesta<any>>(this.buildUrl('Plantilla/getPlantillaSipse'),{headers:head,params})
      .pipe(
        map(this.procesarRespuesta()),
       // catchError(this.handleError<ResultadoOperacionDocumento>())
      );
  }



  // public getDatosCTFederal(p :any): Observable<ResponseData<Respuesta<any>>> {


  //   const params = new HttpParams()
  //     .set('ct',p.ct)

  //   const head = new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' +sessionStorage.getItem('jwttoken')
  //     })
  //   return this.http.get<Respuesta<any>>(this.buildUrl('Plantilla/getDatosCTFederal'),{headers:head,params})
  //     .pipe(
  //       map(this.procesarRespuesta()),
  //      // catchError(this.handleError<ResultadoOperacionDocumento>())
  //     );
  // }


  private procesarRespuesta() {
    return (authRes: Respuesta<any>): ResponseData<Respuesta<any>> => ResponseData.of(authRes);
  }


}
