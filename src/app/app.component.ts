import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgZone } from '@angular/core';

import { HomePage } from '../pages/home/home';

import firebase from 'firebase';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  zone:NgZone;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.zone = new NgZone({});

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        this.zone.run( () => {
          if (!user) {
            this.rootPage = 'login';
            unsubscribe();
          } else { 
            this.rootPage = HomePage;
            unsubscribe();
          }
        });     
      });

    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
