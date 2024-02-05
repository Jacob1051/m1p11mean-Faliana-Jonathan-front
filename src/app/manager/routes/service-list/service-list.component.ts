import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { environment } from "../../../../environments/environment";
import { ServiceService } from '../../services/service/service.service';

@Component({
    selector: 'app-service-list-manager',
    templateUrl: './service-list.component.html',
    styleUrls: ['./service-list.component.scss'],
})
export class ServiceListComponent {
    searchText: string = '';
    // services;
    listeService: any[] = [];
    listeServiceBackup: any[] = [];
    apiUrl:string;

    constructor(
        private service: ServiceService,
        private toastr: ToastrService
    ) {
        this.getListeService();
        // this.services = this.allServices;
        this.apiUrl = environment.apiUrl;
    }

    isLoading: boolean = false;

    searchInsideService() {
        if (this.searchText) {
            this.listeService = this.listeService.filter((element)=>{
                return element.nomService.toLowerCase().includes(this.searchText.toLowerCase()) || element.description.toLowerCase().includes(this.searchText.toLowerCase()) || element.duree.toString().includes(this.searchText.toLowerCase()) || element.prix.toString().includes(this.searchText.toLowerCase());
            });
        } else {
            this.listeService = this.listeServiceBackup;
        }
    }

    getListeService() {
        this.isLoading = true;
        this.service.getListeService().subscribe({
            next: (response: any) => {
                if (response.status == 200) {
                    this.listeService = response.data;
                    this.listeServiceBackup.length == 0 ? this.listeServiceBackup = this.listeService : null;
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
