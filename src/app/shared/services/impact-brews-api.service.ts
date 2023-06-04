import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IBeer } from 'src/app/models/beer';

@Injectable({
  providedIn: 'root',
})
export class ImpactBrewsApiService {
  readonly perPageKey = 'per_page';

  constructor(private http: HttpClient) {}

  /**
   *
   * @param limit defaults to 100
   * @returns list of beers with a limit
   */
  getBeers(limit?: number) {
    return this.http.get<IBeer[]>(`${environment.apiUrl}/beers`, {
      params: new HttpParams().append(this.perPageKey, limit ?? 100),
    });
  }
}
