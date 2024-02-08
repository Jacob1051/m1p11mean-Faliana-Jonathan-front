import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employe } from 'src/app/shared/models/employe';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class EmployeService {
    private apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    getListeEmploye() {
        return this.http.get<Employe[]>(`${this.apiUrl}/Employe/getListeEmploye`);
    }

    addEmploye(empData: any) {
        return this.http.post(`${this.apiUrl}/Employe/addEmploye`, empData);
    }

    getEmploye(id: string) {
        return this.http.get(`${this.apiUrl}/Employe/getEmploye/${id}`);
    }

    updateEmploye(id: string, empData: any) {
        return this.http.put(`${this.apiUrl}/Employe/updateEmploye/${id}`, empData);
    }
}
