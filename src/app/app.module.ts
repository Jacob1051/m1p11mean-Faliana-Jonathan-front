import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { LandingComponent } from './core/components/landing/landing.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { HomeComponent } from './core/routes/home/home.component';
import { LoginComponent } from './core/routes/login/login.component';
import { NotFoundComponent } from './core/routes/not-found/not-found.component';
import { RegisterComponent } from './core/routes/register/register.component';
import { ServiceDetailComponent } from './core/routes/service-detail/service-detail.component';
import { IndexComponent } from './core/routes/service-list/index.component';
import { TakerdvComponent } from './core/routes/takerdv/takerdv.component';
import { LocalTimezoneService } from './core/services/localTimezone/local-timezone.service';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ServiceListComponent } from './core/components/service-list/service-list.component';
import { PreferenceComponent } from './core/routes/preference/preference.component';
import { EmpListComponent } from './core/components/emp-list/emp-list.component';
import { CommonModule } from '@angular/common';
import { HistoRdvComponent } from './core/routes/histo-rdv/histo-rdv.component';

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
        HeaderComponent,
        IndexComponent,
        FooterComponent,
        ServiceDetailComponent,
        LoginComponent,
        RegisterComponent,
        LayoutComponent,
        HomeComponent,
        TakerdvComponent,
        LandingComponent,
        ServiceListComponent,
        PreferenceComponent,
        EmpListComponent,
        HistoRdvComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
    ],
    providers: [
        LocalTimezoneService,
        importProvidersFrom(HttpClientModule),
        provideAnimationsAsync(),
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
