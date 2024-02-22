import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    private apiUrl: string;

    getRappelRendezVous(id: string) {
        return this.http.get(`${this.apiUrl}/Client/getRappelRendezVous/${id}`);
    }
}
