import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './routes/login/login.component';
import { EmpListComponent } from './routes/emp-list/emp-list.component';


const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'list-emp', component: EmpListComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }
