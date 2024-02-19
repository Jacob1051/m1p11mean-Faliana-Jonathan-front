import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../services/stats/stats.service';
import { EmployeService } from 'src/app/shared/services/employe/employe.service';
import { Employe } from 'src/app/shared/models/employe';
import { firstValueFrom } from 'rxjs';
import { Item } from 'src/app/shared/models/multi-dropdown';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
    isLoadingTempsMoyen = false;

    listeEmploye: Employe[] = [];
    listeEmployeAsItem: Item[] = [];

    selectedEmpTempsMoyenStat!: Employe;

    tempsMoyen: any = [];

    constructor(
        private statService: StatsService,
        private employeService: EmployeService
    ){}

    async ngOnInit() {
        await this.getListeEmploye();
    }

    async getListeEmploye() {
        this.isLoadingTempsMoyen = true;
        const tempList: any = await firstValueFrom(this.employeService.getListeEmploye());
        this.listeEmploye = tempList.data;

        this.listeEmployeAsItem = this.listeEmploye.map(
            (employe: Employe) => (
                { id: employe._id, name: employe.nomEmploye + ' ' + employe.prenomEmploye, data: employe } as Item
            )
        );

        if(this.listeEmploye.length > 0){
            this.selectedEmpTempsMoyenStat = this.listeEmploye[0];
            this.getTempsMoyenEmploye();
        }

        this.isLoadingTempsMoyen = false;
    }

    getTempsMoyenEmploye(): void {
        this.isLoadingTempsMoyen = true;
        this.statService.getTempsMoyenEmploye(this.selectedEmpTempsMoyenStat._id)
            .subscribe({
                next: (data: any) => {
                    this.tempsMoyen = [{
                        employe: this.selectedEmpTempsMoyenStat.nomEmploye + ' ' + this.selectedEmpTempsMoyenStat.prenomEmploye,
                        value : data.data ? data.data : 0
                    }];
                    this.isLoadingTempsMoyen = false;
                }
            })
    }

    onItemChange(item: Item): void {
        this.selectedEmpTempsMoyenStat = item.data;
        this.getTempsMoyenEmploye();
    }
}
