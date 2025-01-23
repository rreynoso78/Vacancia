import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(
    public toastCtrl: ToastController,
  ) { }

  public async mostrarElementoToast(mensaje: string, tipo: 'correcto'|'error'|'advertencia' = 'correcto', duracion: number = 5000, posicion: 'top'|'bottom'|'middle' = 'top') {
    await this.hideAllToasts();
    const toast = await this.toastCtrl.create({
      message: mensaje,
      position: posicion,
      cssClass: tipo,
      duration: duracion,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    await toast.present();
  }

  private async hideAllToasts() {
    let topToast: HTMLIonToastElement;
    do {
      topToast = await this.toastCtrl.getTop();
      if (Object.nonNull(topToast)) {
        await topToast.dismiss().catch(() => {});
      }
    } while(typeof topToast !== 'undefined' && topToast !== null);
  }

}
