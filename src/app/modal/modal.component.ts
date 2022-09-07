import {Component, OnInit} from '@angular/core'
import {ModalService} from '../shared/modal.service'

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  constructor(public modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.isOpen
  }

  closeModal() {
    this.modalService.closeModal()
  }

  openModal() {
    this.modalService.openModal()
  }

  toggleModal() {
    this.modalService.toggleModal()
  }
}
