import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service/service.service';
import { Service } from 'src/app/shared/models/service';
import { ToastrService } from 'ngx-toastr';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { environment } from 'src/environments/environment';
import { Employe } from 'src/app/shared/models/employe';
import { EmployeService } from 'src/app/shared/services/employe/employe.service';

@Component({
    templateUrl: './preference.component.html',
    styleUrl: './preference.component.scss'
})
export class PreferenceComponent implements OnInit {
    isLoading: boolean = false;

    serviceList!: Service[];
    employeList!: Employe[];

    preferedService: Service|null = null;
    preferedEmploye: Employe|null = null;
    apiUrl: string;

    constructor(
        private serviceService: ServiceService,
        private employeService: EmployeService,
        private toastr: ToastrService
    ){
        this.apiUrl = environment.apiUrl;
    }
    ngOnInit(): void {
        this.getListeService();
        this.getListeEmploye();
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

    getListeEmploye(): void {
        this.employeService.getListeEmploye()
            .subscribe({
                next: (data: any) => {
                    this.employeList = data.data;
                    this.isLoading = false;
                }
            })
    }

    selectService(service: Service){
        this.preferedService = service;
    }

    selectEmploye(employe: Employe){
        this.preferedEmploye = employe;
    }
}
