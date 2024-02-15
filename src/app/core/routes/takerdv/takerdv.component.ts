import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import 'moment-timezone';
import { ToastrService } from 'ngx-toastr';
import {
    addDureeToDate,
    addOneMinute,
} from 'src/app/_utils/addDureeToDate.util';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { Employe } from 'src/app/shared/models/employe';
import { Item } from 'src/app/shared/models/multi-dropdown';
import { Service } from 'src/app/shared/models/service';
import { Statut } from 'src/app/shared/models/statut';
import { environment } from 'src/environments/environment';
import { EmployeService } from '../../../shared/services/employe/employe.service';
import { StatutService } from '../../../shared/services/statut/statut.service';
import { AuthService } from '../../services/client/auth/auth.service';
import { LocalTimezoneService } from '../../services/localTimezone/local-timezone.service';
import { RdvService } from '../../services/rdv/rdv.service';
import { ServiceService } from '../../services/service/service.service';

@Component({
    selector: 'app-takerdv',
    templateUrl: './takerdv.component.html',
    styleUrl: './takerdv.component.scss',
})
export class TakerdvComponent implements OnInit {

    currentSelectedItem!: Item;
    currentSelectedEmpItem!: Item;

    total: number = 0;

    paiementForm!: FormGroup;

    constructor(
        private serviceService: ServiceService,
        private employeService: EmployeService,
        private statutService: StatutService,
        private formBuilder: FormBuilder,
        private localTimezoneService: LocalTimezoneService,
        private toastr: ToastrService,
        private authService: AuthService,
        private rdvService: RdvService,
        private router: Router
    ) {
        localTimezoneService.setDefaultTimezone();
    }

    ngOnInit(): void {
        this.getListeService();
        this.getListeEmploye();
        this.getStatutEnCours();


        this.paiementForm = new FormGroup({
            nomSurCarte: new FormControl('', Validators.required),
            numeroCarte: new FormControl('0000-0000-0000-0000', Validators.required),
            cvv: new FormControl('123',Validators.required),
            dateExpiration: new FormControl('', Validators.required),
        });
    }

    onItemChange(item: Item): void {
        this.currentSelectedItem = item;
        this.changerListeEmployeDispo();
    }

    onItemEmpChange(item: Item): void {
        this.currentSelectedEmpItem = item;
    }

    isLoading = false;
    isSubmitted = false;
    apiUrl: string = environment.apiUrl;

    listeService: Service[] = [];
    listeServiceAsItem: Item[] = [];
    listeEmployeAsItem: Item[] = [];
    listeServiceBackup: Service[] = [];
    listeEmploye: Employe[] = [];
    listeEmployeDispo: Employe[] = [];
    listeTache: any = [];
    loading: boolean = false;

    currentDate: Date = moment(new Date()).toDate();
    statutEnCours: Statut | any;

    tacheForm: any = new FormGroup({
        dateDebut: new FormControl(
            moment(new Date()).format('YYYY-MM-DD HH:mm'),
            Validators.required
        ),
        service: new FormControl('', Validators.required),
        employe: new FormControl('', Validators.required),
    });

    rdvForm = new FormGroup({
        dateRdv: new FormControl(
            moment(new Date()).format('YYYY-MM-DD HH:mm'),
            Validators.required
        ),
    });

