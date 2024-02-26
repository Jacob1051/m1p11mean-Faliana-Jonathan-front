import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import 'moment-timezone';
import { ToastrService } from 'ngx-toastr';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { AuthService } from '../../services/client/auth/auth.service';
import { ClientService } from '../../services/client/client.service';
import { LocalTimezoneService } from '../../services/localTimezone/local-timezone.service';
import { UserInformationService } from '../../services/user/userInformation/user-information.service';

@Component({
    selector: 'app-modal-rappel',
    templateUrl: './modal-rappel.component.html',
    styleUrl: './modal-rappel.component.scss',
})
export class ModalRappelComponent {
    constructor(
        private authService: AuthService,
        private service: UserInformationService,
        private toastr: ToastrService,
        private clientService: ClientService,
        private router: Router,
        private localTimezoneService: LocalTimezoneService
    ) {}

    ngOnInit(): void {
        this.authService.user.subscribe((nouvelUtilisateur) => {
            this.user = nouvelUtilisateur;
            this.userInformation = this.user ? this.getUserInformation() : null;
        });
    }

    user: any;
    userInformation: any;
    rappelRdv: any;

    getUserInformation() {
        // console.log("eto");
        this.service
            .getUserInformation(this.user.user_id, this.user.role)
            ?.subscribe({
                next: (response: any) => {
                    if (response.status == 200) {
                        this.userInformation = response.data;
                        // console.log(response.data);
                        this.getRappelRendezVous(response.data._id);
                    } else {
                        console.error(response.message);
                        this.toastr.error(
                            `Une erreur s'est produite`,
                            'Erreur!',
                            TOAST_OPTIONS_BOTTOM_RIGHT
                        );
                    }
                    // console.log("donc tonga eto?");
                },
                error: (error) => {
                    console.error(error);
                    this.toastr.error(
                        `Une erreur s'est produite`,
                        'Erreur!',
                        TOAST_OPTIONS_BOTTOM_RIGHT
                    );
                },
            });
    }

    getRappelRendezVous(id: string) {
        this.clientService.getRappelRendezVous(id).subscribe({
            next: (response: any) => {
                if (response.status == 200) {
                    this.rappelRdv = response.data;
                    console.log(response.data);

                    response.data ? this.triggerModalRappel() : null;
                } else {
                    console.error(response.message);
                    this.toastr.error(
                        `Une erreur s'est produite!`,
                        'Erreur!',
                        TOAST_OPTIONS_BOTTOM_RIGHT
                    );
                }
            },
            error: (error) => {
                console.error(error);
                this.toastr.error(
                    `Une erreur s'est produite`,
                    'Erreur!',
                    TOAST_OPTIONS_BOTTOM_RIGHT
                );
            },
        });
    }

    triggerModalRappel() {
        setTimeout(() => {
            const modalButton = document.querySelector(
                '#modalRappelRdv'
            ) as HTMLButtonElement;
            if (modalButton) {
                modalButton.click();
            } else {
                console.error("Le bouton modal n'a pas été trouvé.");
            }
        }, 5000);
    }

    goToHisto() {
        this.router.navigateByUrl('/histoRdv');
        const closeButton = document.querySelector(
            '#modalRappelRdv .btn-close'
        ) as HTMLButtonElement;
        closeButton.click();
    }

    formatDate = (date: Date) => {
        moment.locale('fr');
        return moment(date).format('HH[h]mm');
    };

    triggerModalOffre(event: MouseEvent) {
        const idBouton = (event.target as HTMLElement).id;
        console.log("ID de l'élément cliqué :", idBouton);

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
