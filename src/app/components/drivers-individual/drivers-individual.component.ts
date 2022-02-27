import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Idriver } from 'src/app/interfaces/idriver';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-drivers-individual',
  templateUrl: './drivers-individual.component.html',
  styleUrls: ['./drivers-individual.component.css']
})
export class DriversIndividualComponent implements OnInit {

  @Input() d: Idriver | undefined;

  constructor(private router: Router, private firebase: FirebaseService) { }

  ngOnInit(): void {
  }

  driverDetails(id: string) {
    /* Cridar a una ruta per codi */
    this.router.navigate(['/driversCatalogue', id]);
  }
}
