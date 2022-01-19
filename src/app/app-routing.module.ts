import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircuitDetailComponent } from './components/circuit-detail/circuit-detail.component';
import { CircuitIndividualComponent } from './components/circuit-individual/circuit-individual.component';
import { CircuitsCatalogueComponent } from './components/circuits-catalogue/circuits-catalogue.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'circuitsCatalogue', component: CircuitsCatalogueComponent},
  { path: 'circuitsCatalogue/:id', component: CircuitDetailComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
