import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICircuit } from 'src/app/interfaces/icircuit';
import { CircuitsService } from 'src/app/services/circuits.service';
import { MapService } from 'src/app/services/map.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  circuit: any[] = []
  id!: string;
  long!: string;
  lat!: string;


  constructor(private activatedRoute: ActivatedRoute, private circuitService: CircuitsService, private map: MapService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.circuitService.getCircuitById(this.id).subscribe((response) => {
        response.map((element: ICircuit) => {
        this.long = element.Location.long;
        this.lat = element.Location.lat
        this.map.buildMap(parseFloat(element.Location.lat), parseFloat(element.Location.long), environment.mapStyleSatellite)
      })
    })
  }

  cambiarVista(valor: string) {
    switch (valor) {
      case "dark":
        this.map.buildMap(parseFloat(this.lat), parseFloat(this.long), environment.mapStyleDark)
        break;
      case "satellite":
        this.map.buildMap(parseFloat(this.lat), parseFloat(this.long), environment.mapStyleSatellite)
        break;
      default:
        break;
    }
  }



}
