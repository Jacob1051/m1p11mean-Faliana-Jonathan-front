import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { MANAGER_ROUTING } from './constants/route-list';
import { authGuard } from './guards/auth.guard';
import { EmpAddComponent } from './routes/emp-add/emp-add.component';
import { EmpListComponent } from './routes/emp-list/emp-list.component';
import { LoginComponent } from './routes/login/login.component';
import { ServiceAddComponent } from './routes/service-add/service-add.component';
import { ServiceListComponent } from './routes/service-list/service-list.component';
import { OfferListComponent } from './routes/offer-list/offer-list.component';
import { OfferAddComponent } from './routes/offer-add/offer-add.component';
import { OfferEditComponent } from './routes/offer-edit/offer-edit.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: MANAGER_ROUTING.INDEX, component: EmpListComponent, canActivate: [authGuard] },
            { path: MANAGER_ROUTING.LOGIN, component: LoginComponent }
        ],
    },
    {
        path: 'emp',
        component: LayoutComponent,
        children: [
            { path: MANAGER_ROUTING.LISTE_EMPLOYE, component: EmpListComponent, canActivate: [authGuard] },
            { path: MANAGER_ROUTING.ADD_EMPLOYE, component: EmpAddComponent, canActivate: [authGuard] },
            { path: MANAGER_ROUTING.UPDATE_EMPLOYE, component: EmpAddComponent, canActivate: [authGuard] },
        ],
    },
    {
        path: 'service',
        component: LayoutComponent,
        children: [
            { path: MANAGER_ROUTING.LISTE_SERVICE, component: ServiceListComponent, canActivate: [authGuard] },
            { path: MANAGER_ROUTING.ADD_SERVICE, component: ServiceAddComponent, canActivate: [authGuard] },
            { path: MANAGER_ROUTING.UPDATE_SERVICE, component: ServiceAddComponent, canActivate: [authGuard] },
        ],
    },
    {
        path: 'offre',
        component: LayoutComponent,
        children: [
            { path: MANAGER_ROUTING.OFFRE_LIST, component: OfferListComponent, canActivate: [authGuard] },
            { path: MANAGER_ROUTING.OFFRE_ADD, component: OfferAddComponent, canActivate: [authGuard] },
            { path: MANAGER_ROUTING.OFFRE_EDIT, component: OfferEditComponent, canActivate: [authGuard] },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManagerRoutingModule {}
