import { ServiceListComponent } from './routes/service-list/service-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './routes/login/login.component';
import { EmpListComponent } from './routes/emp-list/emp-list.component';
import { EmpAddComponent } from './routes/emp-add/emp-add.component';
import { ServiceAddComponent } from './routes/service-add/service-add.component';


const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
        ]
    },
    {
        path: 'emp', component: LayoutComponent,
        children: [
            { path: 'list', component: EmpListComponent },
            { path: 'add', component: EmpAddComponent },
        ]
    },
    {
        path: 'service', component: LayoutComponent,
        children: [
            { path: 'list', component: ServiceListComponent },
            { path: 'add', component: ServiceAddComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
