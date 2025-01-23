// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  preview: false,
  idAplicacion: 'portalRh.app.sev',
  endpoints: {
    global: 'https://nomina-msvc.sev.gob.mx/api',
    auth: 'https://nomina-msvc.sev.gob.mx/api/',
   // apiSirh: 'https://localhost:44307/api',
   // authRefresh: 'https://localhost:44307/api/refresh-token',
    apiSirh: 'http://172.30.21.161:5001/api',
    //apiSirh: 'https://sirh-msvc.sev.gob.mx/api',
    apiCentroTrabajo:'https://ct-consulta.sev.gob.mx/api',
    apiPlantilla: 'http://172.30.21.161:5005/api',
    authRefresh: 'http://172.30.21.161:5001/api/refresh-token',
    //authRefresh: 'https://sirh-msvc.sev.gob.mx/api/refresh-token',
    //permisos: 'https://msvc.sev.gob.mx/idsev/perfil/api/usuario/extendido',
    //docsParticipantes: 'https://172.30.20.207/apiUsicam/api',
    //docsParticipantes: 'localhost:27565/api',
  },
  // externalSitesUrls: {
  //   venus: 'http://usicamm.sep.gob.mx/',
  //   constanciaAntiguedad: 'http://rechum.sev.gob.mx/usicamm_login.aspx?token=',
  //   constanciaAltaMarginacion: 'http://rechum.sev.gob.mx/usicamm_login.aspx?token=',
  //   cargadorDocs: 'http://convocatoriasusicamm.sev.gob.mx/procesosrh/wfLoginPV.aspx?token=',
  //   resultados: 'http://usicamm.sep.gob.mx/consulta_resultados/descripcion.html'
  // }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
