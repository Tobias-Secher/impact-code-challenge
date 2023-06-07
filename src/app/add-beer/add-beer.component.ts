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
  private file: File | undefined;

  constructor(private service: ImpactBrewsApiService) {
    this.beerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      tagline: new FormControl(null, [Validators.required]),
      abv: new FormControl(null, [Validators.required]),
      ibu: new FormControl(null, [Validators.required]),
      ph: new FormControl(null, [Validators.required]),
      firstBrewed: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      image: new FormControl(null),
    });
  }

  submit() {
    if (this.beerForm.valid && this.file) {
      this.service
        .addBeer(
          {
            name: this.controlValue('name'),
            abv: this.controlValue('abv'),
            ibu: this.controlValue('ibu'),
            ph: this.controlValue('ph'),
            description: this.controlValue('description'),
            image_url: '',
            tagline: this.controlValue('tagline'),
            firstBrewed: this.controlValue('firstBrewed'),
          },
          this.file
        )
        .then(() => this.beerForm.reset());
    }
  }

  private controlValue(controlName: string) {
    return this.beerForm.get(controlName)!.value;
  }

  controlHasError(controlName: string) {
    const control = this.beerForm.get(controlName);
    return control?.touched && control.invalid;
  }

  saveFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.file = files[0];
  }

  get formInvalid() {
    return !this.beerForm.valid || !this.file;
  }
}
