import { Employee } from 'src/app/_models/employee';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee/employee.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { confirmPasswordValidator } from 'src/app/_utils/form/password-validator.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';

@Component({
    selector: 'app-emp-add',
    templateUrl: './emp-add.component.html',
    styleUrls: ['./emp-add.component.scss'],
})
export class EmpAddComponent implements OnInit{
    addEmployeeForm!:FormGroup;
    submitted: boolean = false;
    loading: boolean = false;

    constructor(
        private service: EmployeeService,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.addEmployeeForm = new FormGroup(
            {
                nomEmploye: new FormControl<string>('Emp', [Validators.required]),
                prenomEmploye: new FormControl<string>('loye', [Validators.required]),
                email: new FormControl<string>('employe@gmail.com', { validators: [Validators.required , Validators.email ]}),
                password: new FormControl<string>('0123456789', { validators: [Validators.required , Validators.minLength(8)]}),
                confirmPassword: new FormControl<string>('0123456789', [Validators.required]),
            },
            {validators: confirmPasswordValidator});
    }

    get formControl() { return this.addEmployeeForm.controls; }

    onSubmit() {
        this.submitted = true;

        if(this.addEmployeeForm.valid) {
            this.loading = true;

            const auth = this.addEmployeeForm.value;

            this.service.addEmployee({
                nomEmploye: auth.nomEmploye,
                prenomEmploye: auth.prenomEmploye,
                email: auth.email,
                password: auth.password,
                confirmPassword: auth.confirmPassword
            }).subscribe({
                next: (response: any) => {
                    // console.log(response);
                    if(response.status == 200){
                        this.toastr.success('Vous vous êtes inscrit avec succès!', 'Succès!',  TOAST_OPTIONS_BOTTOM_RIGHT);
                        this.router.navigate(['/'], { relativeTo: this.route });
                    }
                    else{
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

    isLoading: boolean = false;
}

