import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ServiceService } from '../../services/service/service.service';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { Item } from 'src/app/shared/models/multi-dropdown';
import { OffreService } from '../../services/offre/offre.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-offer-edit',
    templateUrl: './offer-edit.component.html',
    styleUrl: './offer-edit.component.scss'
})
export class OfferEditComponent implements OnInit{
    isLoading = false;
    loading = false;
    submitted = false;
    id :string = '';
    apiUrl = '';
    addOffreForm!: FormGroup;

    offreData !: any;

    listeService: Item[] = [];

    constructor(
        private serviceService: ServiceService,
        private offreService: OffreService,
        private toastr: ToastrService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.apiUrl = environment.apiUrl;
    }

    async ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        await this.getOffre(this.id);
        await this.getListeService();
    }

    async getOffre(id: string) {
        this.offreData = await firstValueFrom(this.offreService.getOffre(id));
        this.offreData = this.offreData.data;
    }

    async getListeService() {
        this.isLoading = true;
        var services:any = await firstValueFrom(this.serviceService.getListeService());
        this.listeService = services.data.map((service: any) => ({ id: service._id, name: service.nomService, data: service } as Item));

        this.listeService.forEach((item: any) => {
            if (this.offreData.service._id === item.id) {
                item.checked = true;
            }
        });
    }

    submit(data: any) {
        this.offreService.updateOffre(this.id, data)
        .subscribe({
            next: (response: any) => {
                if (response.status == 200) {
                    this.toastr.success('Offre modifié avec succès!', 'Succès!', TOAST_OPTIONS_BOTTOM_RIGHT);
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
