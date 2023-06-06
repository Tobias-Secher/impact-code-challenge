import { Component, OnDestroy } from '@angular/core';
import { ImpactBrewsApiService } from '../shared/services/impact-brews-api.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IBeer } from '../models/beer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  beer: IBeer | undefined;

  constructor(
    private service: ImpactBrewsApiService,
    private activatedRoute: ActivatedRoute
  ) {
    this.service
      .getBeer(this.activatedRoute.snapshot.params['id'])
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.beer = res[0];
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
