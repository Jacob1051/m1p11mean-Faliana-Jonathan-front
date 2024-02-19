import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { OffreService } from '../../services/offre/offre.service';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrl: './offer-list.component.scss'
})
export class OfferListComponent {
    searchText: string = '';

    listeOffre: any[] = [];
    listeOffreBackup: any[] = [];

    apiUrl: string = environment.apiUrl;

    isLoading: boolean = false;

    searchInsideOfferList() {
        if (this.searchText) {
            this.listeOffre = this.listeOffre.filter(offre =>
                offre.nomOffre.toLowerCase().includes(this.searchText.toLowerCase())
            );
        } else {
            this.listeOffre = this.listeOffreBackup;
        }
    }

    constructor(
        private service: OffreService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.service.getListeOffre()
            .subscribe({
                next: (data: any) => {
                    this.listeOffre = data.data;
                    this.listeOffreBackup = this.listeOffre;
                    this.isLoading = false;
                }
            })
    };

    deleteOffre = (id: string) =>{
        this.service.deleteOffre(id).subscribe({
            next: (response: any) => {
                if (response.status == 200) {
                    this.toastr.success(
                        `Une donnée a été supprimée!`,
                        'Success!',
                        TOAST_OPTIONS_BOTTOM_RIGHT
                    );
                    (<any>window).closeModal();

                    this.isLoading = true;
                    this.service.getListeOffre()
                        .subscribe({
                            next: (data: any) => {
                                this.listeOffre = data.data;
                                this.listeOffreBackup = this.listeOffre;
                                this.isLoading = false;
                            }
                        })
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
