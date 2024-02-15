import { NgModule, importProvidersFrom } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ManagerRoutingModule } from './employe-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './routes/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { HeureTravailComponent } from './routes/heure-travail/heure-travail.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ListeTacheComponent } from './routes/liste-tache/liste-tache.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MonCompteComponent } from './routes/mon-compte/mon-compte.component';

@NgModule({
    declarations: [
        LoginComponent,
        LayoutComponent,
        HeaderComponent,
        HeureTravailComponent,
        ListeTacheComponent,
        MonCompteComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        ManagerRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DatePipe,
        DragDropModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ]
})
export class EmployeModule { }
