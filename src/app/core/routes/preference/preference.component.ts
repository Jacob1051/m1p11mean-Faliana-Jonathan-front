import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service/service.service';
import { Service } from 'src/app/shared/models/service';
import { ToastrService } from 'ngx-toastr';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { environment } from 'src/environments/environment';

@Component({
    templateUrl: './preference.component.html',
    styleUrl: './preference.component.scss'
})
export class PreferenceComponent implements OnInit {
    isLoading: boolean = false;

    serviceList!: Service[];

    preferedService: Service|null = null;
    apiUrl: string;

    constructor(
        private serviceService: ServiceService,
        private toastr: ToastrService
    ){
        this.apiUrl = environment.apiUrl;
    }
    ngOnInit(): void {
        this.getListeService();
    }

    getListeService() {
        this.isLoading = true;
        this.serviceService.getListeService().subscribe({
            next: (response: any) => {
                if (response.status == 200) {
                    this.serviceList = response.data;
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

    selectService(service: Service){
        this.preferedService = service;
    }
}
