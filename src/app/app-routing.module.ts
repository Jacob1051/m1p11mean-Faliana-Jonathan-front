import { NotFoundComponent } from './routes/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './routes/service-list/index.component';
import { LoginComponent } from './routes/login/login.component';

const routes: Routes = [
  { path:'', component: IndexComponent },
  { path:'login', component: LoginComponent },
  { path:'**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
