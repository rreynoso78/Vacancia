import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, ActionSheetOptions, NavController } from '@ionic/angular';

import { Default, ResponseData } from 'ngx-gs-utils';
import { MensajesService } from 'src/app/shared/services/mensajes.service';
import { loginService } from '../services/login.service';

export interface GsLoginComponentResult {
  usuario: string;
  //res: ResponseData<AuthResponse>;
  res: ResponseData<any>;
  password?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('inputUsername') ionInputUsername: HTMLIonInputElement;
  @ViewChild('inputPassword') ionInputPassword: HTMLIonInputElement;

  @Input() autenticando: boolean;
  @Default() public estadoAutenticando: boolean;

  @Input() public tipoCuenta: 'MSEV' | 'NEMX' | 'PRH' | 'EXT';
  @Input() public usuario: string;
  @Input() public etiquetaBoton: string;
  @Input() public noCache: boolean; // Solo para cuentas de tipo 'MSEV'.

  @Output() loginEvent = new EventEmitter<GsLoginComponentResult>();

  public tipoInputPassword: 'password' | 'text';

  public loginForm: FormGroup;
  public actionSheetButtons:any[]=[];
  isActionSheetOpen = false;
  cargando=false;
  constructor(
    public loginSvc:loginService,
    public navCtrl: NavController,
    public router:Router,
    public fb: FormBuilder,
    public msg:MensajesService,
    public actionShet:ActionSheetController
    ) {
   // this.iniciaSesion();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [
        this.usuario || '',
        {
          validators: Validators.compose([Validators.required]),
          updateOn: 'blur'
        }
      ],
      password: [
        '',
        {
          validators: Validators.compose([Validators.required])
        }
      ]
    });
  }

  iniciaSesion(){
    this.cargando=true;
    let resp:any;
    resp = this.loginSvc.login({
      usuario:this.control('username').value,
      password: this.control('password').value
    }).subscribe(response =>{
      if (response.isPresentAndNoError()) {
          const res=response.get();
          if (res.exito==1){
            this.cargando=false;
            sessionStorage.setItem("jwttoken", res.data.jwt);
            sessionStorage.setItem("datosUsuario", res.data.datosUsuario.toString());
            sessionStorage.setItem("NombreUsuario", res.data.datosUsuario.nombre.toString());
            sessionStorage.setItem("IdUsuario", res.data.datosUsuario.idUsuario.toString());
            sessionStorage.setItem("tokenSirh", res.data.datosUsuario.token.toString());
            sessionStorage.setItem("IdNivelEUsu", res.data.datosUsuario.idNivelEducativo.toString());

            //console.log(res.data.datosUsuario)
            //this.router.navigate(['principal'])
            if (res.data.datosUsuario.entidadesUsuarios.length>0){
              this.muestraEntidadUsuarios(res.data.datosUsuario.entidadesUsuarios)
            }else{
              sessionStorage.setItem("login", this.control('username').value);
              this.navCtrl.navigateRoot('principal', {
                animated: true,
                animationDirection: 'forward'
              });
            }
          }else{
            this.cargando=false;
            this.msg.mostrarElementoToast("Error en las credenciales","error",5000,"top");
          }
      }
      else{
          this.cargando=false;
          this.msg.mostrarElementoToast("Error en las credenciales","error",5000,"top");
      }
    }
    , (err) => {
      this.cargando=false;
       this.msg.mostrarElementoToast( err.error.mensaje,"error",5000,"top");
    });
  }

  public control(nombre: string): AbstractControl {
    return this.loginForm.get(nombre);
  }

  public muestraEntidadUsuarios(ents:any){
      this.actionSheetButtons=[];
      ents.forEach(e => {
       this.actionSheetButtons.push({ text: e.descEntidad ,role: 'destructive',  handler: () => {this.EligeRol(e.loginEntidad  )} } )
      });

     let actionSheet = this.actionShet.create({
      header:"Roles Disponibles",

      // buttons: [{
      //     text: 'Hide',
      //     handler: () => {
      //         let navTransition = actionSheet.then(e=> e.dismiss());
      //         return false;
      //     }
      // }]
      buttons: this.actionSheetButtons
      });

      actionSheet.then(d=> d.present());
      sessionStorage.setItem("entidadesUsuario", ents);
  }



  EligeRol(ev) {
    sessionStorage.setItem("login", ev);
    this.navCtrl.navigateRoot('principal', {
      animated: true,
      animationDirection: 'forward'
    });
  }
}
