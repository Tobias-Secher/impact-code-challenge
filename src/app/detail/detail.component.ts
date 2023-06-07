import { Component } from '@angular/core';
import { ImpactBrewsApiService } from '../shared/services/impact-brews-api.service';
import { IBeer } from '../models/beer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  beer$: Promise<IBeer>;

  constructor(
    private service: ImpactBrewsApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.beer$ = this.service.getBeer(
      this.activatedRoute.snapshot.params['id']
    );
  }
}
