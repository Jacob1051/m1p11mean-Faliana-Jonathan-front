import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from 'src/app/shared/models/service';
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
        return this.http.get<Service[]>(`${this.apiUrl}/Service/getListeService`);
    }

    addService(empData: any) {
        return this.http.post(`${this.apiUrl}/Service/addService`, empData);
    }

    getService(id: string){
        return this.http.get(`${this.apiUrl}/Service/getService/${id}`);
    }

    updateService(id: string, serviceData: any) {
        return this.http.put(`${this.apiUrl}/Service/updateService/${id}`, serviceData);
    }

    deleteService(id: string){
        return this.http.delete(`${this.apiUrl}/Service/deleteService/${id}`);
    }
}
