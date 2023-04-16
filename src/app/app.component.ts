import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import { Feature } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { ZoomToExtent, defaults as defaultControls } from 'ol/control.js';
import { Style, Fill, Stroke } from 'ol/style';

import { DropdownService } from './services/dropdown.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  map: Map;
  view: View;
  dropdownData: any;
  selectedGraveyard: string;
  graveyardList: any[];
  graveyards: { label: any; value: any }[];
  graveyardData: string;
  styles = {};

  constructor(private dropdownService: DropdownService) {}

  ngOnInit(): void {
    this.graveyardData = this.dropdownService.geojsonUrl;

    this.view = new View({
      center: [769185.7564, 6566132.7095],
      zoom: 13,
    });

    this.map = new Map({
      controls: defaultControls().extend([
        new ZoomToExtent({
          extent: [759482.3629, 6570228.7807, 779222.0696, 6561282.0072],
        }),
      ]),
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            url: this.graveyardData,
            format: new GeoJSON(),
          }),
        }),
      ],
      view: this.view,
    });

    this.dropdownService.getDropdownData().subscribe((data) => {
      this.dropdownData = data;

      // Extract a list of unique graveyards from the geojson data
      const features = new GeoJSON().readFeatures(this.dropdownData);
      const graveyardsSet = new Set();
      features.forEach((feature) => {
        graveyardsSet.add(feature.get('friedhof'));
      });

      features.forEach((feature: Feature) => {
        const grabstatus = feature.get('grabstatus');
        if (!this.styles[grabstatus]) {
          const color = '#' + Math.floor(Math.random() * 16777215).toString(16); // Generate random color
          this.styles[grabstatus] = new Style({
            fill: new Fill({ color }),
            stroke: new Stroke({ color: '#333', width: 1 }),
          });
        }
        feature.setStyle(this.styles[grabstatus]);
      });

      const vectorSource = new VectorSource({
        features,
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });
      this.map.addLayer(vectorLayer);

      this.graveyardList = Array.from(graveyardsSet);
      console.log(this.graveyardList);

      // Create an array of objects with 'label' and 'value' properties for use in the dropdown
      this.graveyards = this.graveyardList.map((graveyard) => {
        return { label: graveyard, value: graveyard };
      });

      // Add a change listener to the dropdown to zoom to the selected graveyard's extent
      const select = document.getElementById(
        'graveyard-select'
      ) as HTMLSelectElement;
      select.addEventListener('change', (event) => {
        console.log(event);
        const selectedGraveyard = (event.target as HTMLSelectElement).value;
        const extent = this.getExtentForGraveyard(selectedGraveyard);
        this.view.fit(extent, { duration: 1000, maxZoom: 18 });
      });
    });

    // const vectorLayer = new VectorLayer({
    //   source: new VectorSource({
    //     features: new GeoJSON().readFeatures(this.dropdownData)
    //   }),
    //   style: this.dropdownService.getGraveStyleFunction()
    // });
  }

  // Get the extent for a given graveyard name
  getExtentForGraveyard(graveyardName: string): number[] {
    const extent = [Infinity, Infinity, -Infinity, -Infinity];
    const features = new GeoJSON().readFeatures(this.dropdownData);
    features.forEach((feature) => {
      if (feature.get('friedhof') === graveyardName) {
        const geometry = feature.getGeometry();
        geometry.getExtent(extent);
        //console.log(geometry);
      }
    });
    return extent;
  }
}

/* this.dropdownData
      .getSource()
      .getFeatures()
      .map((feature) => {
        let r = Math.round(Math.random() * 255);
        let g = Math.round(Math.random() * 255);
        let b = Math.round(Math.random() * 255);
        feature.setStyle(
          new Style({
            fill: new Fill({
              color: `rgba(${r}, ${g}, ${b}, .7)`,
            }),
            stroke: new Stroke({
              color: `rgb(${r}, ${g}, ${b})`,
            }),
          })
        );
      }); */
