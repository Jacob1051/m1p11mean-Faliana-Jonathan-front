import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/utils/toast/toast-options';
import { environment } from "../../../environments/environment";
import { ServiceService } from '../../services/service/service.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class IndexComponent {
    searchText: string = '';
    allServices;
    services;
    listeService: any[] = [];
    apiUrl:string;

    constructor(
        private service: ServiceService,
        private toastr: ToastrService
    ) {
        this.allServices = service.getAllServices();
        this.services = this.allServices;
        this.getListeService();
        this.apiUrl = environment.apiUrl;
    }

    isLoading: boolean = false;

    searchInsideService() {
        if (this.searchText) {
            this.services = this.allServices.filter((service) =>
                service.name
                    .toLowerCase()
                    .includes(this.searchText.toLowerCase())
            );
        } else {
            this.services = this.allServices;
        }
    }

    getListeService() {
        this.isLoading = true;
        this.service.getListeService().subscribe({
            next: (response: any) => {
                if (response.status == 200) {
                    this.listeService = response.data;
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
}
