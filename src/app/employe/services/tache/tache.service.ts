import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TacheService {

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    apiUrl: string;

    getTacheByEmpToday(id: string) {
        return this.http.get(`${this.apiUrl}/Tache/getTacheByEmpToday/${id}`);
    }

    updateTache(tacheTab: any, tokenEmp: string){
        return this.http.post(`${this.apiUrl}/Tache/updateTaches/${tokenEmp}`, tacheTab);
    }
}
