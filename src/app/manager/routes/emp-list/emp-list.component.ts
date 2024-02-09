import { Component, OnInit } from '@angular/core';
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
        private service: EmployeService
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

    isLoading: boolean = false;
}
