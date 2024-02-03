import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/client/auth/auth.service';
import { UserInformationService } from 'src/app/services/user/userInformation/user-information.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    constructor(
        private router: Router,
        private service: UserInformationService,
        private authService: AuthService
    ) {
    }

    isLoading: boolean = false;
    user: any;
    userInformation:any;

    ngOnInit(): void {
      this.authService.user.subscribe((nouvelUtilisateur) => {
        this.user = nouvelUtilisateur;
        this.userInformation = this.user ? this.getUserInformation() : null;
      });
    }

    goToLogin() {
        this.router.navigateByUrl('/login');
    }

    getUserInformation() {
        // console.log("eto");
        this.isLoading = true;
        this.service
            .getUserInformation(this.user.user_id, this.user.role)
            ?.subscribe({
                next: (response: any) => {
                    // console.log("eto2");
                    this.userInformation = response.data;
                    this.isLoading = false;
                    // console.log("donc tonga eto?");
                },
                error: (error) => {
                    console.log('erreur', error);
                    this.isLoading = false;
                },
            });
    }

    logout(){
      this.authService.logout();
    }
}
