import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceSupport, ProblemDetailsBuilder, ResponseData } from 'ngx-gs-utils';
import { Observable, map } from 'rxjs';
import { paramLugaresDisponibles, paramLugaresDisponiblesSolicita } from 'src/app/private/clases/paramLugaresDis';
import { LugaresResponse, Respuesta } from 'src/app/private/interface/respuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class LugaresDispService extends HttpServiceSupport{

  constructor(
    private http: HttpClient,
    pdb: ProblemDetailsBuilder
  ) {
    super(pdb);
  }

  public actualizaVacanciaPlaza(p :paramLugaresDisponiblesSolicita): Observable<ResponseData<Respuesta<LugaresResponse>>> {
      
      const head = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +sessionStorage.getItem('jwttoken')
      })
      let options = { headers: head };
    return this.http.put<Respuesta<LugaresResponse>>(this.buildUrl('Plazas/putVacancia'),JSON.stringify(p),options)
      .pipe(
        map(this.procesarRespuestaVacancia()),
       // catchError(this.handleError<ResultadoOperacionDocumento>())
      );
   
     
  }
  private procesarRespuestaVacancia() {
    return (authRes: Respuesta<LugaresResponse>): ResponseData<Respuesta<LugaresResponse>> => ResponseData.of(authRes);
  }
}
