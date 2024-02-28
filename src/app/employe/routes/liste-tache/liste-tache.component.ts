import { StatutService } from '../../../shared/services/statut/statut.service';
import { Component, OnInit } from '@angular/core';
import { TacheService } from '../../services/tache/tache.service';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { first, firstValueFrom } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
    templateUrl: './liste-tache.component.html',
    styleUrl: './liste-tache.component.scss'
})
export class ListeTacheComponent implements OnInit {
    isLoading: boolean = false;

    finishedTask!: any[];
    pendingTask!: any[];

    statutEnCours!: any;
    statutTermine!: any;

    commission: number = 0;

    constructor(
        private tacheService: TacheService,
        private authService: AuthService,
        private toastr: ToastrService,
        private statutService: StatutService
    ) {

    }

    ngOnInit(): void {
        this.isLoading = true;
        this.initializeData();
        // this.setStatutEnCours();

        // this.tacheService.getTacheByEmpToday(this.authService.userValue.user_id).subscribe({
        //     next: (response: any) => {
        //         if (response.status == 200) {

        //             this.pendingTask = response.data.filter((task: any) => (
        //                 task.statut._id === this.statutEnCours._id
        //             ));

        //             this.finishedTask = response.data.filter((task: any) => (
        //                 task.statut._id != this.statutEnCours._id
        //             ));

        //             this.commission = this.finishedTask.reduce((total ,value)=>total += (value.prix * (value.service.commission / 100)), 0);

        //         } else {
        //             console.error(response.message);
        //             this.toastr.error(
        //                 `Une erreur s'est produite!`,
        //                 'Erreur!',
        //                 TOAST_OPTIONS_BOTTOM_RIGHT
        //             );
        //         }
        //         this.isLoading = false;
        //     },
        //     error: (error) => {
        //         console.error(error);
        //         this.toastr.error(
        //             `Une erreur s'est produite`,
        //             'Erreur!',
        //             TOAST_OPTIONS_BOTTOM_RIGHT
        //         );
        //         this.isLoading = false;
        //     },
        // });
    }

    async initializeData() {
        await this.setStatutEnCours(); // Wait for setStatutEnCours() to finish before continuing

        this.tacheService.getTacheByEmpToday(this.authService.userValue.user_id).subscribe({
            next: (response: any) => {
                if (response.status == 200) {

                    this.pendingTask = response.data.filter((task: any) => (
                        task.statut._id === this.statutEnCours._id
                    ));

                    this.finishedTask = response.data.filter((task: any) => (
                        task.statut._id != this.statutEnCours._id
                    ));

                    this.commission = this.finishedTask.reduce((total ,value)=>total += (value.prix * (value.service.commission / 100)), 0);

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
        const datas: any = await firstValueFrom(this.statutService.getStatutTermine());

        this.statutEnCours = data.data;
        this.statutTermine = datas.data;
    }

    drop(event: CdkDragDrop<any[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
            this.commission = this.finishedTask.reduce((total ,value)=>total += (value.prix * (value.service.commission / 100)), 0);
        }
    }

    saveTodayWork() {
        this.isLoading = true;

        if(this.finishedTask.length > 0){
            this.tacheService.updateTache({listeTache: this.finishedTask}, this.authService.userValue.token)
            .subscribe({
                next: (response: any) => {
                    if (response.status == 200) {
                        this.toastr.success(
                            `Tache termine`,
                            'Success',
                            TOAST_OPTIONS_BOTTOM_RIGHT
                        );
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
    }
}
