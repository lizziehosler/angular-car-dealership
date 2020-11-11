import { Dealership } from './../../shared/models/dealership';
import { DealershipService } from './../../dealership.service';
import { UserService } from './../../shared/services/user.service';
import { User } from './../../shared/models/user';
import { map, timestamp } from 'rxjs/operators';
import { Car } from './../../shared/models/car';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-single-dealership',
  templateUrl: './single-dealership.component.html',
  styleUrls: ['./single-dealership.component.scss']
})
export class SingleDealershipComponent implements OnInit, OnDestroy {
  dealership: Dealership
  dealerImg: string
  currentUser: User
  private subs = new Subscription()
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dealershipService: DealershipService,
    private userService: UserService
  ) {
    this.currentUser = this.userService.currentUserValue
  }

  ngOnInit(): void {
    this.route.params.subscribe(dealership => {
      if (dealership && dealership.id) {
        this.retrieveDealershipById(dealership.id)
      }

    })
  }
  retrieveDealershipById(id: number) {
    const params = { id: id }
    console.log(params);
    this.subs.add(
      this.dealershipService.getDealershipById(params).subscribe(data => {
        if (data) {
          this.dealership = new Dealership(data)
          this.dealerImg = this.dealership.image
          // this.dealership = data.dealership
        }
      }, error => {
        if (error) {
          console.log(error)
        }
      })
    )
  }

  setDefaultPic() {
    this.dealerImg = 'assets/images/logo-placeholder.jpeg'

  }

  routeToViewCars() {

  }

  editDealership() {

  }

  deleteDealership() {

  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
