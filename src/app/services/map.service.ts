import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl'

@Injectable({
  providedIn: 'root'
})

export class MapService {

  mapbox = (mapboxgl as typeof mapboxgl);
  map?: mapboxgl.Map;
  style = environment.mapStyleSatellite;
  // Coordenadas de la localización donde queremos centrar el mapa
  zoom = 14.25;

  constructor() {
    // Asignamos el token desde las variables de entorno
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  buildMap(lat: number,lng: number, mapStyle: string) {
    this.map?.remove() //Eliminamos la instancia de mapa si ya está creada
    this.map = new mapboxgl.Map({ //Creamos nueva instancia de mapa
      container: 'map',
      style: mapStyle,
      zoom: this.zoom,
      center: [lng, lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());
    }
}
