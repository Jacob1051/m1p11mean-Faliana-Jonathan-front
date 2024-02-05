import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    apiUrl: string;

    getAllServices() {

        return [
            {
                icon: 'flaticon-barbershop',
                name: 'Coiffure & stylisme',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
            }, {
                icon: 'flaticon-makeup',
                name: 'Makeup',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
            }, {
                icon: 'flaticon-makeup-1',
                name: 'Manicure & Pedicure',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
            }, {
                icon: 'flaticon-woman-1',
                name: 'Soins de la peau',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
            }, {
                icon: 'flaticon-woman',
                name: 'Traitement du corps',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
            }, {
                icon: 'flaticon-candle-1',
                name: 'Massage',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
            }
        ]
    }

    getListeService() {
        return this.http.get(`${this.apiUrl}/Service/getListeService`);
    }

    getService(id: string) {
        return this.http.get(`${this.apiUrl}/Service/getService/${id}`);
    }
}
