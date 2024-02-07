import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-service-list-modal',
  templateUrl: './service-list-modal.component.html',
  styleUrl: './service-list-modal.component.scss'
})
export class ServiceListModalComponent {
    @Input() serviceList: any;
    @ViewChild('modal') el:ElementRef | undefined;

    closeModal(){
        this.el!.nativeElement.classList.remove('show');
        document.body.classList.remove('modal-open');
    }
}
