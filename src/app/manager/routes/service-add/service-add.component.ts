import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/utils/toast/toast-options';
import { ServiceService } from '../../services/service/service.service';

@Component({
    selector: 'app-service-add',
    templateUrl: './service-add.component.html',
    styleUrl: './service-add.component.scss'
})
export class ServiceAddComponent {
    addServiceForm!: FormGroup;
    submitted: boolean = false;
    loading: boolean = false;

    submit() {
        this.submitted = true;

        if (this.addServiceForm.valid) {
            this.loading = true;

            const service = this.addServiceForm.value;

            const formData: FormData = new FormData();
            formData.append('nomService', service.nomService);
            formData.append('prix', service.prix);
            formData.append('duree', service.duree);
            formData.append('commission', service.commission);
            formData.append('description', service.description);
            formData.append('icone', service.icone);

            // Append files to the form data
            for (let i = 0; i < service.image.length; i++) {
                formData.append('file', service.image[i], service.image[i].name);
            }
            for (let i = 0; i < service.galerie.length; i++) {
                formData.append('files', service.galerie[i], service.galerie[i].name);
            }

            this.service.addService(formData)
                .subscribe({
                    next: (response: any) => {
                        // console.log(response);
                        if (response.status == 200) {
                            this.toastr.success('Vous vous êtes inscrit avec succès!', 'Succès!', TOAST_OPTIONS_BOTTOM_RIGHT);
                            this.router.navigate(['/manager/service/list']);
                        }
                        else {
                            console.error(response.message);
                            this.toastr.error(`Une erreur s'est produite!`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                        }
                        this.loading = false;
                    },
                    error: error => {
                        console.error(error);
                        this.toastr.error(`Une erreur s'est produite`, 'Erreur!', TOAST_OPTIONS_BOTTOM_RIGHT);
                        this.loading = false;
                    },
                });
        }
    }

    checkIcon() { console.log('inn?') }

    constructor(
        private service: ServiceService,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private router: Router,
    ) {
    }

    get formControl() { return this.addServiceForm.controls; }

    ngOnInit(): void {
        this.addServiceForm = new FormGroup(
            {
                nomService: new FormControl<string>('Service', [Validators.required]),
                prix: new FormControl<number>(10, [Validators.required]),
                duree: new FormControl<number>(10, { validators: [Validators.required] }),
                commission: new FormControl<number>(10, { validators: [Validators.required] }),
                description: new FormControl<string>('Description', [Validators.required]),
                image: new FormControl(null),
                icone: new FormControl<string>('test-icon', [Validators.required]),
                galerie: new FormControl(null),
            }
        );
    }
}
