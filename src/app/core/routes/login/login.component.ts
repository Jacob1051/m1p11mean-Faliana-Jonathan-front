import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { AuthService } from 'src/app/core/services/client/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading: boolean = false;
    submitted: boolean = false;
    error!: string;

    constructor(
        private formBuilder: FormBuilder,
        private service: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email:['client@gmail.com', { validators: [Validators.required , Validators.email ]}],
            password: ['0123456789', Validators.required],
        });
    }

    get formControl() {return this.loginForm.controls;}

    onSubmit() {
        this.submitted = true;
        this.error = '';

        if (this.loginForm.valid) {
            this.loading = true;

            const auth = this.loginForm.value;
            // console.log(auth);
            this.service
                .login(auth)
                .pipe(first())
                .subscribe({
                    next: (response: any) => {

                        if(response.status==200){
                            this.toastr.success('Vous vous êtes connecté avec succès!', 'Succès!',  TOAST_OPTIONS_BOTTOM_RIGHT);

                            const returnUrl = this.service.redirectUrl || '/home';

                            this.router.navigateByUrl(returnUrl);
                        }
                        else{
                            console.error(response.message);
                            this.toastr.error(`Une erreur s'est produite!`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                        }
                        this.loading = false;
                    },
                    error: (error) => {
                        // this.error = error;
                        this.error = "Email ou mot de passe incorrect";
                        this.loading = false;
                        console.error(error);
                        this.toastr.error(`Une erreur s'est produite`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                    },
                });
        }
    }
}
