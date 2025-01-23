import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {

  public nombreusuario:string;
  public IdNivelEduUsu:string
  public idUsuario:number;
  public idAreaUsu:number;
   public appPages = [
     { title: 'Lugares Disponibles', url: 'principal/lugaresDisp', icon: 'paper-plane',visible:true },
     { title: 'Vacantes', url: 'principal/vacantes', icon: 'bag-check',visible:true },
     { title: 'Necesidades CT', url: 'principal/necesidadesCT', icon: 'bag-check',visible:true },
    ];

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    ) {
      this.nombreusuario= sessionStorage.getItem("NombreUsuario");
      this.IdNivelEduUsu = sessionStorage.getItem("IdNivelEUsu");
      this.idUsuario = Number(sessionStorage.getItem("IdUsuario"));      

      console.log("IdUsuario-> "+this.IdNivelEduUsu);
      if (this.idUsuario == 582){
          this.appPages[0].visible=true
          this.appPages[1].visible=true
          this.appPages[2].visible=true
      }
      else{
          this.appPages[0].visible=true
          this.appPages[1].visible=true
          this.appPages[2].visible=true
      }
/*
      if (this.IdNivelEduUsu!="35"){
        this.appPages[0].visible=true
        this.appPages[1].visible=false
        this.appPages[2].visible=false
    }
    else{
        this.appPages[0].visible=false
        this.appPages[1].visible=true
        this.appPages[2].visible=true
    }
    */
    }

  ngOnInit() {
    this.menuCtrl.enable(true, 'menu-principal');
    this.menuCtrl.open('menu-principal');
  }

  mostrarPagina(url:any){
    this.navCtrl.navigateRoot(url);

  }


  iraConstancia(){
    this.navCtrl.navigateForward('/principal/constancia');
  }
  iraFMP(){
    this.navCtrl.navigateForward('fmp');

  }

  public async confirmarCerrarSesion() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      subHeader: '¿Estás seguro de que deseas salir?',
      buttons: [
        {
          text: 'No, cancelar',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Sí, salir',
          handler: async () => {
            // this.tokenSvc.clearTokens();
            // this.sesionSvc.clearSession();
            // this.loginSvc.logout();
            await this.navCtrl.navigateRoot('inicio', {
              animated: true,
              animationDirection: 'back'
            });
          }
        }
      ]
    });
    await alert.present();
  }



}
