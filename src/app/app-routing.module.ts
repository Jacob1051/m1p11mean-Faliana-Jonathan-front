import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/service-list/index.component';
import { LoginComponent } from './components/login/login.component';

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
