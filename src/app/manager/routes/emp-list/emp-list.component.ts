import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { environment } from 'src/environments/environment';
import { EmployeService } from '../../services/employee/employe.service';

@Component({
    selector: 'app-emp-list',
    templateUrl: './emp-list.component.html',
    styleUrls: ['./emp-list.component.scss'],
})
export class EmpListComponent implements OnInit{
    searchText: string = '';

    listeEmploye: any[] = [];
    listeEmployeBackup: any[] = [];

    apiUrl: string = environment.apiUrl;

    isLoading: boolean = false;

    searchInsideEmpList() {
        if (this.searchText) {
            this.listeEmploye = this.listeEmploye.filter(person =>
                person.nomEmploye.toLowerCase().includes(this.searchText.toLowerCase()) ||
                person.prenomEmploye.toLowerCase().includes(this.searchText.toLowerCase())
            );
        } else {
            this.listeEmploye = this.listeEmployeBackup;
        }
    }

    constructor(
        private service: EmployeService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.service.getListeEmploye()
            .subscribe({
                next: (data: any) => {
                    this.listeEmploye = data.data;
                    this.listeEmployeBackup = this.listeEmploye;
                    this.isLoading = false;
                }
            })
    };

    getEmployeListeService = (employe: any): string => {
        // Vérifier si l'employé et ses services existent
        if (employe && employe.mesServices && employe.mesServices.length > 0) {
            // Utiliser map() pour extraire les noms des services
            const services = employe.mesServices.map((service: any) => service.nomService);
            // Concaténer les noms des services avec ", " comme séparateur
            return services.join(", ");
        } else {
            return ""; // Retourner une chaîne vide si aucun service n'est trouvé
        }
    }

    deleteEmploye = (id: string) =>{
        this.service.deleteEmploye(id).subscribe({
            next: (response: any) => {
                if (response.status == 200) {
                    this.toastr.success(
                        `Une donnée a été supprimée!`,
                        'Success!',
                        TOAST_OPTIONS_BOTTOM_RIGHT
                    );
                    (<any>window).closeModal();

                    this.isLoading = true;
                    this.service.getListeEmploye()
                        .subscribe({
                            next: (data: any) => {
                                this.listeEmploye = data.data;
                                this.listeEmployeBackup = this.listeEmploye;
                                this.isLoading = false;
                            }
                        })
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
