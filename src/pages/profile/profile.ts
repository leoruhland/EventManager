import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { Http } from '@angular/http';


/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: "profile"
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  public birthDate:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public alertCtrl: AlertController, public profileProvider: ProfileProvider,
    public authProvider: AuthProvider, http: Http) {
  }

  ionViewDidEnter() {
    this.profileProvider.getUserProfile().then( profileSnap => {
      this.userProfile = profileSnap;
      this.birthDate = this.userProfile.birthDate;
    });
  }

  /**
   * logout user
   */
  logOut() {
    this.authProvider.logoutUser().then( () => {
        this.navCtrl.setRoot('login');
      });
  }

  updateName(){
  let alert = this.alertCtrl.create({
    message: "Your first name & last name",
    inputs: [
      {
        name: 'firstName',
        placeholder: 'Your first name',
        value: this.userProfile.firstName
      },
      {
        name: 'lastName',
        placeholder: 'Your last name',
        value: this.userProfile.lastName
      },
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.profileProvider.updateName(data.firstName, data.lastName);
        }
      }
    ]
  });
  alert.present();
}

/**
 * Updates teh Date of Birth
 */
updateDOB(birthDate) {
  this.profileProvider.updateDOB(birthDate);
}

/**
 * Updates the user's email
 */
updateEmail() {
  let alert = this.alertCtrl.create({
    inputs: [
      {
        name: 'newEmail',
        placeholder: 'Your new Email',
      },
      {
        name: 'password',
        placeholder: 'Your new Password',
        type: 'password'
      },
    ],
    buttons: [
      {
        text:'Save',
        handler: data => {
          this.profileProvider.updateEmail(data.newEmail, data.password);
        }
      }
    ]
  });
  alert.present();
}

/**
 * update password
 */
updatePassword() {
  let alert = this.alertCtrl.create({
    inputs: [
      {
        name: 'newPassword',
        placeholder: 'Your new Password',
        type: 'password'
      },
      {
        name: 'oldPassword',
        placeholder: 'Your Old Password',
        type: 'password'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',handler: data => {
          this.profileProvider.updatePassword(data.newPassword, data.oldPassword);
        }
      }
    ]
  });
  alert.present();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
