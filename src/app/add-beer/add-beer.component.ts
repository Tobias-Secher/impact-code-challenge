import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImpactBrewsApiService } from '../shared/services/impact-brews-api.service';

@Component({
  selector: 'app-add-beer',
  templateUrl: './add-beer.component.html',
  styleUrls: ['./add-beer.component.scss'],
})
export class AddBeerComponent {
  beerForm: FormGroup;

  constructor(private service: ImpactBrewsApiService) {
    this.beerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      tagline: new FormControl(null, [Validators.required]),
      abv: new FormControl(null, [Validators.required]),
      ibu: new FormControl(null, [Validators.required]),
      ph: new FormControl(null, [Validators.required]),
      firstBrewed: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  submit() {
    if (this.beerForm.valid) {
      console.log('valid', this.beerForm);
      this.service.addBeer({
        name: this.controlValue('name'),
        abv: this.controlValue('abv'),
        ibu: this.controlValue('ibu'),
        ph: this.controlValue('ph'),
        description: this.controlValue('description'),
        image_url: '',
        tagline: this.controlValue('tagline'),
      });
    }
  }

  private controlValue(controlName: string) {
    return this.beerForm.get(controlName)!.value;
  }

  controlHasError(controlName: string) {
    const control = this.beerForm.get(controlName);
    return control?.touched && control.invalid;
  }

  get formInvalid() {
    return !this.beerForm.valid;
  }
}
