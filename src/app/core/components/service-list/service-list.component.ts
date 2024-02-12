import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Service } from 'src/app/shared/models/service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-service-list-template',
    templateUrl: './service-list.component.html',
    styleUrl: './service-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceListComponent {
    searchText: string = '';
    listeService: Service[] = [];
    listeServiceBackup: Service[] = [];
    apiUrl: string;

    selectedService!: Service;

    @Output() itemChange = new EventEmitter<Service>(undefined);

    @Input('listeServices')
    set listeServices(service: Service[]) {
        this.listeService = service;
        this.listeServiceBackup = service;
    }


    constructor() {
        this.apiUrl = environment.apiUrl;
    }

    isLoading: boolean = false;

    searchInsideService() {
        if (this.searchText) {
            this.listeService = this.listeService.filter((element) => {
                return element.nomService.toLowerCase().includes(this.searchText.toLowerCase()) || element.description.toLowerCase().includes(this.searchText.toLowerCase()) || element.duree.toString().includes(this.searchText.toLowerCase()) || element.prix.toString().includes(this.searchText.toLowerCase());
            });
        } else {
            this.listeService = this.listeServiceBackup;
        }
    }

    onClick(service: Service): void {
        this.selectedService = service;
        this.itemChange.emit(service);

        (<any>window).closeModal();
    }

}

