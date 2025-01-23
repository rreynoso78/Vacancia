import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalClosedSource = new Subject<void>();
  modalClosed$ = this.modalClosedSource.asObservable();

  closeModal() {
    this.modalClosedSource.next();
  }
}
