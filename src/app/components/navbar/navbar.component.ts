import { Subscription } from 'rxjs';
import { User } from './../../shared/models/user';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser: User
  private subs = new Subscription()
  constructor(
    private userService: UserService
  ) {
    this.currentUser = this.userService.currentUserValue
   }

  ngOnInit(): void {
    this.subscribeToCurrentUser()
  }

  subscribeToCurrentUser() {
    this.subs.add(
      this.userService.currentUser.subscribe(user => {
        if (user) {
          this.currentUser = user
        } else {
          this.currentUser = null
        }
      })
    )
  }

  logoutUser() {
    this.userService.logoutUser()
  }

  ngOnDestroy() {
    this.subs.unsubscribe
  }

}
