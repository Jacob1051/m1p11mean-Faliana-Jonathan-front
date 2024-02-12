import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { TOAST_OPTIONS_BOTTOM_RIGHT } from 'src/app/_utils/toast/toast-options';
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
    isLoading: boolean = false;
    id?: string;
    title?: string = 'Ajouter un service';

    submit() {
        this.submitted = true;

        if (this.addServiceForm.valid) {
            this.loading = true;

            const service = this.addServiceForm.value;

            // console.log("ato?", service);

            const formData: FormData = new FormData();
            formData.append('nomService', service.nomService);
            formData.append('prix', service.prix);
            formData.append('duree', service.duree);
            formData.append('commission', service.commission);
            formData.append('description', service.description);
            formData.append('icone', service.icone);

            if(service.image){
                for (let i = 0; i < service.image.length; i++) {
                    formData.append('file', service.image[i], service.image[i].name);
                } 
            }

            if(service.galerie && service.galerie.length>0){
                for (let i = 0; i < service.galerie.length; i++) {
                    formData.append('files', service.galerie[i], service.galerie[i].name);
                }
            }

            this.saveService(formData)
                .subscribe({
                    next: (response: any) => {
                        if (response.status == 200) {
                            this.toastr.success('Vous vous êtes inscrit avec succès!', 'Succès!', TOAST_OPTIONS_BOTTOM_RIGHT);
                            this.router.navigate(['/manager/service/list']);
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
        this.id = this.route.snapshot.params['id'];

        this.addServiceForm = new FormGroup(
            {
                nomService: new FormControl<string>('Service', [Validators.required]),
                prix: new FormControl<number>(10, [Validators.required]),
                duree: new FormControl<number>(10, { validators: [Validators.required] }),
                commission: new FormControl<number>(10, { validators: [Validators.required] }),
                description: new FormControl<string>(''),
                image: new FormControl(null),
                icone: new FormControl<string>(''),
                galerie: new FormControl(null),
            }
        );

        if (this.id) {
            this.title = 'Modifier un service';
            this.isLoading = true;
            this.service.getService(this.id)
                .pipe(first())
                .subscribe((x: any) => {
                    // console.log("data", x.data);
                    this.addServiceForm = new FormGroup(
                        {
                            nomService: new FormControl<string>(x.data.nomService, [Validators.required]),
                            prix: new FormControl<number>(x.data.prix, [Validators.required]),
                            duree: new FormControl<number>(x.data.duree, [Validators.required]),
                            commission: new FormControl<number>(x.data.commission, [Validators.required]),
                            description: new FormControl<string>(x.data.description),
                            icone: new FormControl<string>(x.data.icone),
                            image: new FormControl(null),
                            galerie: new FormControl(null),
                        }
                    );
                    this.isLoading = false;
                });
        }
    }

    private saveService(formData: any) {
        if(this.id){
            // console.log(formData);
            return this.service.updateService(this.id!, formData)
        }
        else{
            // console.log("ay ato?");
            return this.service.addService(formData);
        }
    }
}
