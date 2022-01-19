import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICircuit } from 'src/app/interfaces/icircuit';

@Component({
  selector: 'app-circuit-individual',
  templateUrl: './circuit-individual.component.html',
  styleUrls: ['./circuit-individual.component.css']
})


export class CircuitIndividualComponent implements OnInit {

  @Input() c: ICircuit | undefined;

  constructor( private router: Router) { }

  ngOnInit(): void {

  }

  circuitDetails(id: string) {
    this.router.navigate(['/circuitsCatalogue', id]);
  }

}
