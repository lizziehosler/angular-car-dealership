import { Car } from './../shared/models/car';
import { CarService } from './../shared/services/car.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cars: Car[] = []

  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.retrieveAllCars()
  }

  retrieveAllCars() {
    this.carService.getAllCars().subscribe(cars => {
      if (cars) {
        this.cars = cars
      }
      debugger

    }, error => {
      if (error) {
        console.log(error)
      }
    })
  }

}
