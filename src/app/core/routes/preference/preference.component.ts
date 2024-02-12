import { AuthService } from './../../services/client/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service/service.service';
import { Service } from 'src/app/shared/models/service';
import { ToastrService } from 'ngx-toastr';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { environment } from 'src/environments/environment';
import { Employe } from 'src/app/shared/models/employe';
import { EmployeService } from 'src/app/shared/services/employe/employe.service';
import { UserInformationService } from '../../services/user/userInformation/user-information.service';
import { ClientService } from 'src/app/shared/services/client/client.service';

@Component({
    templateUrl: './preference.component.html',
    styleUrl: './preference.component.scss'
})
export class PreferenceComponent implements OnInit {
    isLoading: boolean = false;

    serviceList!: Service[];
    employeList!: Employe[];

    preferedService: Service | null = null;
    preferedEmploye: Employe | null = null;
    apiUrl: string;

    userInformation: any;
    user: any;

    constructor(
        private serviceService: ServiceService,
        private employeService: EmployeService,
        private authService: AuthService,
        private toastr: ToastrService,
        private serviceInfo: UserInformationService,
        private clientService: ClientService
    ) {
        this.apiUrl = environment.apiUrl;
    }

    ngOnInit(): void {
        this.authService.user.subscribe((nouvelUtilisateur) => {
            this.user = nouvelUtilisateur;
            this.getUserInformation();
        });

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

    getUserInformation() {
        this.isLoading = true;
        this.serviceInfo
            .getUserInformation(this.user.user_id, this.user.role)
            ?.subscribe({
                next: (response: any) => {
                    if (response.status == 200) {
                        this.userInformation = response.data;

                        if(this.userInformation.preference){
                            this.preferedService = this.userInformation.preference.service;
                            this.preferedEmploye = this.userInformation.preference.employe;
                        }
                    }
                    else {
                        console.error(response.message);
                        this.toastr.error(`Une erreur s'est produite`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                    }
                    this.isLoading = false;
                },
                error: (error) => {
                    console.error(error);
                    this.toastr.error(`Une erreur s'est produite`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                    this.isLoading = false;
                },
            });
    }

    selectService(service: Service) {
        this.preferedService = service;
    }

    selectEmploye(employe: Employe) {
        this.preferedEmploye = employe;
    }

    savePreference(){
        this.isLoading = true;

        this.clientService.savePreference(this.user.user_id, {
            preference: {
                service: this.preferedService,
                employe: this.preferedEmploye
            }
        })
        .subscribe({
            next: (response: any) => {
                if (response.status == 200) {
                    this.toastr.success(`Enregistré avec succès !`, 'Succès', TOAST_OPTIONS_BOTTOM_RIGHT);
                }
                else {
                    console.error(response.message);
                    this.toastr.error(`Une erreur s'est produite`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                }
                this.isLoading = false;
            },
            error: (error) => {
                console.error(error);
                this.toastr.error(`Une erreur s'est produite`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                this.isLoading = false;
            },
        });
    }
}
