import { Default } from "ngx-gs-utils";

export class paramNecesidadesCT{

  @Default() public claveCt :string
  @Default() public idNivelEducativo :number
  @Default() public idFuncion :number
  @Default() public idMateria :number
  @Default() public idPrioridad  :number
  @Default() public idSituacion :number
  @Default() public region  :string
  @Default() public latitud  :string
  @Default() public longitud  :string
  @Default() public observaciones  :string
  @Default() public idMunicipio  :number
  @Default() public idLocalidad  :number
  @Default() public statusAtencion  :number
  @Default() public horas  :number

}
