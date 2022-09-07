import {Injectable} from '@angular/core'
import {ModalView} from '../types/modal'

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isOpen = false
  modalView = ModalView.UPDATE_USER_VIEW

  constructor() {}

  closeModal() {
    this.isOpen = false
  }

  openModal() {
    this.isOpen = true
  }

  toggleModal() {
    this.isOpen ? this.closeModal() : this.openModal()
  }

  setModalView(view: ModalView) {
    this.modalView = view
  }
}
