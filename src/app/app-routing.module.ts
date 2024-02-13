import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { HomeComponent } from './core/routes/home/home.component';
import { LoginComponent } from './core/routes/login/login.component';
import { NotFoundComponent } from './core/routes/not-found/not-found.component';
import { RegisterComponent } from './core/routes/register/register.component';
import { ServiceDetailComponent } from './core/routes/service-detail/service-detail.component';
import { IndexComponent } from './core/routes/service-list/index.component';
import { TakerdvComponent } from './core/routes/takerdv/takerdv.component';
import { authGuard } from './core/guard/auth.guard';
import { PreferenceComponent } from './core/routes/preference/preference.component';
import { HistoRdvComponent } from './core/routes/histo-rdv/histo-rdv.component';
import { CLIENT_ROUTING } from './core/constants/route-list';

const managerModule = () => import('./manager/manager.module').then(x => x.ManagerModule);
const employeModule = () => import('./employe/employe.module').then(x => x.EmployeModule);

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: CLIENT_ROUTING.INDEX, component: HomeComponent },
            { path: CLIENT_ROUTING.HOME, component: HomeComponent },
            { path: CLIENT_ROUTING.LOGIN, component: LoginComponent },
            { path: CLIENT_ROUTING.REGISTER, component: RegisterComponent },
            { path: CLIENT_ROUTING.TAKERDV, component: TakerdvComponent, canActivate: [authGuard] },
            { path: CLIENT_ROUTING.HISTORDV, component: HistoRdvComponent, canActivate: [authGuard] },
            { path: CLIENT_ROUTING.PREFERENCES, component: PreferenceComponent, canActivate: [authGuard] },
            { path: CLIENT_ROUTING.LISTE_SERVICE, component: IndexComponent },
            { path: CLIENT_ROUTING.SERVICE_DETAIL, component: ServiceDetailComponent },
        ]
    },
    { path: 'manager', loadChildren: managerModule },
    { path: 'employe', loadChildren: employeModule },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
