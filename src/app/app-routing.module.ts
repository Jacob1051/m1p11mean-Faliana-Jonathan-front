import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';
import { LoginComponent } from './core/routes/login/login.component';
import { NotFoundComponent } from './core/routes/not-found/not-found.component';
import { RegisterComponent } from './core/routes/register/register.component';
import { ServiceDetailComponent } from './core/routes/service-detail/service-detail.component';
import { IndexComponent } from './core/routes/service-list/index.component';
import { LayoutComponent } from './core/components/layout/layout.component';

const managerModule = () => import('./manager/manager.module').then(x => x.ManagerModule);

const routes: Routes = [
    // { path: '', component: IndexComponent, canActivate: [authGuard] },
    // { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },
    // { path: 'service/:id', component: ServiceDetailComponent },
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'service/:id', component: ServiceDetailComponent },
        ]
    },
    { path: 'manager', loadChildren: managerModule },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
