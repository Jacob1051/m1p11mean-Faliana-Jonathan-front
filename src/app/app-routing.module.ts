import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { LoginComponent } from './core/routes/login/login.component';
import { NotFoundComponent } from './core/routes/not-found/not-found.component';
import { RegisterComponent } from './core/routes/register/register.component';
import { ServiceDetailComponent } from './core/routes/service-detail/service-detail.component';
import { TakerdvComponent } from './core/routes/takerdv/takerdv.component';

const managerModule = () => import('./manager/manager.module').then(x => x.ManagerModule);

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'takerdv', component: TakerdvComponent },
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
