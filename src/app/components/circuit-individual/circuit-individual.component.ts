import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ICircuit } from 'src/app/interfaces/icircuit';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-circuit-individual',
  templateUrl: './circuit-individual.component.html',
  styleUrls: ['./circuit-individual.component.css'],
})
export class CircuitIndividualComponent implements OnInit {
  /* @Input */
  @Input() c: ICircuit | undefined;

  like: boolean = false;

  faHeart = faHeart;

  constructor(private router: Router, private firebase: FirebaseService) {}

  ngOnInit(): void {
  }

  circuitDetails(id: string) {
    /* Cridar a una ruta per codi */
    this.router.navigate(['/circuitsCatalogue', id]);
  }

}
