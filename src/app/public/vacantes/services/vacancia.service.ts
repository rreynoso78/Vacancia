import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceSupport, ProblemDetailsBuilder, ResponseData } from 'ngx-gs-utils';
import { Observable, map, timeout } from 'rxjs';
import { Respuesta, VacanciaResponse } from 'src/app/private/interface/respuesta.interface';
import { paramLugaresDisponibles } from 'src/app/private/clases/paramLugaresDis';

 



@Injectable({
  providedIn: 'root'
})
export class VacanciaService extends HttpServiceSupport{

  constructor(
    private http: HttpClient,
    pdb: ProblemDetailsBuilder
  ) {
    super(pdb);
  }
 
  public getVacancia(p :paramLugaresDisponibles): Observable<ResponseData<Respuesta<VacanciaResponse>>> {
   
    const params = new HttpParams()
      .set('sistema', p.sistema)
      .set('idClasifica',p.idClasifica)
      .set('idNivelEducativo',p.idNivelEducativo)
      .set('Qna_Ini',p.Qna_Ini)
      .set('Qna_Fin',p.Qna_Fin)
      .set('IdFuncion',p.IdFuncion)
      .set('EsCatUsicamm',p.EsCatUsicamm)
      .set('Criterio',p.Criterio)
      .set('textoBusqueda',p.textoBusqueda)
      .set('IdEstatusVacancia',p.IdEstatusVacancia)
      .set('IdUsuario',p.IdUsuario)
      const head = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +sessionStorage.getItem('jwttoken')
      })
    return this.http.get<Respuesta<VacanciaResponse>>(this.buildUrl('Plazas/getVacancia'),{headers:head,params})
      .pipe(
        map(this.procesarRespuestaVacancia()),
       // catchError(this.handleError<ResultadoOperacionDocumento>())
      );
   
     
  }
  public getPlazasSolicitadas(p :paramLugaresDisponibles): Observable<ResponseData<Respuesta<VacanciaResponse>>> {
   
    const params = new HttpParams()
      .set('sistema', p.sistema)
      .set('idClasifica',p.idClasifica)
      .set('idNivelEducativo',p.idNivelEducativo)
      .set('Qna_Ini',p.Qna_Ini)
      .set('Qna_Fin',p.Qna_Fin)
      .set('IdFuncion',p.IdFuncion)
      .set('EsCatUsicamm',p.EsCatUsicamm)
      .set('Criterio',p.Criterio)
      .set('textoBusqueda',p.textoBusqueda)
      .set('IdEstatusVacancia',p.IdEstatusVacancia)
      const head = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +sessionStorage.getItem('jwttoken')
      })
    return this.http.get<Respuesta<VacanciaResponse>>(this.buildUrl('Plazas/getPlazasSolicitadas'),{headers:head,params})
      .pipe(
        map(this.procesarRespuestaVacancia()),
       // catchError(this.handleError<ResultadoOperacionDocumento>())
      );
   
     
  }

  public getSeguimientoPlazaVacante(p :number): Observable<ResponseData<Respuesta<any>>> {
    const params = new HttpParams()
      .set('idPlazaProceso',p)
   
    const head = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +sessionStorage.getItem('jwttoken')
      })
    return this.http.get<Respuesta<any>>(this.buildUrl('Plazas/getSeguimientoVacancia'),{headers:head,params})
      .pipe(
        map(this.procesarRespuesta()),
       // catchError(this.handleError<ResultadoOperacionDocumento>())
      );
  }

  private procesarRespuesta() {
    return (authRes: Respuesta<any>): ResponseData<Respuesta<any>> => ResponseData.of(authRes);
  }


  private procesarRespuestaVacancia() {
    return (authRes: Respuesta<VacanciaResponse>): ResponseData<Respuesta<VacanciaResponse>> => ResponseData.of(authRes);
  }
}
