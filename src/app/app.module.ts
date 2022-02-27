import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CircuitsCatalogueComponent } from './components/circuits-catalogue/circuits-catalogue.component';
import { CircuitsService } from './services/circuits.service';
import { FormsModule } from '@angular/forms';
import { CircuitFilterByNamePipe } from './pipes/circuit-filter-by-name.pipe';
import { CircuitFilterPipe } from './pipes/circuit-filter.pipe';
import { CircuitOrderAZPipe } from './pipes/circuit-order-az.pipe';
import { CircuitIndividualComponent } from './components/circuit-individual/circuit-individual.component';
import { CircuitDetailComponent } from './components/circuit-detail/circuit-detail.component';
import { MapComponent } from './components/map/map.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
//Traducción
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core'
import { RouterModule } from '@angular/router';
import { DriversCatalogueComponent } from './components/drivers-catalogue/drivers-catalogue.component';
import { DriversIndividualComponent } from './components/drivers-individual/drivers-individual.component';
import { DriverDetailComponent } from './components/driver-detail/driver-detail.component';
import { DriverFilterPipe } from './pipes/driver-filter.pipe';

//Material
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularMaterialModule } from './modules/angularmaterial.module';
import { SeasonsComponent } from './components/seasons/seasons.component';

//Charts
import { NgChartsModule } from 'ng2-charts';

//Interceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';
import { FooterComponent } from './components/footer/footer.component';
import { ConstructorsCatalogueComponent } from './components/constructors-catalogue/constructors-catalogue.component';
import { ConstructorIndividualComponent } from './components/constructor-individual/constructor-individual.component';
import { ConstructorDetailComponent } from './components/constructor-detail/constructor-detail.component';
import { ConstructorFilterPipe } from './pipes/constructor-filter.pipe';
import { ShowCalendarComponent } from './components/show-calendar/show-calendar.component';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http , '/formulaone/assets/i18n/') //Comentar ruta para trabajar en serve y descomentar para compilar el dist
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CircuitsCatalogueComponent,
    CircuitFilterByNamePipe,
    CircuitFilterPipe,
    CircuitOrderAZPipe,
    CircuitIndividualComponent,
    CircuitDetailComponent,
    MapComponent,
    LoginComponent,
    RegisterComponent,
    DriversCatalogueComponent,
    DriversIndividualComponent,
    DriverDetailComponent,
    DriverFilterPipe,
    SeasonsComponent,
    FooterComponent,
    ConstructorsCatalogueComponent,
    ConstructorIndividualComponent,
    ConstructorDetailComponent,
    ConstructorFilterPipe,
    ShowCalendarComponent

  ],
  imports: [
    AngularMaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //Get data from server API
    FormsModule,
    FontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    NgChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      }
    })
  ],
  providers: [CircuitsService,
    { provide: Storage, useValue: localStorage }, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})



export class AppModule {
  constructor(private translate: TranslateService) {

    this.setAppLanguage()
  }

  setAppLanguage() {
    this.translate.setDefaultLang('es') //Set español como lengua predefinida
    this.translate.use('es')

    //this.translate.use(this.translate.getBrowserLang()!)
  }
}
