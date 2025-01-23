import { Default } from "ngx-gs-utils";

export class paramLugaresDisponibles{
  
 
    @Default() public id: number;sistema :string 
    @Default() public idClasifica :number
    @Default() public idNivelEducativo :number
    @Default() public Qna_Ini :number
    @Default() public Qna_Fin  :number
    @Default() public IdFuncion  :number
    @Default() public EsCatUsicamm  :number
    @Default() public Criterio  :number
    @Default() public IdEstatusVacancia  :number
    @Default() public textoBusqueda  :string
    @Default() public IdUsuario  :number
}

export class paramLugaresDisponiblesSolicita{
  
    @Default() public idClasifica :number
    @Default() public PlazaF :string
    @Default() public FechaDeCarga :string
    @Default() public ReqRec  :number
    @Default() public CCT_Asigna :string
    @Default() public CargaUSICAMM  :number
    @Default() public EstatusVacancia  :number
    @Default() public Observaciones  :string
    @Default() public Justificacion  :string
    @Default() public IdUsuario  :number
    @Default() public IdPlaza  :number

}

