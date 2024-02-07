import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employe } from 'src/app/_models/employe';
import { Service } from 'src/app/_models/service';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { EmployeService } from '../../services/employe/employe.service';
import { ServiceService } from '../../services/service/service.service';

@Component({
    selector: 'app-takerdv',
    templateUrl: './takerdv.component.html',
    styleUrl: './takerdv.component.scss',
})
export class TakerdvComponent {
    constructor(
        private serviceService: ServiceService,
        private employeService: EmployeService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService
    ) {
      this.getListeService();
      this.getListeEmploye();
    }

    isLoading = false;
    isSubmitted = false;

    listeService: Service[] = [];
    listeServiceBackup: Service[] = [];
    listeEmploye: Employe[] = [];
    listeEmployeDispo: Employe[] = [];
    listeTache: [] = [];
    dateRdv: Date = new Date();

    states = [
      { _id: 1, nomService: 'Service 1' },
      { _id: 2, nomService: 'Service 2' },
      { _id: 3, nomService: 'Service 3' }
    ];

    tacheForm= new FormGroup({
      dateDebut: new FormControl((new Date()).toISOString().substring(0, 16), Validators.required),
      service: new FormControl("", Validators.required),
      employe: new FormControl("", Validators.required),
    });

    tacheFormSubmit = () => {
      this.isSubmitted = true;
      
      // console.log(this.tacheForm.value);
      if (this.tacheForm.valid) {
        console.log(this.tacheForm.value);
        let dateDebut = new Date(this.tacheForm.value.dateDebut ? this.tacheForm.value.dateDebut : "");
        console.log(dateDebut);

        let service: Service | undefined = this.listeServiceBackup.find((element)=>{
          return this.tacheForm.value.service == element._id
        });
        console.log(service);

        let employe: Employe | undefined = this.listeEmploye.find((element)=>{
          return this.tacheForm.value.employe == element._id
        });
        console.log(employe);
      
        const dureeServiceEnMillisecondes = service ? service.duree * 60000 : 0; // 60000 millisecondes = 1 minute
        // Ajouter la durée du service à la date de début
        let dateFin = new Date(dateDebut.getTime() + dureeServiceEnMillisecondes);
        // Arrondir la date de fin à la minute la plus proche
        dateFin = new Date(Math.round(dateFin.getTime() / 60000) * 60000);
        console.log(dateFin);

        let newTache = {
          dateDebut: dateDebut,
          dateFin: dateFin,
          employe: employe,
          service: service, 
          isDeleted: false
        }
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

    
}
