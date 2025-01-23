import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-scroll-to-top-component',
  templateUrl: './scroll-to-top-component.component.html',
  styleUrls: ['./scroll-to-top-component.component.scss'],
  // standalone:
})
export class ScrollToTopComponent{
@ViewChild('content', { static: false }) content: IonContent;
isVisible = false;

 // Detecta el evento de desplazamiento
 onContentScroll(event: any) {
  const yOffset = event.detail.scrollTop;
  this.isVisible = yOffset > 100; // Muestra el botón si el desplazamiento es mayor a 100px
}

// Desplaza hacia la parte superior
scrollToTop() {
  this.content.scrollToTop(500); // Desplazamiento suave de 500ms
}
}
