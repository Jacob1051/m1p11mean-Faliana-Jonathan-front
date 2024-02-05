import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/core/services/service/service.service';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/utils/toast/toast-options';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-service-detail',
    templateUrl: './service-detail.component.html',
    styleUrls: ['./service-detail.component.scss'],
})

export class ServiceDetailComponent {
    constructor(
        private serviceService: ServiceService,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService
    ) {
        this.getService();
    }

    isLoading: boolean = false;
    id: string | null = this.activeRoute.snapshot.paramMap.get('id');
    service: any;
    apiUrl = environment.apiUrl;
    isInitBeautyZone: boolean = false;

    getService() {
        this.isLoading = true;
        if (this.id) {
            this.serviceService.getService(this.id).subscribe({
                next: (response: any) => {
                    if (response.status == 200) {
                        this.service = response.data;
                        console.log(response.data);
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

    initBeautyZone(){
        if(!this.isInitBeautyZone){
            const beautyZone = (<any>window).BeautyZoneCopy;
            console.log(beautyZone);
            beautyZone.init();
            beautyZone.handleMasonryFilter();
            this.isInitBeautyZone = true;
        }
    }
}
