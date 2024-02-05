import { EmployeeService } from '../../services/employee/employee.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-emp-list',
    templateUrl: './emp-list.component.html',
    styleUrls: ['./emp-list.component.scss'],
})
export class EmpListComponent implements OnInit{
    searchText: string = '';

    listeEmployee: any[] = [];
    listeEmployeeBackup: any[] = [];

    searchInsideEmpList() {
        if (this.searchText) {
            this.listeEmployee = this.listeEmployee.filter(person =>
                person.firstName.toLowerCase().includes(this.searchText.toLowerCase()) &&
                person.lastName.toLowerCase().includes(this.searchText.toLowerCase())
            );
        } else {
            this.listeEmployee = this.listeEmployeeBackup;
        }
    }

    constructor(
        private service: EmployeeService
    ) {}

    ngOnInit(): void {
        this.service.getListeEmployee()
            .subscribe({
                next: (data: any) => {
                    this.listeEmployee = data.data;
                    this.listeEmployeeBackup = this.listeEmployee;
                }
            })
    }

    isLoading: boolean = false;
}
