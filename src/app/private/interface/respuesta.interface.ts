export interface Respuesta <T>{
    mensaje:string;
    exito:number;
    data:T

  }

  export interface VacanciaResponse {
    jwt: string;
    datosUsuario: any;
  }

  export interface LugaresResponse {
    jwt: string;
    datosUsuario: any;
  }
  export interface NecesidadesResponse {
    jwt: string;
    datosUsuario: any;
  }
