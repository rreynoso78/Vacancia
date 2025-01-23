import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceSupport, ProblemDetailsBuilder, ResponseData } from 'ngx-gs-utils';
import { Observable, map } from 'rxjs';
import { paramUpdateLugaresDisponibles } from 'src/app/private/clases/parmaUpVacancia';
import { Respuesta, VacanciaResponse } from 'src/app/private/interface/respuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService extends HttpServiceSupport{

  constructor(
    private http: HttpClient,
    pdb: ProblemDetailsBuilder
  ) {
    super(pdb);
  }

  public getNivelEducativo(p :any): Observable<ResponseData<Respuesta<any>>> {

    const params = new HttpParams()
      .set('sistema',p.sistema)
      .set('login',p.login)

    const head = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +sessionStorage.getItem('jwttoken')
      })
    return this.http.get<Respuesta<any>>(this.buildUrl('Utils/getNivelesEducativos'),{headers:head,params})
      .pipe(
        map(this.procesarRespuesta()),
       // catchError(this.handleError<ResultadoOperacionDocumento>())
      );
  }



  public getEstusVacancia(p :number): Observable<ResponseData<Respuesta<any>>> {
    const params = new HttpParams()
      .set('Id',p)

    const head = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +sessionStorage.getItem('jwttoken')
      })
    return this.http.get<Respuesta<any>>(this.buildUrl('Utils/getCatEstatusVacancia'),{headers:head,params})
      .pipe(
        map(this.procesarRespuesta()),
       // catchError(this.handleError<ResultadoOperacionDocumento>())
      );
  }



  public getSituaciones(): Observable<ResponseData<Respuesta<any>>> {
    const params = new HttpParams()
      // .set('Id',p)

    const head = new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' +sessionStorage.getItem('jwttoken')
      })
    return this.http.get<Respuesta<any>>(this.buildUrl('Vacancia/getSituaciones'),{headers:head,params})
      .pipe(
        map(this.procesarRespuesta()),
       // catchError(this.handleError<ResultadoOperacionDocumento>())
      );
  }



  private procesarRespuesta() {
    return (authRes: Respuesta<any>): ResponseData<Respuesta<any>> => ResponseData.of(authRes);
  }

}
