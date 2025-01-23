import { Default } from "ngx-gs-utils";

export class paramUpdateLugaresDisponibles{

    @Default() public idClasifica:number
    @Default() public PlazaF:string
    @Default() public FechaDeCarga:string
    @Default() public ReqRec:number
    @Default() public CargaUSICAMM:number
    @Default() public CCT_Asigna:string
    @Default() public RevisadoRH:number
    @Default() public Observaciones:string
}