import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpServiceSupport, ProblemDetailsBuilder, ResponseData } from 'ngx-gs-utils';
import { catchError, map, Observable, timeout } from 'rxjs';
import { Respuesta } from 'src/app/private/interface/respuesta.interface';

export interface LoginResponse {
  jwt: string;
  datosUsuario: any;
}




@Injectable({
  providedIn: 'root'
})
export class loginService extends HttpServiceSupport{

  constructor(
    private http: HttpClient,
    pdb: ProblemDetailsBuilder
  ) {
    super(pdb);
  }
 
  public login({usuario, password}): Observable<ResponseData<Respuesta<LoginResponse>>> {
    const payload: any = {
      Usuario: usuario,
      Password: password,
    };
    return this.http.post<Respuesta<LoginResponse>>(this.buildUrl("Login/Login"), JSON.stringify(payload), {
      headers: this.buildCommonHttpHeaders()
    }).pipe(
      timeout(loginService.DEFAULT_TIMEOUT),
      map(this.procesarRespuestaLogin()),
      //catchError(this.handleErrorNoFallback())
    );
  }
  private procesarRespuestaLogin() {
    return (authRes: Respuesta<LoginResponse>): ResponseData<Respuesta<LoginResponse>> => ResponseData.of(authRes);
  }

   
}
