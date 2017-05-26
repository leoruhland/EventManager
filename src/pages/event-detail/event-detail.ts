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

  constructor(public navCtrl: NavController, public eventProvider: EventProvider, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    this.eventProvider.getEventDetails(this.navParams.get('eventId')).then ( eventSnap => {
      this.currentEvent = eventSnap;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

}
