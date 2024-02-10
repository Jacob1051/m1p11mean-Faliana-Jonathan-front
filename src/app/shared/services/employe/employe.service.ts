import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EmployeService {

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    apiUrl: string;

    getListeEmploye() {
        return this.http.get(`${this.apiUrl}/Employe/getListeEmploye`);
    }

    getEmploye(id: string) {
        return this.http.get(`${this.apiUrl}/Employe/getEmploye/${id}`);
    }

    getListeEmployeLibre(criteria: any) {
        return this.http.post(`${this.apiUrl}/Employe/getListeEmployeLibre/`, criteria);
    }

    updateHoraireTravail(horaire: any, user_Id: string) {
        return this.http.put(`${this.apiUrl}/Employe/updateHoraireTravail/${user_Id}`, horaire);
    }
}
