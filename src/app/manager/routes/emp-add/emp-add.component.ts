import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee/employee.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { confirmPasswordValidator } from 'src/app/_utils/form/password-validator.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { first } from 'rxjs/operators';
import { Service } from 'src/app/_models/service';

@Component({
    selector: 'app-emp-add',
    templateUrl: './emp-add.component.html',
    styleUrls: ['./emp-add.component.scss'],
})
export class EmpAddComponent implements OnInit {
    addEmployeeForm!: FormGroup;
    submitted: boolean = false;
    loading: boolean = false;
    id?: string;
    title: string = 'Ajout employee';
    @ViewChild('modal') myModal: ElementRef | undefined;

    constructor(
        private service: EmployeeService,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];

        this.addEmployeeForm = new FormGroup(
            {
                nomEmploye: new FormControl<string>('Emp', [Validators.required]),
                prenomEmploye: new FormControl<string>('loye', [Validators.required]),
                email: new FormControl<string>('employe@gmail.com', { validators: [Validators.required, Validators.email] }),
                password: new FormControl<string>('0123456789', { validators: [Validators.required, Validators.minLength(8)] }),
                confirmPassword: new FormControl<string>('0123456789', [Validators.required]),
                user: new FormControl(null),
                mesServices: new FormArray([])
            },
            { validators: confirmPasswordValidator });

        if (this.id) {
            this.title = 'Modification employee';
            this.isLoading = true;
            this.service.getEmploye(this.id)
                .pipe(first())
                .subscribe((x: any) => {
                    this.addEmployeeForm.patchValue(x.data);
                    this.addEmployeeForm.patchValue({ 'user': x.data.user._id });
                    this.isLoading = false;
                });
        }
    }

    get items(): FormArray {
        return this.addEmployeeForm.get('mesServices') as FormArray;
    }

    addItem() {
        const newItem = new FormGroup({
            name: new FormControl('test pr'),
            value: new FormControl('test value pr')
        });

        this.items.push(newItem);
    }

    removeItem(index: number) {
        this.items.removeAt(index);
    }


    get formControl() { return this.addEmployeeForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.addEmployeeForm.valid) {
            this.loading = true;

            const auth = this.addEmployeeForm.value;

            this.saveEmploye({
                nomEmploye: auth.nomEmploye,
                prenomEmploye: auth.prenomEmploye,
                email: auth.email,
                password: auth.password,
                confirmPassword: auth.confirmPassword,
                user: auth.user
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
            : this.service.addEmployee(formData);
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

