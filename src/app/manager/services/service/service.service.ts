import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/_models/employee';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    private apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    getListeService() {
        return this.http.get(`${this.apiUrl}/Service/getListeService`);
    }

    addService(empData: any) {
        return this.http.post(`${this.apiUrl}/Service/addService`, empData);
    }
}
