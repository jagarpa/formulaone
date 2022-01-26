import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
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
    RegisterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //Get data from server API
    FormsModule,
    FontAwesomeModule
  ],
  providers: [CircuitsService, {provide: Storage, useValue: localStorage}],
  bootstrap: [AppComponent]
})
export class AppModule { }
