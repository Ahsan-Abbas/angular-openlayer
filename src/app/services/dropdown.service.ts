import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Style, Fill, Stroke } from 'ol/style';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  geojsonUrl = 'assets/data/test_data1.geojson';
  geojsonData: any;

  constructor(private http: HttpClient) { }

  getDropdownData() {
    return this.http.get(this.geojsonUrl);
  }

  // Style graves based on grabstatus
  getGraveStyleFunction() {
    this.geojsonData = this.getDropdownData();
    console.log(this.geojsonData);
    const grabstatusValues = [
      ...new Set(
        this.geojsonData.features.map(
          (feature) => feature.properties.grabstatus
        )
      ),
    ];
    const styles: { [key: string]: Style } = {};
    grabstatusValues.forEach((value: string) => {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.6)`;
      styles[value] = new Style({
        fill: new Fill({ color }),
        stroke: new Stroke({ color: '#333', width: 1 }),
      });
    });
    return (feature, resolution) => styles[feature.get('grabstatus')];
  }
}
