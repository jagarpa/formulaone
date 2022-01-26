import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICircuit } from 'src/app/interfaces/icircuit';
import { CircuitsService } from 'src/app/services/circuits.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-circuit-detail',
  templateUrl: './circuit-detail.component.html',
  styleUrls: ['./circuit-detail.component.css'],
})
export class CircuitDetailComponent implements OnInit {
  circuit: ICircuit | undefined;
  id: string | undefined;
  like: boolean | undefined;
  buttonMessage: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private circuitService: CircuitsService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.loadCircuit();
  }

  loadCircuit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!; //Recuperamos el Id
    this.firebaseService
      .getCircuitLikes(this.id)
      .subscribe((response) => {
        response.indexOf(this.circuit?.circuitId) > -1
          ? this.buttonLikeToTrue()
          : this.buttonLikeToFalse();
      });
    const hola = this.circuitService
      .getCircuitById(this.id)
      .subscribe((response) => {
        this.circuit = response[0];
      });
  }

  likeCircuit(id: string) {
    this.firebaseService.checkLikeCircuit(id);
    this.like ? this.buttonLikeToFalse() : this.buttonLikeToTrue();
  }

  buttonLikeToFalse() {
    this.like = false;
    this.buttonMessage = 'Añadir este circuito a mi lista de favoritos';
  }

  buttonLikeToTrue() {
    this.like = true;
    this.buttonMessage = 'Eliminar este circuito de mi lista de favoritos';
  }
}
