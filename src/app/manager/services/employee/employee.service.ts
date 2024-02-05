import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/_models/employee';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    getListeEmployee() {
        return this.http.get<Employee[]>(`${this.apiUrl}/Employe/getListeEmploye`);
    }

    addEmployee(empData: any) {
        return this.http.post(`${this.apiUrl}/Employe/addEmploye`, empData);
    }
}
