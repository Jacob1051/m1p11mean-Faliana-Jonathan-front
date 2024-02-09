import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { LOCALSTORAGE } from '../constants/local-storage-name';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { console.log('error');}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = localStorage.getItem(LOCALSTORAGE);

        if (token) {
            const authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(authReq);
        }

        return next.handle(req);
    }
}
