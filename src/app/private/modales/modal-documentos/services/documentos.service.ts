import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServiceSupport, ProblemDetailsBuilder, RawData, ResponseData } from 'ngx-gs-utils';
import { Observable, map } from 'rxjs';
import { Respuesta } from 'src/app/private/interface/respuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService extends HttpServiceSupport{

  constructor(
    private http: HttpClient,
    pdb: ProblemDetailsBuilder
  ) {
    super(pdb);
  }

  // public async getDocumentosDocentes(token:string,proceso:number){
  //   let params = new HttpParams().set("token",token).set("proceso",proceso.toString());
  //   let header = new HttpHeaders({'Content-Type': 'application/json'});
  //   return await this.http.get(this.url+'documentosAspirantes/',{params}).toPromise();
  // }

  


  public   subeDocs(formData:FormData){
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +sessionStorage.getItem('jwttoken')
    })
    return   this.http.post<Respuesta<any>>(this.buildUrl('Archivos/subeArchivo'), formData , {reportProgress: true, observe: 'events'})
    .toPromise();
   // return await this.http.post(this.url+'Upload/', formData, {reportProgress: true, observe: 'events'}).toPromise();
 }


 public obtenerDoc(ruta:string): Observable<ResponseData<any>> {
  const params = new HttpParams()
    .set('ruta', ruta)
    
  return this.http.get<RawData>(this.buildUrl('Archivos/obtenArchivo'), {params})
    .pipe(
      map(this.procesarRespuesta()),
      //catchError(this.handleError<procesarRespuesta>())
    );
}

  private procesarRespuesta() {
    return (authRes: Respuesta<any>): ResponseData<Respuesta<any>> => ResponseData.of(authRes);
  }

  convertToBase64(url: string) {
    var bse64:string;
    this.http.get(url,{
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/pdf',
      } ,
      responseType: "blob" }).subscribe(blob => {
      const reader = new FileReader();
      const binaryString = reader.readAsDataURL(blob);
      reader.onload = (event: any) => {
        //Here you can do whatever you want with the base64 String
        console.log("File in Base64: ", event.target.result);
        bse64=event.target.result
      };

       reader.onerror = (event: any) => {
        console.log("File could not be read: " + event.target.error.code);
      };

    });
    
}
}
