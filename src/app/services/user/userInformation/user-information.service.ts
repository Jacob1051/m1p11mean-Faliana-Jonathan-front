import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {

  apiUrl:string;

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }

  getUserInformation(user_id:string, role:string){
    if(role=="Client"){
      return this.http.get(`${this.apiUrl}/Client/getClient/${user_id}`);
    }
    if(role=="Employe"){
      return this.http.get(`${this.apiUrl}/Employe/getEmploye/${user_id}`);
    }
    if(role=="Manager"){
      return this.http.get(`${this.apiUrl}/Manager/getManager/${user_id}`);
    }
    return
  }
}
