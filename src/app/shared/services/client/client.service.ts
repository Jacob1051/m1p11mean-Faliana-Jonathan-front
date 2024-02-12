import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    apiUrl: string;

    savePreference(clientId: string, preference: any) {
        return this.http.put(`${this.apiUrl}/Client/savePreference/${clientId}`, preference);
    }
}
