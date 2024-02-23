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
import { ServiceListModalComponent } from './components/service-list-modal/service-list-modal/service-list-modal.component';
import { SharedModule } from '../shared/shared.module';
import { OfferListComponent } from './routes/offer-list/offer-list.component';
import { OfferAddComponent } from './routes/offer-add/offer-add.component';
import { OfferFormComponent } from './components/offer-form/offer-form.component';
import { OfferEditComponent } from './routes/offer-edit/offer-edit.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';


@NgModule({
    declarations: [
        HeaderComponent,
        LayoutComponent,
        LoginComponent,
        EmpAddComponent,
        EmpListComponent,
        ServiceListComponent,
        ServiceAddComponent,
        ServiceListModalComponent,
        OfferListComponent,
        OfferAddComponent,
        OfferFormComponent,
        OfferEditComponent,
        DashboardComponent,
        BarChartComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        ManagerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class ManagerModule { }
