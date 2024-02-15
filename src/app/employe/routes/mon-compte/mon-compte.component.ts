import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { confirmPasswordValidator } from 'src/app/_utils/form/password-validator.validator';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { ServiceService } from 'src/app/core/services/service/service.service';
import { EmployeService } from 'src/app/manager/services/employee/employe.service';
import { Item } from 'src/app/shared/models/multi-dropdown';
import { Service } from 'src/app/shared/models/service';
import { AuthService } from '../../services/auth/auth.service';
import { Employe } from 'src/app/shared/models/employe';

@Component({
    templateUrl: './mon-compte.component.html',
    styleUrl: './mon-compte.component.scss'
})
export class MonCompteComponent {
    employe!: Employe;
    addEmployeForm!: FormGroup;
    submitted: boolean = false;
    loading: boolean = false;
    id?: string;
    title: string = 'Ajouter un employé';
    serviceList: Service[] | undefined;

    jourDeLaSemaine!: FormGroup;

    listItems: Item[] = [];
    currentSelectedItem!: Item;

    hasServices: boolean = false;

    action: number = 0;

    defaultValue: any = {
        debut: moment(new Date().setHours(8, 0, 0)).format('HH:mm'),
        fin: moment(new Date().setHours(17, 0, 0)).format('HH:mm'),
        jourDeLaSemaine: [1, 2, 3, 4, 5]
    };


    onItemChange(item: Item): void {
        this.currentSelectedItem = item;
    }

    constructor(
        private service: EmployeService,
        private formBuilder: FormBuilder,
        private serviceService: ServiceService,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private router: Router,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.id = this.authService.userValue.user_id;

        this.serviceService.getListeService()
            .subscribe((x: any) => {
                const data = x.data.map((service: any) => ({ id: service._id, name: service.nomService } as Item));
                this.listItems = data;
            });

        this.jourDeLaSemaine = this.formBuilder.group({
            0: [false],
            1: [true],
            2: [true],
            3: [true],
            4: [true],
            5: [true],
            6: [false]
        });

        this.addEmployeForm = new FormGroup(
            {
                nomEmploye: new FormControl<string>('Emp', [Validators.required]),
                prenomEmploye: new FormControl<string>('loye', [Validators.required]),
                email: new FormControl<string>('employe@gmail.com', { validators: [Validators.required, Validators.email] }),
                password: new FormControl<string>('0123456789', { validators: [Validators.required, Validators.minLength(8)] }),
                confirmPassword: new FormControl<string>('0123456789', [Validators.required]),
                debutHeure: new FormControl(this.defaultValue.debut, Validators.required),
                finHeure: new FormControl(this.defaultValue.fin, Validators.required),
                user: new FormControl(null),
                image: new FormControl(null),
            },
            { validators: confirmPasswordValidator });

        this.addEmployeForm.addControl('jourSemaine', this.jourDeLaSemaine);

        if (this.id) {
            this.action = 1;
            this.title = "Modifier l'employé";
            this.isLoading = true;
            this.service.getEmploye(this.id)
                .pipe(first())
                .subscribe((x: any) => {
                    this.resetJourSemaine();

                    this.addEmployeForm.patchValue(x.data);
                    this.addEmployeForm.patchValue({ 'image': null});
                    this.addEmployeForm.patchValue({ 'user': x.data.user._id });
                    this.addEmployeForm.patchValue({ 'email': x.data.user.email });
                    this.addEmployeForm.patchValue({ 'debutHeure': moment(x.data.horaireTravail.debut).format('HH:mm') });
                    this.addEmployeForm.patchValue({ 'finHeure': moment(x.data.horaireTravail.fin).format('HH:mm') });

                    x.data.horaireTravail.jourTravail.forEach((element:any) => {
                        this.addEmployeForm.get(`jourSemaine.${element}`)?.patchValue(true);
                    });

                    this.listItems.forEach((item: any) => {
                        const found = x.data.mesServices.find((serviceItem: any) => serviceItem._id === item.id);
                        if (found) {
                            item.checked = true;
                        }
                    });

                    this.isLoading = false;
                });
        }
    }

    get formControl() { return this.addEmployeForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.addEmployeForm.valid) {
            this.loading = true;

            const auth = this.addEmployeForm.value;
            var selectedService = this.listItems.filter((item: any) => item.checked);

            if (selectedService.length > 0) {
                const workHour = this.buildWorkHour(auth);

                const formData: FormData = new FormData();

                formData.append('nomEmploye', auth.nomEmploye);
                formData.append('prenomEmploye', auth.prenomEmploye);
                formData.append('mesServices', JSON.stringify([...selectedService.map(item => item.id)]));
                formData.append('horaireTravail', JSON.stringify(workHour));
                formData.append('email', auth.email);
                formData.append('password', auth.password);
                formData.append('confirmPassword', auth.confirmPassword);
                formData.append('user', auth.user);

                if (auth.image) {
                    formData.append('file', auth.image[0], auth.image[0].name);
                }

                this.saveEmploye(
                    formData
                ).subscribe({
                    next: (response: any) => {
                        if (response.status == 200) {

                            if(this.action == 1){
                                this.toastr.success('Employé modifié avec succès!', 'Succès!', TOAST_OPTIONS_BOTTOM_RIGHT);
                            }else{
                                this.toastr.success('Employé enregistré avec succès!', 'Succès!', TOAST_OPTIONS_BOTTOM_RIGHT);
                            }

                            this.router.navigate(['/employe/mon-compte']);
                        }
                        else {
                            console.error(response.message);
                            this.toastr.error(`Une erreur s'est produite!`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                        }
                        this.loading = false;
                    },
                    error: error => {
                        console.error(error);
                        this.toastr.error(`Une erreur s'est produite`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                        this.loading = false;
                    },
                });
            }
            else {
                this.hasServices = false;
            }

        }
    }

    private saveEmploye(formData: any) {
        return this.id
            ? this.service.updateEmploye(this.id!, formData)
            : this.service.addEmploye(formData);
    }

    buildWorkHour(auth: any) {
        var jourTravail = auth.jourSemaine;

        jourTravail = Object.keys(jourTravail)
            .filter(key => jourTravail[key]);

        const { debutHeure, finHeure } = auth;
        const debutSplitted = debutHeure.split(':');
        const finSplitted = finHeure.split(':');

        let momentHeureTravailDebut = moment();
        let momentHeureTravailFin = moment();

        momentHeureTravailDebut.set({ 'h': debutSplitted[0], 'm': debutSplitted[1], 's': 0 });
        momentHeureTravailFin.set({ 'h': finSplitted[0], 'm': finSplitted[1], 's': 0 });

        return { debut: momentHeureTravailDebut.toDate().toISOString(), fin: momentHeureTravailFin.toDate().toISOString(), jourTravail: jourTravail };
    }

    resetJourSemaine(){
        this.addEmployeForm.get(`jourSemaine.0`)?.patchValue(false);
        this.addEmployeForm.get(`jourSemaine.1`)?.patchValue(false);
        this.addEmployeForm.get(`jourSemaine.2`)?.patchValue(false);
        this.addEmployeForm.get(`jourSemaine.3`)?.patchValue(false);
        this.addEmployeForm.get(`jourSemaine.4`)?.patchValue(false);
        this.addEmployeForm.get(`jourSemaine.5`)?.patchValue(false);
        this.addEmployeForm.get(`jourSemaine.6`)?.patchValue(false);
    }

    isLoading: boolean = false;
}
