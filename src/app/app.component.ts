import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { auth } from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth) {
   
  const authObserver = afAuth.authState.subscribe(user => {
    if(user){
      this.rootPage =TabsPage;
    }else{
      this.rootPage = LoginPage;
    }
    authObserver.unsubscribe();
  })
  platform.ready().then(() => {
    
    statusBar.styleDefault();
    splashScreen.hide();
  });
  }
}
