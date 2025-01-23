import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceSupport, ProblemDetailsBuilder, ResponseData } from 'ngx-gs-utils';
import { map, Observable } from 'rxjs';
import { paramNecesidadesCT } from 'src/app/private/clases/paramNecesidadCt';
import { NecesidadesResponse, Respuesta } from 'src/app/private/interface/respuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class NecesidadesCtService extends HttpServiceSupport {

  constructor(
    private http: HttpClient,
    pdb: ProblemDetailsBuilder
  ) {
    super(pdb);
  }

  public getNecesidadesCT(p :any): Observable<ResponseData<Respuesta<any>>> {

    const params = new HttpParams()
      .set('ct',p.Ct)
      .set('status',p.Status)

      console.log("Parametros API");
      console.log(params);

    const head = new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' +sessionStorage.getItem('jwttoken')
      })
    return this.http.get<Respuesta<any>>(this.buildUrl('Vacancia/getNecesidadesCT'),{headers:head,params})
      .pipe(
        map(this.procesarRespuesta()),
       // catchError(this.handleError<ResultadoOperacionDocumento>())
      );
  }


  public guardaNecesidadCt(p :paramNecesidadesCT): Observable<ResponseData<Respuesta<NecesidadesResponse>>> {
    // console.log(p);
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +sessionStorage.getItem('jwttoken')
    })
    let options = { headers: head };
  return this.http.put<Respuesta<NecesidadesResponse>>(this.buildUrl('Vacancia/guardaNecesidadCt'),JSON.stringify(p),options)
    .pipe(
      map(this.procesarRespuestaNecesidad()),
    );
  }

  public getVacantesParaCTNecesidad(p :any): Observable<ResponseData<Respuesta<any>>> {

    const params = new HttpParams()
      .set('ct',p.Ct)
      .set('distancia',p.Distancia)

      // console.log("Parametros API");
      // console.log(params);

    const head = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +sessionStorage.getItem('jwttoken')
      })
    return this.http.get<Respuesta<any>>(this.buildUrl('Vacancia/getVacantesxDistancia'),{headers:head,params})
      .pipe(
        map(this.procesarRespuesta()),
       // catchError(this.handleError<ResultadoOperacionDocumento>())
      );
  }









  private procesarRespuestaNecesidad() {
    return (authRes: Respuesta<NecesidadesResponse>): ResponseData<Respuesta<NecesidadesResponse>> => ResponseData.of(authRes);
  }

  private procesarRespuesta() {
    return (authRes: Respuesta<any>): ResponseData<Respuesta<any>> => ResponseData.of(authRes);
  }

}
