import { EMP_ROUTING } from './constants/route-list';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './routes/login/login.component';
import { authGuard } from './guards/auth.guard';
import { HeureTravailComponent } from './components/heure-travail/heure-travail.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: EMP_ROUTING.INDEX, component: LoginComponent },
            { path: EMP_ROUTING.LOGIN, component: LoginComponent },
            { path: EMP_ROUTING.HEURE_TRAVAIL, component: HeureTravailComponent, canActivate: [authGuard] },
            { path: EMP_ROUTING.LISTE_TACHE, component: LoginComponent, canActivate: [authGuard] },
            { path: EMP_ROUTING.MON_COMPTE, component: LoginComponent, canActivate: [authGuard] },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
