import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './routes/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpAddComponent } from './routes/emp-add/emp-add.component';
import { EmpListComponent } from './routes/emp-list/emp-list.component';
import { ServiceListComponent } from './routes/service-list/service-list.component';
import { ServiceAddComponent } from './routes/service-add/service-add.component';
import { UploadImagesComponent } from '../core/components/upload-images/upload-images.component';
import { ServiceListModalComponent } from './components/service-list-modal/service-list-modal/service-list-modal.component';


@NgModule({
    declarations: [
        HeaderComponent,
        LayoutComponent,
        LoginComponent,
        EmpAddComponent,
        EmpListComponent,
        ServiceListComponent,
        ServiceAddComponent,
        UploadImagesComponent,
        ServiceListModalComponent
    ],
    imports: [
        CommonModule,
        ManagerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class ManagerModule { }
