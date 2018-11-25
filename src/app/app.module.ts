import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from  '../pages/login/login';
import { HfuncPage } from '../pages/hfunc/hfunc';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { AuthProvider } from '../providers/auth/auth';



import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';

const firebaseConfig = {
  apiKey: "AIzaSyAWUR924M1DNAATH7VWcu1ykRMp3kWvcvc",
  authDomain: "pi04-fa1b8.firebaseapp.com",
  databaseURL: "https://pi04-fa1b8.firebaseio.com",
  projectId: "pi04-fa1b8",
  storageBucket: "pi04-fa1b8.appspot.com",
  messagingSenderId: "1089153629590"
}
@NgModule({
  declarations: [
    MyApp,
    CadastroPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    HfuncPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    HfuncPage,
    CadastroPage
  ],
  providers: [
    
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DatabaseProvider
  ]
  
})
export class AppModule {}
