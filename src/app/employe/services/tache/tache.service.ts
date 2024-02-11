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

    getTacheByEmp(id: string) {
        return this.http.get(`${this.apiUrl}/Tache/getTacheByEmp/${id}`);
    }

}
