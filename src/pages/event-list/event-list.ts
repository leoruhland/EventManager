import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
/**
 * Generated class for the EventListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: "event-list"
})
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {
  public eventList: Array<any>;

  constructor(public navCtrl: NavController, public eventProvider: EventProvider, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    /**
     * this method gets the eventList from firebase through the list provider
     * and then saving it to the array eventList declared above
     * @return Array
     */
    this.eventProvider.getEventList().then( eventListSnap => {
      // add to array
      this.eventList = eventListSnap;
    })
  }

  goToEventDetail(eventId) {
    /**
     * Gets the details of a specific event onClick
     * @param int
     * @return 
     */
    this.navCtrl.push('event-detail', {'eventId' : eventId });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventListPage');
  }

}