    tacheFormSubmit = () => {
        this.isSubmitted = true;

        if(this.currentSelectedItem && this.currentSelectedEmpItem){

            let dateDebut = new Date(
                this.tacheForm.value.dateDebut
                    ? this.tacheForm.value.dateDebut
                    : ''
            );

            let service: Service = this.currentSelectedItem.data;
            let employe: Employe = this.currentSelectedEmpItem.data;

            let dateFin = addDureeToDate(
                dateDebut,
                service ? service.duree : 0
            );

            let newTache = {
                dateDebut: dateDebut,
                dateFin: dateFin,
                employe: employe,
                service: service,
                isDeleted: false,
                statut: this.statutEnCours,
            };

            this.listeTache.push(newTache);
            this.tacheForm.reset();

            // Trier le tableau d'objets par dateDebut
            this.listeTache.sort((a: any, b: any) => {
                const dateA = new Date(a.dateDebut);
                const dateB = new Date(b.dateDebut);
                return dateA.getTime() - dateB.getTime();
            });

            this.rdvForm = new FormGroup({
                dateRdv: new FormControl(
                    moment(this.listeTache[0].dateDebut).format(
                        'YYYY-MM-DD HH:mm'
                    ),
                    Validators.required
                ),
            });

            // Filtrer les services à retirer de listeService
            let servicesToRemove = this.listeTache.map((tache: any) => {
                return tache.service._id;
            });
            this.listeService = this.listeService.filter((service) => {
                return !servicesToRemove.includes(service._id);
            });

            this.total = this.listeTache.reduce((total:any ,value:any)=>total += value.service.prix, 0);

            (<any>window).closeModal();
        }
    };

    changerListeEmployeDispo = () => {
        // if (this.tacheForm.value.service) {
        // console.log("ok?")

        // this.listeEmployeDispo = this.listeEmploye.filter((employe) => {
        //     let condition1 = employe.mesServices.some((service) => {
        //         return service._id === this.currentSelectedItem.id;
        //     }); // il faut qu'il maitrise un des services

        //     let condition2; // il faut qu'il n'est pas de tache durant le début et la fin cad début + délai service

        //     return condition1 == true;
        // });

        // this.isLoading = true;

        this.employeService.getListeEmployeLibre({ idService: this.currentSelectedItem.data._id, dateHeureDebut: new Date(this.tacheForm.value.dateDebut) })
            .subscribe({
                next: (response: any) => {
                    const dateDeb = moment(this.tacheForm.value.dateDebut, 'YYYY-MM-DD HH:mm');
                    const dateFin = dateDeb.clone().add(this.currentSelectedItem.data.duree, 'minutes');

                    var listeEmploye = response.data;

                    listeEmploye = listeEmploye.filter((emp: any) => (!this.checkIfOverlap(emp, this.currentSelectedItem.data, dateDeb.toDate(), dateFin.toDate())));

                    this.listeEmployeAsItem = listeEmploye.map(
                        (employe: Employe) => (
                            { id: employe._id, name: employe.nomEmploye + ' ' + employe.prenomEmploye, data: employe } as Item
                        )
                    );
                }
            });

        // } else {
        //     this.listeEmployeDispo = this.listeEmploye;
        // }

        // this.tacheForm.value.employe = null; //Il faut reset la valeur sinon faut cliquer 2 fois
    };

    is2DateOverlap(start1: Date, end1: Date, start2: Date, end2: Date) {
        return (start1 <= end2 && end1 >= start2);
    }

    checkIfOverlap(emp: any, service: any, dateDebut: Date, dateFin: Date) {
        return this.listeTache.find(
            (element: any) => (
                element.employe._id === emp._id &&
                element.service._id === service._id &&
                this.is2DateOverlap(element.dateDebut, element.dateFin, dateDebut, dateFin)
            ));
    }

    changerDateDebutTache = () => {
        if (this.listeTache.length > 0) {
            // Trier le tableau d'objets par dateDebut
            this.listeTache.sort((a: any, b: any) => {
                const dateA = new Date(a.dateDebut);
                const dateB = new Date(b.dateDebut);
                return dateA.getTime() - dateB.getTime();
            });

            let lastDate = this.listeTache[this.listeTache.length - 1].dateFin;
            lastDate = addOneMinute(lastDate);
            // console.log(lastDate);
            // console.log(moment(lastDate).format('YYYY-MM-DD HH:mm'));

            this.tacheForm = new FormGroup({
                dateDebut: new FormControl(
                    moment(lastDate).format('YYYY-MM-DD HH:mm'),
                    Validators.required
                ),
                service: new FormControl('', Validators.required),
                employe: new FormControl('', Validators.required),
            });
        } else {
            this.tacheForm = new FormGroup({
                dateDebut: new FormControl(
                    this.rdvForm.value.dateRdv,
                    Validators.required
                ),
                service: new FormControl('', Validators.required),
                employe: new FormControl('', Validators.required),
            });
        }
    };

