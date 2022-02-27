import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircuitDetailComponent } from './components/circuit-detail/circuit-detail.component';
import { CircuitsCatalogueComponent } from './components/circuits-catalogue/circuits-catalogue.component';
import { ConstructorDetailComponent } from './components/constructor-detail/constructor-detail.component';
import { ConstructorsCatalogueComponent } from './components/constructors-catalogue/constructors-catalogue.component';
import { DriverDetailComponent } from './components/driver-detail/driver-detail.component';
import { DriversCatalogueComponent } from './components/drivers-catalogue/drivers-catalogue.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SeasonsComponent } from './components/seasons/seasons.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'circuitsCatalogue', canActivate: [AuthGuard], component: CircuitsCatalogueComponent},
  { path: 'circuitsCatalogue/:id', canActivate: [AuthGuard], component: CircuitDetailComponent},
  { path: 'driversCatalogue', canActivate: [AuthGuard], component: DriversCatalogueComponent},
  { path: 'driversCatalogue/:id', canActivate: [AuthGuard], component: DriverDetailComponent},
  { path: 'constructorsCatalogue', canActivate: [AuthGuard], component: ConstructorsCatalogueComponent},
  { path: 'constructorsCatalogue/:id', canActivate: [AuthGuard], component: ConstructorDetailComponent},
  { path: 'seasons', canActivate: [AuthGuard], component: SeasonsComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
