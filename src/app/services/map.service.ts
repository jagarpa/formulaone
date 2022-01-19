import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl'

@Injectable({
  providedIn: 'root'
})

export class MapService {

  mapbox = (mapboxgl as typeof mapboxgl);
  map?: mapboxgl.Map;
  style = `mapbox://styles/mapbox/satellite-v9`;
  // Coordenadas de la localización donde queremos centrar el mapa
  zoom = 14.25;
  constructor() {
    // Asignamos el token desde las variables de entorno
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  buildMap(lat: number,lng: number) {
    console.log(lat)
    console.log(lng)
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [lng, lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());
    }
}
