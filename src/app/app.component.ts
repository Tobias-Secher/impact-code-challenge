import { Component, inject } from '@angular/core';
import { ImpactBrewsApiService } from './shared/services/impact-brews-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  service: ImpactBrewsApiService = inject(ImpactBrewsApiService);
  title = 'impact-brews';

  constructor() {
    // this.service.bootstrapBeers()
  }
}
