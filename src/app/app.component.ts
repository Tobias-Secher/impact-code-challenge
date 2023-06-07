import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Beer } from 'brewdog-js';
import { ImpactBrewsApiService } from './shared/services/impact-brews-api.service';
import { IBeerRequest } from './models/beerRequest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  service: ImpactBrewsApiService = inject(ImpactBrewsApiService);
  title = 'impact-brews';

  constructor() {
    console.log('ENTER');

    // this.bootstrapBeers()
  }

  async bootstrapBeers() {
    const beers = new Beer();
    const map: IBeerRequest[] = await (
      await beers.all()
    ).map((beer) => {
      return {
        abv: beer.abv,
        description: beer.description,
        name: beer.name,
        ibu: beer.ibu,
        ph: beer.ph,
        image_url: beer.image_url,
      };
    });
    console.log(map);
    map.forEach(async (b) => {
      await this.service.addBeer(b);
    });
  }
}
