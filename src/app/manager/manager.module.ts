import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './routes/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        ManagerComponent,
        HeaderComponent,
        LayoutComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        ManagerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class ManagerModule { }
