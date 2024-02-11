import { StatutService } from '../../../shared/services/statut/statut.service';
import { Component, OnInit } from '@angular/core';
import { TacheService } from '../../services/tache/tache.service';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { first, firstValueFrom } from 'rxjs';

@Component({
    templateUrl: './liste-tache.component.html',
    styleUrl: './liste-tache.component.scss'
})
export class ListeTacheComponent implements OnInit{
    isLoading: boolean = false;

    finishedTask!: any[];
    pendingTask!: any[];

    statutEnCours!: any;

    constructor(
        private tacheService: TacheService,
        private authService: AuthService,
        private toastr: ToastrService,
        private statutService: StatutService
    ){}

    ngOnInit(): void {
        this.isLoading = true;

        this.setStatutEnCours();

        this.tacheService.getTacheByEmp(this.authService.userValue.user_id).subscribe({
            next: (response: any) => {
                if (response.status == 200) {
                    console.log(response.data);

                    this.pendingTask = response.data.map((task:any) => (
                        task.statut._id === this.statutEnCours._id
                    ));

                    this.finishedTask = response.data.map((task:any) => (
                        task.statut._id != this.statutEnCours._id
                    ));

                } else {
                    console.error(response.message);
                    this.toastr.error(
                        `Une erreur s'est produite!`,
                        'Erreur!',
                        TOAST_OPTIONS_BOTTOM_RIGHT
                    );
                }
                this.isLoading = false;
            },
            error: (error) => {
                console.error(error);
                this.toastr.error(
                    `Une erreur s'est produite`,
                    'Erreur!',
                    TOAST_OPTIONS_BOTTOM_RIGHT
                );
                this.isLoading = false;
            },
        });
    }

    async setStatutEnCours() {
        const data: any = await firstValueFrom(this.statutService.getStatutEnCours());

        this.statutEnCours = data.data;
    }
}
