import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DocumentosService } from '../../../modal-documentos/services/documentos.service';
import { DownloadFileService } from '../../../../../shared/services/download-file.service';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-plantilla-laboral',
  templateUrl: './plantilla-laboral.component.html',
  styleUrls: ['./plantilla-laboral.component.scss'],
})
export class PlantillaLaboralComponent implements OnInit {
  public cct:string;
  public pdfSrc : SafeResourceUrl| null = null;


  private loading: HTMLIonLoadingElement | null = null; // Almacena la instancia del loader
  public labelArchivo:string='';


  constructor( private sanitizer: DomSanitizer,
    private fileService: DownloadFileService,
    private loadingCtrl: LoadingController
  ) {
    this.cct =  sessionStorage.getItem("cctConsulta")
   }

  ngOnInit(): void {

    // this.loadingService.loading$.subscribe(loading => {
    //   this.loading = loading;
    // });

    this.loadPdf()
  }

  async loadPdf() {

    await this.showLoading();

    // await  this.loadingService.show();

    let token= sessionStorage.getItem("tokenSirh");
    //let liga = 'https://sipsev2.sev.gob.mx/ImprPlantillaLaboralPorCT.aspx?Clavecct=' + this.cct+'&TokenSirh='+token    
    let liga = '/apiSipSev/ImprPlantillaLaboralPorCT.aspx?Clavecct=' + this.cct+'&TokenSirh='+token
    console.log(liga);


    this.fileService.downloadFile(liga).subscribe(async (blob) => {
      // Manipula el Blob aquí, o puedes crear un enlace para descargar
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = 'PlantillaLaboral.pdf'; // Nombre del archivo que deseas descargar
      // document.body.appendChild(a);
      // a.click();
      // a.remove();
      // window.URL.revokeObjectURL(url); // Libera la URL creada
      console.log(blob);
      const url = window.URL.createObjectURL(blob);
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);

      // await  this.loadingService.hide();


      await this.hideLoading();
      }, async (error) => {
        this.labelArchivo='No se encontro el archivo'
        console.error('Error al descargar el archivo', error);


        await this.hideLoading();
      //  await  this.loadingService.hide();

    });

  }

  ngOnDestroy(): void {
    if (this.pdfSrc) {
      window.URL.revokeObjectURL(this.pdfSrc.toString());
    }
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Obteniendo información...',
      // Puedes establecer duration si deseas que se oculte automáticamente
      // duration: 3500,
    });
    await this.loading.present();
  }

  async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss(); // Oculta el loader
      this.loading = null; // Limpia la instancia
    }
  }


  //VentanaAjax(Page, concentrado + "?Clavecct=" + dtgCentroTrabF.Rows(0).Cells(0).Text + "&TokenSirh=" + CType(TokenSirh, String), True, True, True, True, True, 1100, 700)

}
