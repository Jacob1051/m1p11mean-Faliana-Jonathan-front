import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employe } from 'src/app/_models/employe';
import { Service } from 'src/app/_models/service';
import { Tache } from 'src/app/_models/tache';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { ServiceService } from '../../services/service/service.service';

@Component({
    selector: 'app-takerdv',
    standalone: true,
    imports: [],
    templateUrl: './takerdv.component.html',
    styleUrl: './takerdv.component.scss',
})
export class TakerdvComponent {
    constructor(
        private serviceService: ServiceService,
        private toastr: ToastrService
    ) {
      this.getListeService();
    }

    isLoading = false;

    listeService: Service[] = [];
    listeServiceBackup: Service[] = [];
    listeEmploye: Employe[] = [];
    listeEmployeDispo: Employe[] = [];
    listeTache: Tache[] = [];

    getListeService = () => {
        this.isLoading = true;
        this.serviceService.getListeService().subscribe({
            next: (response: any) => {
                if (response.status == 200) {
                    this.listeService = response.data;
                    this.listeServiceBackup.length == 0
                        ? (this.listeServiceBackup = this.listeService)
                        : null;
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
    };
}
