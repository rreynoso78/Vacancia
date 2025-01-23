import { Component, OnInit } from '@angular/core';
import { appInfo, ChangesInfo } from 'src/environments/app-info';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

  public app = appInfo;
  public infoUltimoCambio: ChangesInfo;
  constructor() { }

  ngOnInit() {
    this.infoUltimoCambio = this.app.changesInfo.first();
  }
  procesarResultadoLogin(event:any){}
}
