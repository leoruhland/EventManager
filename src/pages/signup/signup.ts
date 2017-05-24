import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,
  Loading, 
  LoadingController, 
  AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: "signup"
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

      this.signupForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required,
        EmailValidator.isValid])],
          password: ['', Validators.compose([Validators.minLength(6),
                          Validators.required])]
      });
  }

  signupUser() {
    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      this.authProvider.signupUser(this.signupForm.value.email, 
                    this.signupForm.value.password)
                    .then( () => {
                      this.loading.dismiss().then( () => {
                        this.navCtrl.setRoot(HomePage);
                    });
    }, (error) => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "OK",
              role: "Cancel"
            }
          ]
        });
        alert.present();
      });
    });
  }
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
