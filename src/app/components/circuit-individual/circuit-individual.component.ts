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

  @Input() c: ICircuit | undefined;
  like: boolean = false;

  faHeart = faHeart;

  constructor(private router: Router, private firebase: FirebaseService) {}

  ngOnChanges(): void {
    this.checkLike()
  }

  ngOnInit(): void {
  }

  checkLike() {
    this.firebase.getCircuitLikes("20452214Q", this.c?.circuitId).subscribe((e) => {
      e.map((elemento: string | undefined) => {
        if (this.c?.circuitId === elemento) {
          this.c!.like = true;
        }
      })
    })
  }



  circuitDetails(id: string) {
    this.router.navigate(['/circuitsCatalogue', id]);
  }

}
