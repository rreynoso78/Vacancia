import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './public/login/login.module';

import { FormsModule } from '@angular/forms';
import { InicioModule } from './public/inicio/inicio.module';
import { InMemoryTokenStoreService, NgxGsUtilsModule, TokenInterceptor ,AbstractTokenStore} from 'ngx-gs-utils';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ModalDocumentosModule } from './private/modales/modal-documentos/modal-documentos.module';
import { ModalPlantillaModule } from './private/modales/modal-plantilla/modal-plantilla.module';
import { ModalSolicitudModule } from './private/modales/modal-solicitud/modal-solicitud.module';
import { ModalValidacionModule } from './private/modales/modal-validacion/modal-validacion.module';
import { ModalSeguimientoModule } from './private/modales/modal-seguimiento/modal-seguimiento.module';
import { ModalPlazaModule } from './private/modales/modal-plaza/modal-plaza.module';
import { ModalDatosCtModule } from './private/modales/modal-datos-ct/modal-datos-ct.module';
import { ModalLugaresCompatiblesModule } from './private/modales/modal-lugares-compatibles/modal-lugares-compatibles.module';


const tokenStoreFactory = () => new InMemoryTokenStoreService()
@NgModule({
  declarations: [AppComponent ],
  imports: [
  BrowserModule,
  IonicModule.forRoot({
    backButtonText: 'Volver',
    mode: 'ios',
    menuIcon: 'ios'
  }),
   CommonModule,
   AppRoutingModule,
   FormsModule,
   LoginModule,
   InicioModule,
   ModalDocumentosModule,
   ModalPlantillaModule,
   ModalSolicitudModule,
   ModalValidacionModule,
   ModalSeguimientoModule,
   ModalPlazaModule,
   NgxGsUtilsModule,
   ModalDatosCtModule,
   ModalLugaresCompatiblesModule,


  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // {
    //   provide: AbstractTokenStore,
    //   useFactory: tokenStoreFactory
    // },

  ],

  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

})
export class AppModule {}
