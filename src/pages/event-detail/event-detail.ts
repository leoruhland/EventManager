import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';

/**
 * Generated class for the EventDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: "event-detail",
  segment: 'event-detail/:eventId'
})
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  public currentEvent: any;
  public guestName: any;
  public guestPicture: any;

  constructor(public navCtrl: NavController, public eventProvider: EventProvider, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    /**
     * this method gets an event details 
     * @return 
     */
    this.eventProvider.getEventDetails(this.navParams.get('eventId')).then ( eventSnap => {
      this.currentEvent = eventSnap;
    })
  }

  addGuest(guestName) {
    this.eventProvider.addGuest(guestName, this.currentEvent.id, this.currentEvent.price, this.guestPicture).then(() =>
    { this.guestName = ''; }).then( event => {
        this.navCtrl.push('event-detail', {'eventId': this.currentEvent.id});
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

}
