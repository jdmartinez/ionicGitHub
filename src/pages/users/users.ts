import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { User } from '../../models/user';
import { UserDetailsPage } from '../user-details/user-details';

import { GithubUsers } from '../../providers/github-users';

/*
  Generated class for the Users page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class Users {

  users: User[];
  cachedUsers: User[];

  constructor(public navCtrl: NavController, private githubUsers: GithubUsers) {
    githubUsers.load().subscribe(users => {
      console.log(users);
      this.users = users;
      this.cachedUsers = users;
    })
  }

  // User details
  goToDetails(login: string) {
    this.navCtrl.push(UserDetailsPage, {login});
  }

  // User search
  search(searchEvent) {
    let term = searchEvent.target.value
    // Search only if we have 3+ characters
    if (term === null || term === undefined) {
      this.users = this.cachedUsers;
    } else if (term.trim() === "" || term.trim().length < 3) {
        // load cached users
        console.log("clearing users");
        this.users = this.cachedUsers;
    } else {
      this.githubUsers
        .searchUsers(term)
        .subscribe(users => {
            this.users = users;
            console.log(users);
        });
    }
  }

}
