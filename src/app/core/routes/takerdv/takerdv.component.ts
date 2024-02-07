import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import 'moment-timezone';
import { ToastrService } from 'ngx-toastr';
import { Employe } from 'src/app/_models/employe';
import { Service } from 'src/app/_models/service';
import { Statut } from 'src/app/_models/statut';
import { addDureeToDate, addOneMinute } from 'src/app/_utils/addDureeToDate.util';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { environment } from 'src/environments/environment';
import { EmployeService } from '../../services/employe/employe.service';
import { LocalTimezoneService } from '../../services/localTimezone/local-timezone.service';
import { ServiceService } from '../../services/service/service.service';
import { StatutService } from '../../services/statut/statut.service';

@Component({
    selector: 'app-takerdv',
    templateUrl: './takerdv.component.html',
    styleUrl: './takerdv.component.scss',
})
export class TakerdvComponent {
    constructor(
        private serviceService: ServiceService,
        private employeService: EmployeService,
        private statutService: StatutService,
        private formBuilder: FormBuilder,
        private localTimezoneService: LocalTimezoneService,
        private toastr: ToastrService
    ) {
      localTimezoneService.setDefaultTimezone();
      this.getListeService();
      this.getListeEmploye();
      this.getStatutEnCours();
      // console.log("AAAA", moment(new Date()).toDate());
    }

    isLoading = false;
    isSubmitted = false;
    apiUrl: string = environment.apiUrl;

    listeService: Service[] = [];
    listeServiceBackup: Service[] = [];
    listeEmploye: Employe[] = [];
    listeEmployeDispo: Employe[] = [];
    listeTache: any = [];

    currentDate: Date = moment(new Date()).toDate();
    statutEnCours: Statut | any;

    tacheForm: any = new FormGroup({
      dateDebut: new FormControl(moment(new Date()).format('YYYY-MM-DD HH:mm'), Validators.required),
      service: new FormControl("", Validators.required),
      employe: new FormControl("", Validators.required),
    });

    rdvForm = new FormGroup({
      dateRdv: new FormControl(moment(new Date()).format('YYYY-MM-DD HH:mm'), Validators.required),
    });

    tacheFormSubmit = () => {
      this.isSubmitted = true;
      
      console.log(this.tacheForm.value);
      if (this.tacheForm.valid) {
        console.log(this.tacheForm.value);

        let dateDebut = new Date(this.tacheForm.value.dateDebut ? this.tacheForm.value.dateDebut : "");
        // console.log(dateDebut);

        let service: Service | undefined = this.listeServiceBackup.find((element)=>{
          return this.tacheForm.value.service == element._id
        });
        // console.log(service);

        let employe: Employe | undefined = this.listeEmploye.find((element)=>{
          return this.tacheForm.value.employe == element._id
        });
        // console.log(employe);
      
        let dateFin = addDureeToDate(dateDebut, service ? service.duree : 0);

        let newTache = {
          dateDebut: dateDebut,
          dateFin: dateFin,
          employe: employe,
          service: service, 
          isDeleted: false,
          statut: this.statutEnCours
        }

        console.log("new tache:", newTache);

        this.listeTache.push(newTache);
        this.tacheForm.reset();

        // Trier le tableau d'objets par dateDebut
        this.listeTache.sort((a: any, b: any) => {
          const dateA = new Date(a.dateDebut);
          const dateB = new Date(b.dateDebut);
          return dateA.getTime() - dateB.getTime();
        });
        this.rdvForm = new FormGroup({
          dateRdv: new FormControl(moment(this.listeTache[0].dateDebut).format('YYYY-MM-DD HH:mm'), Validators.required),
        });

        (<any>window).closeModal();
      }
    };

    changerListeEmployeDispo = () =>{
      if(this.tacheForm.value.service){
        // console.log("ok?")
        
        this.listeEmployeDispo = this.listeEmploye.filter((employe)=>{
          let condition1 = employe.mesServices.some((service) => {
            return service._id === this.tacheForm.value.service
          }); // il faut qu'il maitrise un des services

          let condition2; // il faut qu'il n'est pas de tache durant le début et la fin cad début + délai service

          return condition1 == true;
        })
        
      }
      else{
        this.listeEmployeDispo = this.listeEmploye;
      }
      
      // this.tacheForm.value.employe = null; //Il faut reset la valeur sinon faut cliquer 2 fois
    }

    changerDateDebutTache = () => {
      if(this.listeTache.length>0){
        // console.log("hello2");

        // Trier le tableau d'objets par dateDebut
        this.listeTache.sort((a: any, b: any) => {
          const dateA = new Date(a.dateDebut);
          const dateB = new Date(b.dateDebut);
          return dateA.getTime() - dateB.getTime();
        });

        let lastDate = this.listeTache[this.listeTache.length-1].dateFin;
        lastDate = addOneMinute(lastDate);
        // console.log(lastDate);
        // console.log(moment(lastDate).format('YYYY-MM-DD HH:mm'));

        this.tacheForm = new FormGroup({
          dateDebut: new FormControl(moment(lastDate).format('YYYY-MM-DD HH:mm'), Validators.required),
          service: new FormControl("", Validators.required),
          employe: new FormControl("", Validators.required),
        });
      }
      else{
        this.tacheForm = new FormGroup({
          dateDebut: new FormControl(this.rdvForm.value.dateRdv, Validators.required),
          service: new FormControl("", Validators.required),
          employe: new FormControl("", Validators.required),
        });
      }
    }

    formatDateTache = (date: Date) =>{
      moment.locale("fr"); 
      return moment(date).format("LLLL");
    }

    getListeService = () => {
        this.isLoading = true;
        this.serviceService.getListeService().subscribe({
            next: (response: any) => {
                if (response.status == 200) {
                    this.listeService = response.data;

                    console.log("liste service: ", this.listeService);

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

    getListeEmploye = () =>{
      this.isLoading = true;
        this.employeService.getListeEmploye().subscribe({
            next: (response: any) => {
                if (response.status == 200) {
                    this.listeEmploye = response.data;
                    console.log(this.listeEmploye);
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

    getStatutEnCours = () =>{
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
    }
  });
}

    
}
