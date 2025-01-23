export interface DatosPlantilla{
    clavecct:string,
    nombreCT :string,
    numper :string,
    rfc :string,
    nombre :string,
    turno :string,
    descturno :string,
    cveFuncion :string,
    funcion : string,
    grado :string,
    grupo :string,
    materia :string,
    horasFteGpo :string,
    zonaEscola :string,
    sostenimiento :string,
    zona_Econo :string,
    periodoInicial :string,
    periodoFinal :string,
}
export interface DatosPlantillaNomina{
    apellidomaterno: string,
    apellidopaterno: string,
    curp:            string,
    nom_emp:         string,
    nombres:         string,
    plaza:           string,
    rfc:             string,
}


export interface DatosPlantillaSipse{
    apMaterno:          string
    apPaterno:          string
    clavecct:           string
    curp:               string
    fechaActualizacion: string
    fechaAlta:          string
    funcion:            string
    nombreCompleto:     string
    nombreFuncion:      string
    nombreTurno:        string
    nombres:            string
    observaciones:      string
    rfc:                string
    turno:              string
}

export interface DatosCT{
    clave_zona: string
    clavecct: string
    claveinsti: string
    codpost: string
    correoele: string
    delegacion: string
    desturno: string
    director: string
    domicilio: string
    entrecalle: string
    fechaalta: string
    fechaclaus: string
    idsostenimiento: string
    idstatus: string
    localidad: string
    municipio: string
    nombrecol: string
    nombrect: string
    nombreloc: string
    nombrempio: string
    sector: string
    servicio: string
    sostenimiento: string
    status: string
    telefono: string
    telefono1: string
    turno: string
    ycalle  : string
    zebachillerato: string
    zonaescola: string
}



export interface CT {
  clave:              string;
  nombre:             string;
  localidad:          Localidad;
  municipio:          Localidad;
  turno:              Turno;
  nivelEducativo:     NivelEducativo;
  sostenimiento:      string;
  zona:               Zona;
  delegacion:         string;
  domicilio:          Domicilio;
  georeferencia:      Georeferencia;
  director:           Director;
  estatus:            Estatus;
  region:             string;
  correoElectronico:  string;
  categoriaPoblacion: string;
  zonaEconomica:      string;
}

export interface Director {
  nombre:          string;
  primerApellido:  string;
  segundoApellido: string;
}

export interface Domicilio {
  detalle:     string;
  numExterior: string;
  numInterior: string;
  entreCalle:  string;
  yCalle:      string;
  cp:          string;
  telefono:    string;
  extension:   string;
}

export interface Estatus {
  id:      string;
  detalle: string;
}

export interface Georeferencia {
  longitud: string;
  latitud:  string;
  altitud:  string;
}

export interface Localidad {
  id:     string;
  nombre: string;
}

export interface NivelEducativo {
  nivel:    string;
  subnivel: string;
}

export interface Turno {
  id:           string;
  descripcion1: string;
  descripcion2: string;
  descripcion3: string;
}

export interface Zona {
  id:    string;
  clave: string;
}
