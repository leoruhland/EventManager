import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase  from 'firebase';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfileProvider {

  constructor(public http: Http) {
    console.log('Hello ProfileProvider Provider');
  }

  /**
   * Display user profile
   */
  getUserProfile(): Promise<any> {
    return new Promise( (resolve, reject) => {
      firebase.database().ref('/userProfile')
        .child(firebase.auth().currentUser.uid)
         .on('value', data => {
           resolve(data.val());
         });
    });
  }

  /**
   * Update User's data
   */
  updateName(firstName: string, lastName: string): firebase.Promise<any>
  {
      return firebase.database().ref('/userProfile')
      .child(firebase.auth().currentUser.uid).update({
        firstName: firstName,
        lastName: lastName,
    });
  }

  /**
   * This updates user date of birth
   */
  updateDOB(birthDate: string): firebase.Promise<any> {
    return firebase.database().ref('/userProfile')
      .child(firebase.auth().currentUser.uid).update({
        birthDate: birthDate,
      });
  }

  /**
   * Update Email
   */
  updateEmail(newEmail: string, password: string): firebase.Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(firebase.auth()
        .currentUser.email, password);

        return firebase.auth().currentUser.reauthenticateWithCredential(credential)
          .then( user => {
            firebase.auth().currentUser.updateEmail(newEmail).then( user => {
              firebase.database().ref('/userProfile')
                .child(firebase.auth().currentUser.uid).update({ email: newEmail
                });
            });
          });
  }

  /**
   * Password update or change to new one
   */
  updatePassword(newPass: string, oldPass: string): firebase.Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(firebase.auth()
                          .currentUser.email, oldPass);

          return firebase.auth().currentUser.reauthenticateWithCredential(credential).then(
                  user => {
                    firebase.auth().currentUser.updatePassword(newPass).then(
                      user => {
                        console.log("Password Changed");
                      }, error => {
                        console.log(error);
                      }
                    );
                  }
          );
  }
}
