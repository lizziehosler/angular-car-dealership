import { LocalStorageService } from './../shared/services/local-storage.service';
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
    private carService: CarService,
    private storageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.retrieveAllCars()
    this.setMyEmailInStorage()
  }

  setMyEmailInStorage() {
    this.storageService.setItem('myEmail', 'lizzie.hosler@gmail.com')
  }

  retrieveAllCars() {
    this.carService.getAllCars().subscribe(cars => {
      if (cars) {
        this.cars = cars
      }

    }, error => {
      if (error) {
        console.log(error)
      }
    })
  }

}
