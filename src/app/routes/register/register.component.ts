import { RegisterService } from './../../services/client/register/register.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmPasswordValidator } from 'src/app/utils/form/password-validator.validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    submitted: boolean = false;
    loading: boolean = false;

    registerForm: FormGroup = new FormGroup(
        {
            firstName: new FormControl<string>('', [Validators.required]),
            lastName: new FormControl<string>('', [Validators.required]),
            email: new FormControl<string>('', { validators: [Validators.required , Validators.email ]}),
            password: new FormControl<string>('', { validators: [Validators.required , Validators.minLength(8)]}),
            confirmPassword: new FormControl<string>('', [Validators.required]),
        },
        {validators: confirmPasswordValidator});

    get formControl() {return this.registerForm.controls;}

    onSubmit() {
        this.submitted = true;

        if(this.registerForm.valid) {
            this.loading = true;

            const auth = this.registerForm.value;

            this.service.register({
                nomClient: auth.firstName,
                prenomClient: auth.lastName,
                email: auth.email,
                password: auth.password,
                confirmPassword: auth.confirmPassword
            }).subscribe({
                error: error => {
                    console.log(error);
                },
                complete: () => {
                    this.router.navigate(['/login'], { relativeTo: this.route });
                    this.loading = false;
                }
            });
        }
    }

    constructor(
        private service: RegisterService,
        private route: ActivatedRoute,
        private router: Router
    ) { }
}
