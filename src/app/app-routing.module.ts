import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { LoginComponent } from './routes/login/login.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { RegisterComponent } from './routes/register/register.component';
import { ServiceDetailComponent } from './routes/service-detail/service-detail.component';
import { IndexComponent } from './routes/service-list/index.component';

const routes: Routes = [
  { path:'', component: IndexComponent, canActivate: [authGuard] },
  { path:'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'service/:id', component: ServiceDetailComponent },
  { path:'**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
