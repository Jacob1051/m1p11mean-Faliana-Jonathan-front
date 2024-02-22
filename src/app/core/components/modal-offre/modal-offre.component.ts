import { Component } from '@angular/core';

@Component({
    selector: 'app-modal-offre',
    templateUrl: './modal-offre.component.html',
    styleUrl: './modal-offre.component.scss',
})
export class ModalOffreComponent {
    ngOnInit() {
        this.triggerModalOffre();
    }

    triggerModalOffre() {
        const modalButton = document.querySelector(
            '#modalOffreSpeciale'
        ) as HTMLButtonElement;
        if (modalButton) {
            modalButton.click();
        } else {
            console.error("Le bouton modal n'a pas été trouvé.");
        }
    }
}
