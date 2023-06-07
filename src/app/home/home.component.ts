import { Component } from '@angular/core';
import { ImpactBrewsApiService } from '../shared/services/impact-brews-api.service';
import { IBeer } from '../models/beer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  beers$: Promise<IBeer[]>;

  constructor(private impactBrewsApiService: ImpactBrewsApiService) {
    this.beers$ = this.impactBrewsApiService.getBeers(10);
  }
}
