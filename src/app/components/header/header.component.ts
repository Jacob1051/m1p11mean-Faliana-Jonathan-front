import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserInformationService } from 'src/app/services/user/userInformation/user-information.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    constructor(
        private router: Router,
        private service: UserInformationService
    ) {
        this.user ? this.getUserInformation() : null;
    }

    isLoading: boolean = false;
    user = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')!)
        : null;
    userInformation: any;

    goToLogin() {
        this.router.navigateByUrl('/login');
    }

    getUserInformation() {
        this.isLoading = true;
        this.service
            .getUserInformation(this.user.user_id, this.user.role)
            ?.subscribe({
                next: (response: any) => {
                    this.userInformation = response.data;
                    this.isLoading = false;
                    // console.log("donc tonga eto?");
                },
                error: (error) => {
                    console.log("erreur", error);
                    this.isLoading = false;
                },
            });
    }
}
