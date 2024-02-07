import { Component, OnInit } from '@angular/core';
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

    searchInsideEmpList() {
        if (this.searchText) {
            this.listeEmploye = this.listeEmploye.filter(person =>
                person.firstName.toLowerCase().includes(this.searchText.toLowerCase()) &&
                person.lastName.toLowerCase().includes(this.searchText.toLowerCase())
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
    }

    isLoading: boolean = false;
}
