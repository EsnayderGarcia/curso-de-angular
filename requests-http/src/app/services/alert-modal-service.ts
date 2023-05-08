import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {
  private bsModalRef!: BsModalRef;
  constructor(private modalService: BsModalService) { }

  abrirModal(message: string, type?: string) {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.message = message;
    this.bsModalRef.content.type = type;
  }
}
