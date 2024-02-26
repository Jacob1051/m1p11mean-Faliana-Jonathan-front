import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Employe } from 'src/app/shared/models/employe';
import { Item } from 'src/app/shared/models/multi-dropdown';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { EmployeService } from 'src/app/shared/services/employe/employe.service';
import { StatsService } from '../../services/stats/stats.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
    listeEmploye: Employe[] = [];
    listeEmployeAsItem: Item[] = [];
    choix: Item[] = [{id: 0, name:'Par Mois'}, {id: 1, name:'Par Jour'}];
    beneficeForm!: FormGroup;

    monthsArray: Item[] = [
        { id: 0, name: "Janvier" },
        { id: 1, name: "Fevrier" },
        { id: 2, name: "Mars" },
        { id: 3, name: "Avril" },
        { id: 4, name: "Mai" },
        { id: 5, name: "Juin" },
        { id: 6, name: "Juillet" },
        { id: 7, name: "Aout" },
        { id: 8, name: "Septembre" },
        { id: 9, name: "Octobre" },
        { id: 10, name: "Novembre" },
        { id: 11, name: "Decembre" }
    ];

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

    //---------------------benefice variable---------------------//
    benefice: any = [];
    selectedMonthBenefice: Item = this.monthsArray[0];
    beneficeBackUp: any = [];
    //---------------------benefice variable---------------------//

    constructor(
        private statService: StatsService,
        private employeService: EmployeService
    ){}

    async ngOnInit() {
        this.beneficeForm = new FormGroup(
            {
                salary: new FormControl<Number>(0, [Validators.required]),
                rent: new FormControl<Number>(0, [Validators.required]),
                pieces: new FormControl<Number>(0, [Validators.required]),
                other: new FormControl<Number>(0, [Validators.required]),
                month: new FormControl(null, [Validators.required]),
            }
        );

        await this.getListeEmploye();
        this.getRdvReservation();
        this.getChiffreAffaire();
        this.getBeneficeParMois();
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
                        value : data.data ? data.data/60 : 0
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

    getBeneficeParMois(): void {
        this.isLoadingRevenue = true;
        this.statService.getChiffreAffaireParMois()
            .subscribe({
                next: (data: any) => {
                    this.benefice = _.cloneDeep(data.data);
                    this.beneficeBackUp = _.cloneDeep(data.data);
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

    OnChoiceMonthBenefice(item: Item){
        this.selectedMonthBenefice = item;
        console.log(item);
    }

    onSubmitBeneficeForm() {
        const beneficeFormValue = this.beneficeForm.value;

        var index = this.selectedMonthBenefice.id ?? 0;

        this.benefice[index].value = this.benefice[index].value - (
            beneficeFormValue.salary + beneficeFormValue.rent + beneficeFormValue.pieces + beneficeFormValue.other
        );
        this.benefice = [...this.benefice];

    }

    resetBenefice() {
        this.benefice = _.cloneDeep(this.beneficeBackUp);
    }

    testChange(event: any){
        console.log(event);
    }
}
