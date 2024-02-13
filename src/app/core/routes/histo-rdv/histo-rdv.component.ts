import { Component } from '@angular/core';
import { UserInformationService } from '../../services/user/userInformation/user-information.service';
import { AuthService } from '../../services/client/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { RdvService } from '../../services/rdv/rdv.service';

@Component({
    templateUrl: './histo-rdv.component.html',
    styleUrl: './histo-rdv.component.scss'
})
export class HistoRdvComponent {
    isLoading: boolean = false;

    constructor(
        private router: Router,
        private service: UserInformationService,
        private authService: AuthService,
        private rdvService: RdvService,
        private toastr: ToastrService
    ) {

    }

    user: any;
    userRDV: any;

    ngOnInit(): void {
        this.authService.user.subscribe((nouvelUtilisateur) => {
            this.user = nouvelUtilisateur;
            this.getListeRdvParClient();
        });
    }

    getListeRdvParClient() {
        this.isLoading = true;
        this.rdvService
            .getListeRdvParClient(this.user.user_id)
            ?.subscribe({
                next: (response: any) => {
                    if(response.status == 200){
                        this.userRDV = response.data;
                        console.log(this.userRDV);
                    }
                    else{
                        console.error(response.message);
                        this.toastr.error(`Une erreur s'est produite`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                    }
                    this.isLoading = false;
                },
                error: (error) => {
                    console.error(error);
                    this.toastr.error(`Une erreur s'est produite`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                    this.isLoading = false;
                },
            });
    }
}
