//import { CouchdbProvider } from './../providers/couchdb/couchdb';
import { Home2Page } from './../pages/home2/home2';
import { LoginPage } from './../pages/login/login';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor( platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then((data) => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log(data);
      //this.couchservice.get();
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

