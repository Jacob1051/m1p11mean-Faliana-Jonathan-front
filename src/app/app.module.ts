import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './routes/login/login.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { RegisterComponent } from './routes/register/register.component';
import { ServiceDetailComponent } from './routes/service-detail/service-detail.component';
import { IndexComponent } from './routes/service-list/index.component';

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
        HeaderComponent,
        IndexComponent,
        FooterComponent,
        ServiceDetailComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(), 
    ],
    providers: [
        importProvidersFrom(HttpClientModule)
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
