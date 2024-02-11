import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    var router = inject(Router);
    var accountService = inject(AuthService);

    const user = accountService.userValue;
    if (user)
        return true;

    accountService.redirectUrl = state.url;

    router.navigate(['employe/login']);

    return false;
};
