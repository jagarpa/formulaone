import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICircuit } from 'src/app/interfaces/icircuit';
import { CircuitsService } from 'src/app/services/circuits.service';

@Component({
  selector: 'app-circuit-detail',
  templateUrl: './circuit-detail.component.html',
  styleUrls: ['./circuit-detail.component.css']
})

export class CircuitDetailComponent implements OnInit {

  circuit: ICircuit[] = []
  id!: string;

  constructor(private activatedRoute: ActivatedRoute, private circuitService: CircuitsService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.circuitService.getCircuitById(this.id).subscribe((response) => {
        response.map((element: ICircuit) => {
        this.circuit.push(element)
        console.log(element.Location)
      })
    })
  }

  ngOnDestroy(): void {
    alert("FUNCIONA")
  }
}
