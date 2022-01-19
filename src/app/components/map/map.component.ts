import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICircuit } from 'src/app/interfaces/icircuit';
import { CircuitsService } from 'src/app/services/circuits.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  circuit: any[] = []
  id!: string;
  long!: number;
  lat!: number;

  constructor(private activatedRoute: ActivatedRoute, private circuitService: CircuitsService, private map: MapService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.circuitService.getCircuitById(this.id).subscribe((response) => {
        response.map((element: ICircuit) => {
        this.map.buildMap(parseFloat(element.Location.lat), parseFloat(element.Location.long))
      })
    })

  }

}
