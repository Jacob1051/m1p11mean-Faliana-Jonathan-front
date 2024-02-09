import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './employe-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './routes/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    declarations: [
        LoginComponent,
        LayoutComponent,
        HeaderComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        ManagerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class EmployeModule { }
