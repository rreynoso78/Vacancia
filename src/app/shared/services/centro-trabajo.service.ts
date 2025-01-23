import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceSupport, ProblemDetailsBuilder, ResponseData } from 'ngx-gs-utils';
import { Observable,map } from 'rxjs';
import { Respuesta } from 'src/app/private/interface/respuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class CentroTrabajoService extends HttpServiceSupport{

  constructor( private http: HttpClient,
    pdb: ProblemDetailsBuilder
  ) {
    super(pdb);

  }

  public getDatosCTFederal(p :any): Observable<ResponseData<Respuesta<any>>> {

    const params = new HttpParams()
      .set('claves',p.ct)

    const head = new HttpHeaders({
        'Content-Type': 'application/json'
      })

      const data = { "claves": p.ct};
     // console.log(JSON.parse(data));
    return this.http.post<Respuesta<any>>(this.buildUrl('search'),data,{headers:head})
      .pipe(
        map(this.procesarRespuesta()),
       // catchError(this.handleError<ResultadoOperacionDocumento>())
      );
      // console.log("aasd");
  }



  private procesarRespuesta() {
    return (authRes: Respuesta<any>): ResponseData<Respuesta<any>> => ResponseData.of(authRes);
  }

  public obtenerDatos(valor: string) {
    console.log('Llamando al servicio con el valor:', valor);

  }

}
