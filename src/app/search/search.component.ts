import { Component, OnInit } from '@angular/core';
import { ImpactBrewsApiService } from '../shared/services/impact-brews-api.service';
import { IBeer } from '../models/beer';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  beers: IBeer[];

  searchForm: FormGroup;
  querySearch: string | undefined;

  constructor(
    private impactBrewsApiService: ImpactBrewsApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.querySearch = this.activatedRoute.snapshot.queryParams['q'];
    this.beers = [];

    this.searchForm = new FormGroup(
      {
        searchTerm: new FormControl(this.querySearch ?? ''),
      },
      { updateOn: 'change' }
    );
  }

  ngOnInit(): void {
    this.initialSearch(this.querySearch);
    this.searchForm
      .get('searchTerm')!
      .valueChanges.pipe(debounceTime(400))
      .subscribe(async (res) => {
        await this.search(res);
      });
  }

  async initialSearch(query: string | undefined) {
    if (query) {
      this.beers = await this.impactBrewsApiService.searchBeers(query);
    }
  }

  async search(text: string) {
    this.beers = await this.impactBrewsApiService.searchBeers(text);
  }
}
