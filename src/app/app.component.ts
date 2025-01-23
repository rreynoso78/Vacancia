import { Component, HostListener, ViewChild } from '@angular/core';
import { AbstractTokenStore, HttpServiceConfigurer, TokenInterceptorConfigurer } from 'ngx-gs-utils';
import { environment } from 'src/environments/environment';

import { loginService } from './public/login/services/login.service';
import { HttpClient } from '@angular/common/http';
import { from, map, switchMap } from 'rxjs';
import { VacanciaService } from './public/vacantes/services/vacancia.service';
import { UtilidadesService } from './shared/services/utilidades.service';
import { LugaresDispService } from './public/lugares-disp/services/lugares-disp.service';
import { PlantillaService } from './shared/services/plantilla.service';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { PlazaService } from './private/modales/modal-plaza/services/plaza.service';
import { DocumentosService } from './private/modales/modal-documentos/services/documentos.service';

import { CentroTrabajoService} from './shared/services/centro-trabajo.service';
import { NecesidadesCtService} from './shared/services/necesidades-ct.service';
import { DatosCtService } from './shared/services/datos-ct.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public preview = environment.preview;
  @ViewChild(RouterOutlet) outlet: RouterOutlet;





  isLoading: boolean = false;

  isVisible = false;

  constructor(  private router: Router,
    private http: HttpClient,
    private httpSvcCfger: HttpServiceConfigurer,
    private loginSvc: loginService,
    private vacSvc: VacanciaService,
    private utlSvc:UtilidadesService,
    private ludDisp:LugaresDispService,
    private plantService:PlantillaService,
    private plazaServ:PlazaService,
    private docsServ:DocumentosService,

    private ctServ: CentroTrabajoService,
    private necesidadesServ:NecesidadesCtService,
    private datosCtServ:DatosCtService,
    // private tokenSvc: AbstractTokenStore,
    // private tokenInterceptorCfger:TokenInterceptorConfigurer,

  ) {
    this.init();
  }


  public init(): void {
    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === "plantilla")
        this.outlet.deactivate();
    });
    this.httpSvcCfger
      .setGlobalBaseUrl(environment.endpoints.global)
      .setProductionEnvironment(environment.production)
      .configHttpService({instance: this.loginSvc, alternativeBaseUrl: environment.endpoints.apiSirh})
      .configHttpService({instance: this.vacSvc, alternativeBaseUrl: environment.endpoints.apiSirh})
      .configHttpService({instance: this.utlSvc, alternativeBaseUrl: environment.endpoints.apiSirh})
      .configHttpService({instance: this.ludDisp, alternativeBaseUrl: environment.endpoints.apiSirh})


      .configHttpService({instance: this.plazaServ, alternativeBaseUrl: environment.endpoints.apiSirh})

      .configHttpService({instance: this.docsServ, alternativeBaseUrl: environment.endpoints.apiSirh})


      .configHttpService({instance: this.ctServ, alternativeBaseUrl: environment.endpoints.apiCentroTrabajo})

      .configHttpService({instance: this.datosCtServ, alternativeBaseUrl: environment.endpoints.apiSirh})

      .configHttpService({instance: this.plantService, alternativeBaseUrl: environment.endpoints.apiPlantilla})

      .configHttpService({instance: this.necesidadesServ, alternativeBaseUrl: environment.endpoints.apiSirh})

  //    this.tokenSvc
  //      .setRefreshTokensHandler(this.getRefreshTokenHandlerFn());
  //    this.tokenSvc
  //      .setRestoreTokensHandler(this.getRestoreTokensHandlerFn());

  //    this.tokenInterceptorCfger
  //      .ignoreTheseUrls([])
  //      .setVerboseMode(!environment.production);
  //  }

  //  private getRefreshTokenHandlerFn() {
  //    return () => this.http
  //      .get<any>(environment.endpoints.authRefresh)
  //      .pipe(
  //        map((resp) => ({
  //            data: resp.TokenData,
  //            refresh: resp.TokenRefresh
  //        }))
  //      );
    }

    private getRefreshTokenHandlerFn() {
      return () => this.http
        .get<any>(environment.endpoints.authRefresh)
        .pipe(
          map((resp) => ({
              data: resp.TokenData,
              refresh: resp.TokenRefresh
          }))
        );
    }
  // private getRestoreTokensHandlerFn() {
  //   return () => from(this.sesionSvc.getUserDetails())
  //     .pipe(
  //       switchMap((details: Usuario) => this.modalCtrl.create({
  //           component: ModalLoginComponent,
  //           componentProps: {
  //             usuario: details.usuario,
  //             modo: 'RENOVAR-SESION',
  //             tipoCuenta: 'PRH'
  //           },
  //           backdropDismiss: false
  //       })),
  //       switchMap((modal: HTMLIonModalElement) => {
  //         modal.present();
  //         return modal.onDidDismiss();
  //       }),
  //       switchMap(data => {
  //         if (Object.nonNull(data.data) && Object.nonNull(data.data.auth)) {
  //           return of({
  //             data: data.data.auth.TokenData as string,
  //             refresh: data.data.auth.TokenRefresh as string
  //           });
  //         }
  //         this.sesionSvc.clearSession();
  //         this.loginSvc.logout();
  //         this.reiniciarSesion();
  //         return of({
  //           data: '',
  //           refresh: ''
  //         });
  //       })
  //     );
  // }

  // private async reiniciarSesion() {
  //   await this.navCtrl.navigateRoot('home', {
  //     animated: true,
  //     animationDirection: 'back'
  //   });
  //   const toast = await this.toastCtrl.create({
  //     message: 'Por tu seguridad, hemos cerrado la sesión. Por favor ingresa nuevamente tu usuario y contraseña',
  //     duration: 5000,
  //     position: 'bottom'
  //   });
  //   await toast.present();
  // }

}

