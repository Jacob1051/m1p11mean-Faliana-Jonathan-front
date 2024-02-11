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

const managerModule = () => import('./manager/manager.module').then(x => x.ManagerModule);
const employeModule = () => import('./employe/employe.module').then(x => x.EmployeModule);

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'takerdv', component: TakerdvComponent, canActivate: [authGuard] },
            { path: 'listeService', component: IndexComponent },
            { path: 'service/:id', component: ServiceDetailComponent },
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
