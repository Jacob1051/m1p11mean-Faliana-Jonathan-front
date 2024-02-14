import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl: string;
    private userSubject: BehaviorSubject<any | null>;
    public user: Observable<any | null>;
    public redirectUrl!: string;

    constructor(private http: HttpClient, private router: Router) {
        this.apiUrl = environment.apiUrl;
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('manager')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(user: any) {
        return this.http.post(`${this.apiUrl}/User/login`, user)
            .pipe(map((res:any) => {
                if(res.status >= 400 && res.status < 600) throw new Error(res.message);

                localStorage.setItem('manager', JSON.stringify(res.data));
                this.userSubject.next(res.data);
                return res;
            }));
    }

    logout() {
        localStorage.removeItem('manager');
        this.userSubject.next(null);
        this.router.navigate(['/manager/login']);
    }
}
