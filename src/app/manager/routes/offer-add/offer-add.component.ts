import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ServiceService } from '../../services/service/service.service';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { Item } from 'src/app/shared/models/multi-dropdown';
import { OffreService } from '../../services/offre/offre.service';
import { Router } from '@angular/router';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-offer-add',
    templateUrl: './offer-add.component.html',
    styleUrl: './offer-add.component.scss'
})
export class OfferAddComponent implements OnInit{
    isLoading = false;
    loading = false;
    submitted = false;
    apiUrl = '';
    addOffreForm!: FormGroup;

    listeService: Item[] = [];

    constructor(
        private serviceService: ServiceService,
        private offreService: OffreService,
        private toastr: ToastrService,
        private router: Router
    ) {
        this.apiUrl = environment.apiUrl;
    }

    ngOnInit(): void {
        this.getListeService();
    }

    async getListeService() {
        this.isLoading = true;

        var services:any = await firstValueFrom(this.serviceService.getListeService());
        this.listeService = services.data.map((service: any) => ({ id: service._id, name: service.nomService, data: service } as Item));
    }

    submit(data: any) {

        this.offreService.addOffre(data)
        .subscribe({
            next: (response: any) => {
                if (response.status == 200) {
                    this.toastr.success('Offre ajouté avec succès!', 'Succès!', TOAST_OPTIONS_BOTTOM_RIGHT);
                    this.router.navigate(['/manager/offre/list']);
                }
                else {
                    console.error(response.message);
                    this.toastr.error(`Une erreur s'est produite!`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                }
                this.loading = false;
                this.submitted = false;
            },
            error: error => {
                console.error(error);
                this.toastr.error(`Une erreur s'est produite`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                this.loading = false;
                this.submitted = false;
            },
        });
    }
}
