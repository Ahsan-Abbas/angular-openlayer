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
}
