import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Employe } from 'src/app/shared/models/employe';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-emp-list-template',
    templateUrl: './emp-list.component.html',
    styleUrl: './emp-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmpListComponent {
    searchText: string = '';
    listeEmploye: Employe[] = [];
    listeEmployeBackup: Employe[] = [];
    apiUrl: string;

    selectedEmploye!: Employe;

    @Output() itemChange = new EventEmitter<Employe>(undefined);

    @Input('listeEmployes')
    set listeServices(employe: Employe[]) {
        this.listeEmploye = employe;
        this.listeEmployeBackup = employe;
    }

    constructor() {
        this.apiUrl = environment.apiUrl;
    }

    isLoading: boolean = false;


    searchInsideEmpList() {
        if (this.searchText) {
            this.listeEmploye = this.listeEmploye.filter(person =>
                person.nomEmploye.toLowerCase().includes(this.searchText.toLowerCase()) &&
                person.prenomEmploye.toLowerCase().includes(this.searchText.toLowerCase())
            );
        } else {
            this.listeEmploye = this.listeEmployeBackup;
        }
    }

    onClick(employe: Employe): void {
        this.selectedEmploye = employe;
        this.itemChange.emit(employe);

        (<any>window).closeModal();
    }

}
