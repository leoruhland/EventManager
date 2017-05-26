import { Component } from '@angular/core';
import { 
  IonicPage,
  Loading,
  NavController,
   LoadingController,
    AlertController, NavParams } from 'ionic-angular';
    
 import { FormBuilder, Validators, FormGroup } from '@angular/forms';
 import { EmailValidator } from '../../validators/email';
 import { AuthProvider } from '../../providers/auth/auth';
 import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage(
  {
    name: 'login'
  }
)
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm:FormGroup;
  public loading:Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public loadingCtrl: LoadingController, public alertCtrl: AlertController,
      public authProvider: AuthProvider, public formBuilder: FormBuilder) {

        this.loginForm = formBuilder.group({
         email: ['', Validators.compose([Validators.required, 
           EmailValidator.isValid])],
             password: ['', Validators.compose([Validators.minLength(6), 
                        Validators.required])]
    });
  }
  /**
   * functions
   */
  loginUser(): void {
    if (!this.loginForm.valid) {
      
      console.log(this.loginForm.value);
    
  } else {
      this.authProvider.loginUser(this.loginForm.value.email,
        this.loginForm.value.password).then(
          authData => {
            this.loading.dismiss().then( () => {
              this.navCtrl.setRoot(HomePage);
            });
          }, error => {
            this.loading.dismiss().then( () => {
              let alert = this.alertCtrl.create({
                message: error.message,
                buttons: [
                  {
                    text: "OK",
                    role: 'cancel'
                  }
                ]

              });
              alert.present();
            });
          });
          this.loading = this.loadingCtrl.create();
          this.loading.present();
    }
  }

  goToSignup(): void { 
    this.navCtrl.push('signup'); 
  }

  
  goToResetPassword(): void { 
    this.navCtrl.push('reset-password'); 
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
