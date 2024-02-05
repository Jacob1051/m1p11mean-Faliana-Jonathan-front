import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/client/auth/auth.service';
import { UserInformationService } from 'src/app/core/services/user/userInformation/user-information.service';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';

@Component({
    selector: 'app-header-manager',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    constructor(
        private router: Router,
        private service: UserInformationService,
        private authService: AuthService,
        private toastr: ToastrService
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
        this.router.navigateByUrl('/manager/login');
    }

    getUserInformation() {
        // console.log("eto");
        this.isLoading = true;
        this.service
            .getUserInformation(this.user.user_id, this.user.role)
            ?.subscribe({
                next: (response: any) => {
                    // console.log("eto2");
                    if(response.status == 200){
                        this.userInformation = response.data;
                    }
                    else{
                        console.error(response.message);
                        this.toastr.error(`Une erreur s'est produite`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                    }
                    this.isLoading = false;
                    // console.log("donc tonga eto?");
                },
                error: (error) => {
                    console.error(error);
                    this.toastr.error(`Une erreur s'est produite`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                    this.isLoading = false;
                },
            });
    }

    logout(){
      this.authService.logout();
    }
}
