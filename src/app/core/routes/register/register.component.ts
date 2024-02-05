
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { confirmPasswordValidator } from 'src/app/_utils/form/password-validator.validator';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { RegisterService } from '../../services/client/register/register.service';



@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    constructor(
        private service: RegisterService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService
    ) { }

    submitted: boolean = false;
    loading: boolean = false;

    registerForm: FormGroup = new FormGroup(
        {
            firstName: new FormControl<string>('client', [Validators.required]),
            lastName: new FormControl<string>('client', [Validators.required]),
            email: new FormControl<string>('client@gmail.com', { validators: [Validators.required , Validators.email ]}),
            password: new FormControl<string>('0123456789', { validators: [Validators.required , Validators.minLength(8)]}),
            confirmPassword: new FormControl<string>('0123456789', [Validators.required]),
        },
        {validators: confirmPasswordValidator});

    get formControl() {return this.registerForm.controls;}

    onSubmit() {
        this.submitted = true;

        if(this.registerForm.valid) {

            // console.log("ok?");

            this.loading = true;

            const auth = this.registerForm.value;

            this.service.register({
                nomClient: auth.firstName,
                prenomClient: auth.lastName,
                email: auth.email,
                password: auth.password,
                confirmPassword: auth.confirmPassword
            }).subscribe({
                next: (response: any) => {
                    // console.log(response);
                    if(response.status == 200){
                        this.toastr.success('Vous vous êtes inscrit avec succès!', 'Succès!',  TOAST_OPTIONS_BOTTOM_RIGHT);
                        this.router.navigate(['/login'], { relativeTo: this.route });
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
        else{
            // console.log("not ok?");
            // this.toastr.success('Vous vous êtes inscrit avec succès!', 'Succès!',  TOAST_OPTIONS_BOTTOM_RIGHT);
        }
    }


}
