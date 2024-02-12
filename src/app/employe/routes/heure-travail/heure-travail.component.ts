import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { LocalTimezoneService } from 'src/app/core/services/localTimezone/local-timezone.service';
import { EmployeService } from 'src/app/shared/services/employe/employe.service';
import { AuthService } from '../../services/auth/auth.service';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { UserInformationService } from 'src/app/core/services/user/userInformation/user-information.service';

@Component({
    selector: 'app-heure-travail',
    templateUrl: './heure-travail.component.html',
    styleUrl: './heure-travail.component.scss'
})
export class HeureTravailComponent implements OnInit {
    isLoading: boolean = false;
    heureTravail!: FormGroup;
    jourDeLaSemaine!: FormGroup;
    formHoraireTravail!: FormGroup;

    user: any;
    userInformation: any;

    defaultValue: any = {
        debut: moment(new Date().setHours(8, 0, 0)).format('HH:mm'),
        fin: moment(new Date().setHours(17, 0, 0)).format('HH:mm'),
        jourDeLaSemaine: [1,2,3,4,5]
    };

    constructor(
        private formBuilder: FormBuilder,
        private localTimezoneService: LocalTimezoneService,
        private toastr: ToastrService,
        private empService: EmployeService,
        private authService: AuthService,
        private userInfoService: UserInformationService
    ) {
        localTimezoneService.setDefaultTimezone();
    }

    ngOnInit(): void {
        this.authService.user.subscribe((nouvelUtilisateur) => {
            this.user = nouvelUtilisateur;
            this.getUserInformation();
        });

        this.heureTravail = new FormGroup({
            debut: new FormControl(
                this.defaultValue.debut,
                Validators.required
            ),
            fin: new FormControl(
                this.defaultValue.fin,
                Validators.required
            ),
        });

        this.jourDeLaSemaine = this.formBuilder.group({
            0: [false],
            1: [false],
            2: [false],
            3: [false],
            4: [false],
            5: [false],
            6: [false]
        });

        this.formHoraireTravail = this.formBuilder.group({
            heureTravail: this.heureTravail,
            jourSemaine: this.jourDeLaSemaine
        });
    }

    submitHoraireDeTravail() {
        const {debut, fin} = this.formHoraireTravail.value.heureTravail;
        const debutSplitted = debut.split(':');
        const finSplitted = fin.split(':');

        let momentHeureTravailDebut = moment();
        let momentHeureTravailFin = moment();

        momentHeureTravailDebut.set({'h': debutSplitted[0], 'm': debutSplitted[1], 's': 0});
        momentHeureTravailFin.set({'h': finSplitted[0], 'm': finSplitted[1], 's': 0});

        var jourTravail = this.formHoraireTravail.value.jourSemaine;

        jourTravail = Object.keys(jourTravail)
        .filter(key => jourTravail[key]);

        const data = {debut: momentHeureTravailDebut.toDate().toISOString(), fin:momentHeureTravailFin.toDate().toISOString()  , jourTravail: jourTravail};

        this.empService.updateHoraireTravail(data, this.user.user_id)
            .subscribe({
                next: (response: any) => {
                    if(response.status == 200){
                        this.toastr.success(`Horaire de travail modifié avec succès`, 'Succès', TOAST_OPTIONS_BOTTOM_RIGHT);
                    }else{
                        console.error(response.message);
                        this.toastr.error(`Une erreur s'est produite`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                    }
                },
                error: (error:any) => {
                    console.error(error);
                    this.toastr.error(`Une erreur s'est produite`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                },
            })
    }

    getUserInformation() {
        this.isLoading = true;
        this.userInfoService
            .getUserInformation(this.user.user_id, this.user.role)
            ?.subscribe({
                next: (response: any) => {
                    if(response.status == 200){
                        this.userInformation = response.data;

                        if(this.userInformation.horaireTravail.debut){
                            this.formHoraireTravail.get('heureTravail.debut')?.patchValue(
                                moment(new Date(this.userInformation.horaireTravail.debut)).format('HH:mm')
                            );
                        }

                        if(this.userInformation.horaireTravail.fin){
                            this.formHoraireTravail.get('heureTravail.fin')?.patchValue(
                                moment(new Date(this.userInformation.horaireTravail.fin)).format('HH:mm')
                            );
                        }

                        if(this.userInformation.horaireTravail.jourTravail){
                            this.userInformation.horaireTravail.jourTravail.forEach((element:any) => {
                                this.formHoraireTravail.get(`jourSemaine.${element}`)?.patchValue(true);
                            });
                        }
                    }else{
                        console.error(response.message);
                        this.toastr.error(`Une erreur s'est produite`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                    }
                    this.isLoading = false;
                },
                error: (error:any) => {
                    console.error(error);
                    this.toastr.error(`Une erreur s'est produite`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                    this.isLoading = false;
                },
            });
    }
}
