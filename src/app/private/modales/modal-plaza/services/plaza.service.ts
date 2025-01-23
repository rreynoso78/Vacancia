import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceSupport, ProblemDetailsBuilder, ResponseData } from 'ngx-gs-utils';
import { Observable, map } from 'rxjs';
import { Respuesta } from 'src/app/private/interface/respuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class PlazaService  extends HttpServiceSupport{

  constructor(
    private http: HttpClient,
    pdb: ProblemDetailsBuilder
  ) {
    super(pdb);
  }


  public getEstatusPlaza(p :any): Observable<ResponseData<Respuesta<any>>> {
   
    const params = new HttpParams()
      .set('plazaF',p.plazaF)
       
    const head = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +sessionStorage.getItem('jwttoken')
      })
    return this.http.get<Respuesta<any>>(this.buildUrl('Plazas/getEstatusPlaza'),{headers:head,params})
      .pipe(
        map(this.procesarRespuesta()),
       // catchError(this.handleError<ResultadoOperacionDocumento>())
      );
  }
  public getEstatusPlazaMDP(p :any): Observable<ResponseData<Respuesta<any>>> {
   
    const params = new HttpParams()
      .set('plazaF',p.plazaF)
       
    const head = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +sessionStorage.getItem('jwttoken')
      })
    return this.http.get<Respuesta<any>>(this.buildUrl('Plazas/getEstatusPlazaMDP'),{headers:head,params})
      .pipe(
        map(this.procesarRespuesta()),
       // catchError(this.handleError<ResultadoOperacionDocumento>())
      );
  }
  private procesarRespuesta() {
    return (authRes: Respuesta<any>): ResponseData<Respuesta<any>> => ResponseData.of(authRes);
  }

}
