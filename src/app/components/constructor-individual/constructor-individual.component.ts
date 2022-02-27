import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iconstructor } from 'src/app/interfaces/iconstructor';

@Component({
  selector: 'app-constructor-individual',
  templateUrl: './constructor-individual.component.html',
  styleUrls: ['./constructor-individual.component.css']
})
export class ConstructorIndividualComponent implements OnInit {

  @Input() t: Iconstructor | undefined;
  like: boolean = false;
  checkwinner: string = ""
  raceWinners: string[] = ["alfa", "alphatauri", "alpine", "benetton", "bmw_sauber", "brabham", "brawn", "brm", "cooper", "eagle", "epperly", "ferrari", "hesketh", "honda", "jordan", "kurtis_kraft", "ligier", "lotus", "march", "maserati", "matra", "mclaren", "mercedes", "penske", "porsche", "racing_point", "redbull", "renault", "shadow", "stewart", "toro_rosso", "tyrrell", "vanwall", "watson", "williams", "wolf"]
  worldChampions: string[] = ["benetton", "brabham", "brawn", "brm", "cooper", "ferrari", "lotus", "matra", "mclaren", "matra", "mercedes", "redbull", "renault", "tyrrell", "vanwall", "williams"]
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkWinnerKind(this.t?.constructorId!)
  }

  constructorDetails(id: string) {
/* Cridar a una ruta per codi */
    this.router.navigate(['/constructorsCatalogue', id])
  }

  checkWinner(id: string) {
    if (this.worldChampions.includes(id)) return "world-champion"
    else if (this.raceWinners.includes(id)) return "race-winner"
    else return "bg-white"
  }

  checkWinnerKind(id: string) {
    if (this.worldChampions.includes(id)) {
      this.checkwinner = "F1 WORLD CHAMPION";
      return true
    }
    else if (this.raceWinners.includes(id)) {
      this.checkwinner = "F1 RACE CHAMPION"
      return true
    }
    else return false
  }

}
