import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { IndexComponent } from './routes/service-list/index.component';
import { FooterComponent } from './components/footer/footer.component';
import { ServiceDetailComponent } from './routes/service-detail/service-detail.component';
import { LoginComponent } from './routes/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './routes/register/register.component';

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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
