import { Component } from '@angular/core';
import { ImpactBrewsApiService } from '../shared/services/impact-brews-api.service';
import { IBeer } from '../models/beer';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  beers$: Promise<IBeer[]>;
  searchForm: FormGroup;

  constructor(
    private impactBrewsApiService: ImpactBrewsApiService,
    private router: Router
  ) {
    this.beers$ = this.impactBrewsApiService.getBeers(10);
    this.searchForm = new FormGroup({
      searchTerm: new FormControl(),
    });
  }

  searchSubmit() {
    this.router.navigate(['/search'], {
      queryParams: {
        q: this.searchForm.get('searchTerm')?.value,
      },
    });
  }
}
