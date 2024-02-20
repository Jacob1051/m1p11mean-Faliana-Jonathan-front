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
    listeEmploye: Employe[] = [];
    listeEmployeAsItem: Item[] = [];
    choix: Item[] = [{id: 0, name:'Par Mois'}, {id: 1, name:'Par Jouir'}];


    //---------------------loading variable---------------------//
    isLoadingTempsMoyen = true;
    isLoadingNbReservation = true;
    isLoadingRevenue = true;
    //---------------------loading variable---------------------//

    //---------------------mean work time variable---------------------//
    selectedEmpTempsMoyenStat!: Employe;
    tempsMoyen: any = [];
    //---------------------mean work time variable---------------------//

    //---------------------appointment nb variable---------------------//
    selectedChoice: Item = this.choix[0];
    nbReservation: any = [];
    //---------------------appointment nb variable---------------------//

    //---------------------revenue variable---------------------//
    selectedChoiceRevenue: Item = this.choix[0];
    revenue: any = [];
    //---------------------revenue variable---------------------//

    constructor(
        private statService: StatsService,
        private employeService: EmployeService
    ){}

    async ngOnInit() {
        await this.getListeEmploye();
        this.getRdvReservation();
        this.getChiffreAffaire();
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

    getRdvReservationParMois(): void {
        this.isLoadingNbReservation = true;
        this.statService.getRdvReservationParMois()
            .subscribe({
                next: (data: any) => {
                    this.nbReservation = data.data;
                    this.isLoadingNbReservation = false;
                }
            })
    }

    getChiffreAffaireParMois(): void {
        this.isLoadingRevenue = true;
        this.statService.getChiffreAffaireParMois()
            .subscribe({
                next: (data: any) => {
                    this.revenue = data.data;
                    this.isLoadingRevenue = false;
                }
            })
        this.isLoadingRevenue = true;
    }

    getChiffreAffaireParJour(): void {
        this.isLoadingRevenue = true;
        this.statService.getChiffreAffaireParJour()
            .subscribe({
                next: (data: any) => {
                    this.revenue = data.data;
                    this.isLoadingRevenue = false;
                }
            })
    }

    getRdvReservation(): void {
        if(this.selectedChoice.id == 0){
            this.getRdvReservationParMois();
        }else{
            this.getRdvReservationParJour();
        }
    }

    getChiffreAffaire(): void {
        if(this.selectedChoiceRevenue.id == 0){
            this.getChiffreAffaireParMois();
        }else{
            this.getChiffreAffaireParJour();
        }
    }

    getRdvReservationParJour(): void {
        this.isLoadingNbReservation = true;
        this.statService.getRdvReservationParJour()
            .subscribe({
                next: (data: any) => {
                    this.nbReservation = data.data;
                    this.isLoadingNbReservation = false;
                }
            })
    }

    onItemChange(item: Item): void {
        this.selectedEmpTempsMoyenStat = item.data;
        this.getTempsMoyenEmploye();
    }

    OnChoiceItemNbReservationChange(item: Item){
        this.selectedChoice = item;
        this.getRdvReservation();
    }

    OnChoiceItemRevenueChange(item: Item){
        this.selectedChoiceRevenue = item;
        this.getChiffreAffaire();
    }
}
