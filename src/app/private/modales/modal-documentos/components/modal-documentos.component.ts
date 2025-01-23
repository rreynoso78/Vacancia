import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-documentos',
  templateUrl: './modal-documentos.component.html',
  styleUrls: ['./modal-documentos.component.scss'],
})
export class ModalDocumentosComponent implements OnInit {
  @Input() titulo: string;
  @Input() base64Doc: string;

  public url: SafeResourceUrl;
  constructor(
    public modalCtrl: ModalController,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
   // console.log('Base64: ', this.base64Doc);
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + this.base64Doc);
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }


}
