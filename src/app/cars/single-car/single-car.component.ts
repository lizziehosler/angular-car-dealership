import { UserService } from './../../shared/services/user.service';
import { User } from './../../shared/models/user';
import { map, timestamp } from 'rxjs/operators';
import { Dealership } from './../../shared/models/dealership';
import { Car } from './../../shared/models/car';
import { CarService } from './../../shared/services/car.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-single-car',
  templateUrl: './single-car.component.html',
  styleUrls: ['./single-car.component.scss']
})
export class SingleCarComponent implements OnInit, OnDestroy {
  car: Car
  carImg: string
  dealership: Dealership
  currentUser: User
  private subs = new Subscription()
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private carService: CarService,
    private userService: UserService
  ) {
    this.currentUser = this.userService.currentUserValue
  }

  ngOnInit(): void {
    this.route.params.subscribe(car => {
      if (car && car.id) {
        debugger
        this.retrieveCarById(car.id)
      }

    })
  }
  retrieveCarById(id: number) {
    const params = { id: id }
    console.log(params);
    debugger
    this.subs.add(
      this.carService.getCarById(params).subscribe(data => {
        if (data && data.car && data.dealership) {
          this.car = new Car(data.car)
          this.carImg = this.car.image
          this.dealership = data.dealership
        }
      }, error => {
        if (error) {
          console.log(error)
        }
      })
    )

  }

  setDefaultPic() {

  }

  editCar() {

  }

  deleteCar() {

  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}