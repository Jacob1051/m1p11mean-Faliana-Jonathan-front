import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StatutService {

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    apiUrl: string;

    getListeStatut() {
        return this.http.get(`${this.apiUrl}/Statut/getListeStatut`);
    }

    getStatut(id: string) {
        return this.http.get(`${this.apiUrl}/Statut/getStatut/${id}`);
    }

    getStatutEnCours = () => {
        return this.http.get(`${this.apiUrl}/Statut/getStatutEnCours`);
    }

    getStatutTermine = () => {
        return this.http.get(`${this.apiUrl}/Statut/getStatutTermine`);
    }
}
