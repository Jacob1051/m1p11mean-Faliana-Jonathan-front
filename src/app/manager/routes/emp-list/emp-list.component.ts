import { Component } from '@angular/core';

@Component({
    selector: 'app-emp-list',
    templateUrl: './emp-list.component.html',
    styleUrls: ['./emp-list.component.scss'],
})
export class EmpListComponent {
    searchText: string = '';
    // services;
    listeService: any[] = [];
    listeServiceBackup: any[] = [];

    constructor(
    ) {
    }

    isLoading: boolean = false;
}
