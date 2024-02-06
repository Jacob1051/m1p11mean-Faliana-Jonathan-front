import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { confirmPasswordValidator } from 'src/app/_utils/form/password-validator.validator';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { EmployeService } from '../../services/employee/employe.service';

@Component({
    selector: 'app-emp-add',
    templateUrl: './emp-add.component.html',
    styleUrls: ['./emp-add.component.scss'],
})
export class EmpAddComponent implements OnInit{
    addEmployeForm!:FormGroup;
    submitted: boolean = false;
    loading: boolean = false;
    id?: string;
    title: string = 'Ajout employee';

    constructor(
        private service: EmployeService,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];

        this.addEmployeForm = new FormGroup(
            {
                nomEmploye: new FormControl<string>('Emp', [Validators.required]),
                prenomEmploye: new FormControl<string>('loye', [Validators.required]),
                email: new FormControl<string>('employe@gmail.com', { validators: [Validators.required , Validators.email ]}),
                password: new FormControl<string>('0123456789', { validators: [Validators.required , Validators.minLength(8)]}),
                confirmPassword: new FormControl<string>('0123456789', [Validators.required]),
                user: new FormControl(null)
            },
            {validators: confirmPasswordValidator});

            if (this.id) {
                this.title = 'Modification employee';
                this.isLoading = true;
                this.service.getEmploye(this.id)
                    .pipe(first())
                    .subscribe((x: any) => {
                        this.addEmployeForm.patchValue(x.data);
                        this.addEmployeForm.patchValue({'user': x.data.user._id});
                        this.isLoading = false;
                    });
            }
    }

    get formControl() { return this.addEmployeForm.controls; }

    onSubmit() {
        this.submitted = true;

        if(this.addEmployeForm.valid) {
            this.loading = true;

            const auth = this.addEmployeForm.value;

            this.saveEmploye({
                nomEmploye: auth.nomEmploye,
                prenomEmploye: auth.prenomEmploye,
                email: auth.email,
                password: auth.password,
                confirmPassword: auth.confirmPassword,
                user: auth.user
            }).subscribe({
                next: (response: any) => {
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

    private saveEmploye(formData: any) {
        return this.id
            ? this.service.updateEmploye(this.id!, formData)
            : this.service.addEmploye(formData);
    }

    isLoading: boolean = false;
}

