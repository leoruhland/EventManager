import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from "firebase";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

  loginUser(email: string, password: string):  firebase.Promise<any>  {
  
    return firebase.auth().signInWithEmailAndPassword(email, password);
  
  }

  /**
   * Creates a new user and copy's teh user's data from the auth module to the database
   */
   signupUser(email: string, password: string): firebase.Promise<any> {
     return firebase.auth().createUserWithEmailAndPassword(email, password).then(
       newUser => {
         firebase.database().ref('/userProfile').child(newUser.uid).set({
           email: email
         });
       });
   }
       /**
        * reset password function
        */
        resetPassword(email: string): firebase.Promise<void> {
          return firebase.auth().sendPasswordResetEmail(email);
        }

        /**
         * User logout function
         */
        logoutUser(): firebase.Promise<void>{
          return firebase.auth().signOut();
        }

}
