import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiUrl:string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
   }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/Client/addClient`, user);
  }
}
