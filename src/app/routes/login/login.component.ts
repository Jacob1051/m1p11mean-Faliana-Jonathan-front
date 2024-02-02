import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/client/auth/auth.service';

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
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email:['', { validators: [Validators.required , Validators.email ]}],
            password: ['', Validators.required],
        });
    }

    get formControl() {return this.loginForm.controls;}

    onSubmit() {
        this.submitted = true;
        this.error = '';

        if (this.loginForm.valid) {
            this.loading = true;

            const auth = this.loginForm.value;
            this.service
                .login(auth)
                .pipe(first())
                .subscribe({
                    next: () => {
                        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                        this.router.navigateByUrl(returnUrl);
                    },
                    error: (error) => {
                        this.error = error;
                        this.loading = false;
                    },
                });
        }
    }
}
