import { Component } from '@angular/core';
import * as moment from 'moment';
import 'moment-timezone';
import { ToastrService } from 'ngx-toastr';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { LocalTimezoneService } from 'src/app/core/services/localTimezone/local-timezone.service';
import { environment } from 'src/environments/environment';
import { OffreService } from '../../services/offre/offre.service';

@Component({
    selector: 'app-offer-list',
    templateUrl: './offer-list.component.html',
    styleUrl: './offer-list.component.scss',
})
export class OfferListComponent {
    searchText: string = '';

    listeOffre: any[] = [];
    listeOffreBackup: any[] = [];

    apiUrl: string = environment.apiUrl;

    isLoading: boolean = false;

    dateNow = moment();

    searchInsideOfferList() {
        if (this.searchText) {
            this.listeOffre = this.listeOffre.filter((offre) =>
                offre.nomOffre
                    .toLowerCase()
                    .includes(this.searchText.toLowerCase())
            );
        } else {
            this.listeOffre = this.listeOffreBackup;
        }
    }

    constructor(
        private service: OffreService,
        private toastr: ToastrService,
        private localTimezoneService: LocalTimezoneService
    ) {
        localTimezoneService.setDefaultTimezone();
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.service.getListeOffre().subscribe({
            next: (data: any) => {
                this.listeOffre = data.data;
                // console.log(this.listeOffre);
                this.listeOffreBackup = this.listeOffre;
                this.isLoading = false;
            },
        });
    }

    deleteOffre = (id: string) => {
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
                    this.service.getListeOffre().subscribe({
                        next: (data: any) => {
                            this.listeOffre = data.data;
                            this.listeOffreBackup = this.listeOffre;
                            this.isLoading = false;
                        },
                    });
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
    };

    offreStatus(offre: any) {
        return (
            moment(offre.dateDebut).toDate() <= moment().toDate() &&
            moment().toDate() <= moment(offre.dateFin).toDate()
        );
    }
    formatDate = (date: Date) => {
        moment.locale('fr');
        return moment(date).format('Do-MM-YYYY hh:mm');
    };

    isProgrammed(date:string){
        let dateToCompare = new Date(date);

        if(dateToCompare>new Date()){
            return true;
        }

        return false;
    }
}
