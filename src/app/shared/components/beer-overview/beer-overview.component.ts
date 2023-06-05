import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBeer } from 'src/app/models/beer';

@Component({
  selector: 'app-beer-overview[beers]',
  templateUrl: './beer-overview.component.html',
  styleUrls: ['./beer-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerOverviewComponent {
  @Input()
  beers!: IBeer[];
}
