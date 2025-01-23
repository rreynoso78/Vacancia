export const environment = {
  production: true,
  preview: false,
  idAplicacion: 'portalRh.app.sev',
  endpoints: {
    global: 'https://nomina-msvc.sev.gob.mx/api',
    auth: 'https://nomina-msvc.sev.gob.mx/api/',
    //apiSirh: 'https://localhost:44307/api',
    //authRefresh: 'https://localhost:44307/api/refresh-token',

    apiCentroTrabajo:'https://ct-consulta.sev.gob.mx/api',
    apiPlantilla: 'http://172.30.21.161:5005/api',
    //apiSirh: 'https://sirh-msvc.sev.gob.mx/api',
    //authRefresh: 'https://sirh-msvc.sev.gob.mx/api/refresh-token',
    apiSirh: 'http://172.30.21.161:5001/api',
    authRefresh: 'http://172.30.21.161:5001/api/refresh-token',


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
