import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import 'moment-timezone';
import { ToastrService } from 'ngx-toastr';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { OffreService } from 'src/app/manager/services/offre/offre.service';
import { LocalTimezoneService } from '../../services/localTimezone/local-timezone.service';

@Component({
    selector: 'app-modal-offre',
    templateUrl: './modal-offre.component.html',
    styleUrl: './modal-offre.component.scss',
})
export class ModalOffreComponent {
    constructor(
        private OffreService: OffreService,
        private toastr: ToastrService,
        private localTimezoneService: LocalTimezoneService,
        private router: Router
    ) {}
    ngOnInit() {
        this.getOffreEnCours();
    }
    isLoading = false;
    offreEnCours: any;

    getOffreEnCours() {
        this.isLoading = true;
        this.OffreService.getOffreEnCours().subscribe({
            next: (response: any) => {
                if (response.status == 200) {
                    // console.log(response.data);
                    this.offreEnCours = response.data;

                    response.data ? this.triggerModalOffre() : null;
                } else {
                    console.error(response.message);
                    this.toastr.error(
                        `Une erreur s'est produite!`,
                        'Erreur!',
                        TOAST_OPTIONS_BOTTOM_RIGHT
                    );
                }
                this.isLoading = false;
            },
            error: (error) => {
                console.error(error);
                this.toastr.error(
                    `Une erreur s'est produite`,
                    'Erreur!',
                    TOAST_OPTIONS_BOTTOM_RIGHT
                );
                this.isLoading = false;
            },
        });
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

    formatDate = (date: Date) => {
        moment.locale('fr');
        return moment(date).format('LL');
    };

    goToServices() {
        this.router.navigateByUrl('/listeService');
        // const closeButton = document.querySelector(
        //     '#exampleModalOffreSpeciale .btn-close'
        // ) as HTMLButtonElement;
        // closeButton.click();
    }
}
