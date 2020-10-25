import { Car } from './../../shared/models/car';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent implements OnInit, OnChanges {
  @Input() car: Car
  carImg: string
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.car) {
      this.carImg = this.car.image
    }
  }

  setDefaultPic() {
    this.carImg = 'assets/images/car-placeholder.svg'
  }

}
