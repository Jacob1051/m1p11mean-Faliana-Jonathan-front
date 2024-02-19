import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StatsService {

    private apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    getTempsMoyenEmploye(id: string) {
        return this.http.get(`${this.apiUrl}/Statistique/getTempsMoyenEmploye/${id}`);
    }
}
