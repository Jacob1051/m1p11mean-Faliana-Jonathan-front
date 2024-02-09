import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './routes/login/login.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
        ]
    },
    // {
    //     path: 'emp', component: LayoutComponent,
    //     children: [
    //         { path: 'list', component: EmpListComponent },
    //         { path: 'add', component: EmpAddComponent },
    //         { path: 'edit/:id', component: EmpAddComponent },
    //     ]
    // },
    // {
    //     path: 'service', component: LayoutComponent,
    //     children: [
    //         { path: 'list', component: ServiceListComponent },
    //         { path: 'add', component: ServiceAddComponent },
    //         { path: 'edit/:id', component: ServiceAddComponent },
    //     ]
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