    formatDateTache = (date: Date) => {
        moment.locale('fr');
        return moment(date).format('LLLL');
    };

    getListeService = () => {
        this.isLoading = true;
        this.serviceService.getListeService().subscribe({
            next: (response: any) => {

                const data = response.data.map((service: any) => ({ id: service._id, name: service.nomService, data: service } as Item));
                this.listeServiceAsItem = data;

                // console.log(response.data);

                if (response.status == 200) {
                    this.listeService = response.data;

                    // console.log('liste service: ', this.listeService);

                    this.listeServiceBackup.length == 0
                        ? (this.listeServiceBackup = this.listeService)
                        : null;
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
    };

    getListeEmploye = () => {
        this.isLoading = true;
        this.employeService.getListeEmploye().subscribe({
            next: (response: any) => {
                if (response.status == 200) {
                    this.listeEmploye = response.data;

                    const data = response.data.map((employe: any) => ({ id: employe._id, name: employe.nomEmploye + ' ' + employe.prenomEmploye, data: employe } as Item));
                    this.listeEmployeAsItem = data;

                    this.listeEmployeDispo.length == 0
                        ? (this.listeEmployeDispo = this.listeEmploye)
                        : null;
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
    };

    getStatutEnCours = () => {
        this.statutService.getStatutEnCours().subscribe({
            next: (response: any) => {
                if (response.status == 200) {
                    this.statutEnCours = response.data;
                } else {
                    console.error(response.message);
                    this.toastr.error(
                        `Une erreur s'est produite!`,
                        'Erreur!',
                        TOAST_OPTIONS_BOTTOM_RIGHT
                    );
                }
            },
            error: (error) => {
                console.error(error);
                this.toastr.error(
                    `Une erreur s'est produite`,
                    'Erreur!',
                    TOAST_OPTIONS_BOTTOM_RIGHT
                );
            },
        });
    };

    validerRDV() {
        this.isSubmitted = true;
        this.loading = true;

        const clientId = this.authService.userValue;

        const rdv = {
            client: clientId.user_id,
            dateDebutRdv: this.listeTache[0].dateDebut,
            dateFinRdv: this.listeTache[this.listeTache.length -1].dateFin,
            listeTaches: this.listeTache.map((data:any)=> ({
                dateDebut: data.dateDebut,
                dateFin: data.dateFin,
                employe: data.employe._id,
                service: data.service._id,
                client: clientId.user_id,
                statut: data.statut._id,
                isDeleted: false
            })),
            paiement:{
                ...this.paiementForm.value,
                montant: this.total
            },
            isDeleted: false,
        };

        this.rdvService.addRendezvous(rdv)
        .subscribe({
            next: (response: any) => {
                if(response.status==200){
                    this.toastr.success('Votre rendez-vous a été enregistré!', 'Succès!',  TOAST_OPTIONS_BOTTOM_RIGHT);
                    this.router.navigateByUrl('/histoRdv');
                }else{
                    this.toastr.error(`Une erreur s'est produite!`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                }
                this.isSubmitted = false;
                this.loading = false;
            },
            error: (error) => {
                this.isSubmitted = false;
                this.loading = false;
                console.error(error);
                this.toastr.error(`Une erreur s'est produite`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
            },
        });
    }

    enleverTache(indexTache:any){
        // console.log("hello", indexTache);
        this.listeTache = this.listeTache.filter((element:any, index:any)=>{
            return index != indexTache
        });
    }

    onSubmitPayement() {
        // console.log(this.paiementForm.value);
        this.validerRDV();
    }
}
