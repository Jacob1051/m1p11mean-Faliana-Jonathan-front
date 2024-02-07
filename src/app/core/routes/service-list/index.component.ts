import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Service } from 'src/app/_models/service';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { environment } from "../../../../environments/environment";
import { ServiceService } from '../../services/service/service.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class IndexComponent {
    searchText: string = '';
    allServices;
    // services;
    listeService: Service[] = [];
    listeServiceBackup: Service[] = [];
    apiUrl:string;

    constructor(
        private service: ServiceService,
        private toastr: ToastrService
    ) {
        this.allServices = service.getAllServices();
        this.getListeService();
        // this.services = this.allServices;
        this.apiUrl = environment.apiUrl;
    }

    isLoading: boolean = false;

    searchInsideService() {
        if (this.searchText) {
            // this.services = this.allServices.filter((service) =>
            //     service.name
            //         .toLowerCase()
            //         .includes(this.searchText.toLowerCase())
            // );

            this.listeService = this.listeService.filter((element)=>{
                // console.log(element);
                return element.nomService.toLowerCase().includes(this.searchText.toLowerCase()) || element.description.toLowerCase().includes(this.searchText.toLowerCase()) || element.duree.toString().includes(this.searchText.toLowerCase()) || element.prix.toString().includes(this.searchText.toLowerCase());
            });
        } else {
            // this.services = this.allServices;
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
