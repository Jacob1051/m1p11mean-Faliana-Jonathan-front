import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RdvService {

    apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    addRendezvous(rdvData: any) {
        return this.http.post(`${this.apiUrl}/Rendezvous/addRendezvous/`, rdvData);
    }

    getListeRdvParClient(idClient: any) {
        return this.http.get(`${this.apiUrl}/Rendezvous/getListeRdvParClient/${idClient}`);
    }
}
