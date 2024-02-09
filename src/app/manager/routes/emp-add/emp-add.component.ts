import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { confirmPasswordValidator } from 'src/app/_utils/form/password-validator.validator';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { Item } from 'src/app/shared/models/multi-dropdown';
import { Service } from 'src/app/shared/models/service';
import { EmployeService } from '../../services/employee/employe.service';
import { ServiceService } from '../../services/service/service.service';

@Component({
    selector: 'app-emp-add',
    templateUrl: './emp-add.component.html',
    styleUrls: ['./emp-add.component.scss'],
})
export class EmpAddComponent implements OnInit {
    addEmployeForm!: FormGroup;
    submitted: boolean = false;
    loading: boolean = false;
    id?: string;
    title: string = 'Ajouter un employé';
    serviceList: Service[] | undefined;
    @ViewChild('modal') myModal: ElementRef | undefined;


    listItems: Item[] = [];
    currentSelectedItem!: Item;

    onItemChange(item: Item): void {
        this.currentSelectedItem = item;
    }

    constructor(
        private service: EmployeService,
        private serviceService: ServiceService,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];

        this.serviceService.getListeService()
        .subscribe((x:any) => {
            const data = x.data.map((service :any) => ({id:service._id, name:service.nomService} as Item));
            this.listItems = data;
        });


        this.addEmployeForm = new FormGroup(
            {
                nomEmploye: new FormControl<string>('Emp', [Validators.required]),
                prenomEmploye: new FormControl<string>('loye', [Validators.required]),
                email: new FormControl<string>('employe@gmail.com', { validators: [Validators.required, Validators.email] }),
                password: new FormControl<string>('0123456789', { validators: [Validators.required, Validators.minLength(8)] }),
                confirmPassword: new FormControl<string>('0123456789', [Validators.required]),
                user: new FormControl(null),
            },
            { validators: confirmPasswordValidator });

        if (this.id) {
            this.title = "Modifier l'employé";
            this.isLoading = true;
            this.service.getEmploye(this.id)
                .pipe(first())
                .subscribe((x: any) => {
                    this.addEmployeForm.patchValue(x.data);
                    this.addEmployeForm.patchValue({ 'user': x.data.user._id });

                    this.listItems.forEach((item:any) => {
                        const found = x.data.mesServices.find((serviceItem:any) => serviceItem._id === item.id);
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
            const selectedService = this.listItems.filter((item:any) => item.checked);

            this.saveEmploye({
                nomEmploye: auth.nomEmploye,
                prenomEmploye: auth.prenomEmploye,
                email: auth.email,
                password: auth.password,
                confirmPassword: auth.confirmPassword,
                user: auth.user,
                mesServices: [...selectedService.map(item => item.id)]
            }).subscribe({
                next: (response: any) => {
                    if (response.status == 200) {
                        this.toastr.success('Vous vous êtes inscrit avec succès!', 'Succès!', TOAST_OPTIONS_BOTTOM_RIGHT);
                        this.router.navigate(['/'], { relativeTo: this.route });
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
    }

    private saveEmploye(formData: any) {
        return this.id
            ? this.service.updateEmploye(this.id!, formData)
            : this.service.addEmploye(formData);
    }

    openModal() {
        this.myModal!.nativeElement.classList.add('show');
        document.body.classList.add('modal-open');
    }

    closeModal() {
        this.myModal!.nativeElement.classList.remove('show');
        document.body.classList.remove('modal-open');
    }

    isLoading: boolean = false;
}
