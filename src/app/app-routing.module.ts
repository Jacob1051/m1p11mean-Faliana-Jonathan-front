import { NotFoundComponent } from './routes/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './routes/service-list/index.component';
import { LoginComponent } from './routes/login/login.component';
import { RegisterComponent } from './routes/register/register.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  { path:'', component: IndexComponent, canActivate: [authGuard] },
  { path:'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
