import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventProvider {

  constructor(public http: Http) {
    console.log('Hello EventProvider Provider');
  }

  createEvent(eventName: string, eventDate: string, eventPrice: number,
      eventCost: number): firebase.Promise<any> {
        /**
         * This function creates new event in the database
         * First it gets the user id using the firebase auth() service
         * Then use .push and eventList node so firebase would append new obj to this list
         * and auto generate a random ID to prevent two objects from having the same ID
         * @param Event details Mixed
         * @return Promise
         */
        return firebase.database().ref("userProfile/${firebase.auth().currentUser.uid}/eventList").push({
          name: eventName,
          date: eventDate,
          price: eventPrice * 1,
          cost: eventCost * 1,
        });
      }

      getEventList(): Promise<any> {
        /**
         * This method gets the event list from firebase
         * @return Array as a Promise
         * @param Nil
         */
        return new Promise((resolve, reject) => {
          firebase.database().ref('userProfile/${firebase.auth().currentUser.uid}/eventList').on('value', 
            snapshot => {
              let rawList =[];
              snapshot.forEach( snap => {
                rawList.push({
                  id: snap.key,
                  name: snap.val().name,
                  price: snap.val().price,
                  date: snap.val().date,
                });
                return false
              });
              resolve(rawList);
            });
        });
      }

      getEventDetails(eventId): Promise<any> {
        return new Promise((resolve, reject) => {
          firebase.database().ref('userProfile/${firebase.auth().currentUser.uid}/eventList')
          .child(eventId).on('value', snapshot => {
                resolve({
                  id: snapshot.key,
                  name: snapshot.val().name,
                  date: snapshot.val().date,
                  price: snapshot.val().price,
                  cost: snapshot.val().cost,
                  revenue: snapshot.val().revenue
                });
              });
            });
}

}
