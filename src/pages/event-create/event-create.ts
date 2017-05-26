import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';

/**
 * Generated class for the EventCreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage(
  {
    name: 'event-create'
  }
)
@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html',
})
export class EventCreatePage {

  constructor(public navCtrl: NavController, public eventProvider: EventProvider, public loadingCtrl: LoadingController, public navParams: NavParams) {

  }

  createEvent(eventName: string, eventDate: string, eventPrice: number,
        eventCost: number) {
          /** 
           * This method gets data from the create event form and save to the Database
           * It call the "createEvent" method in the EventPRovider class
           */
          let loader = this.loadingCtrl.create({
            content: "Creating..."
          });
            loader.present();
          this.eventProvider.createEvent(eventName, eventDate, eventPrice, eventCost).then( newEvent => {
            loader.dismiss();
            // redirect user to homepage to guard against multiple click
            this.navCtrl.pop();
          });
        }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventCreatePage');
  }

}
