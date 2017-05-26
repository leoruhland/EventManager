import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  /**
   * Go to user profile
   */
  goToProfile() {
    this.navCtrl.push('profile');
  }

  goToCreate() {
    /**
     * Takes user to create event page
     */
    this.navCtrl.push('event-create');
  }

  goToList() {
    /**
     * Takes user to event List page
     */
    this.navCtrl.push('event-list');
  }

}
