import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employe } from 'src/app/shared/models/employe';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class OffreService {
    private apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    getListeOffre() {
        return this.http.get(`${this.apiUrl}/Offre/getListeOffre`);
    }

    addOffre(offreData: any) {
        return this.http.post(`${this.apiUrl}/Offre/addOffre`, offreData);
    }

    getOffre(id: string) {
        return this.http.get(`${this.apiUrl}/Offre/getOffre/${id}`);
    }

    updateOffre(id: string, offreData: any) {
        return this.http.put(`${this.apiUrl}/Offre/updateOffre/${id}`, offreData);
    }

    deleteOffre(id: string) {
        return this.http.delete(`${this.apiUrl}/Offre/deleteOffre/${id}`);
    }
}
