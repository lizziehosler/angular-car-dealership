import { NewCarComponent } from './cars/new-car/new-car.component';
import { SingleDealershipComponent } from './dealerships/single-dealership/single-dealership.component';
import { SingleCarComponent } from './cars/single-car/single-car.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'cars/new',
    component: NewCarComponent,
    pathMatch: 'full'
  },
  {
    path: 'cars/:id',
    component: SingleCarComponent,
    pathMatch: 'full'
  },
  {
    path: 'dealerships/:id',
    component: SingleDealershipComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
