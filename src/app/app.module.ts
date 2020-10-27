import { AuthorizationHeaderService } from './shared/services/authorization-header.service';
import { LocalStorageService } from './shared/services/local-storage.service';
import { UserService } from './shared/services/user.service';
import { CarService } from './shared/services/car.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faSpinner, faAngleLeft, faAngleRight, faPlus, faStar, faStarHalfAlt, faArrowRight, faUpload, faVideo,
  faEdit, faPen, faTrashAlt, faSearch, faUser, faKey, faEye, faEyeSlash, faSignInAlt, faSignOutAlt, faUserPlus, faCircle, faCarAlt
} from '@fortawesome/free-solid-svg-icons';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CarCardComponent } from './home/car-card/car-card.component';
import { SignupComponent } from './signup/signup.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SingleCarComponent } from './cars/single-car/single-car.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    CarCardComponent,
    SignupComponent,
    LoginComponent,
    SingleCarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    CarService,
    UserService,
    LocalStorageService,
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationHeaderService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private library: FaIconLibrary
  ) {
    this.library.addIcons(
      faSpinner, faAngleLeft, faAngleRight, faPlus, faStar, faStarHalfAlt, faArrowRight, faUpload, faVideo,
      faEdit, faPen, faTrashAlt, faSearch, faUser, faKey, faEye, faEyeSlash, faSignInAlt, faSignOutAlt, faUserPlus, faCircle, faCarAlt
    )
  }
}
