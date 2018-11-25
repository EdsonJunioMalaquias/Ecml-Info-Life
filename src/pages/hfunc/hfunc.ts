import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController} from 'ionic-angular';
import {DatabaseProvider} from './../../providers/database/database';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-hfunc',
  templateUrl: 'hfunc.html',
})

export class HfuncPage {
  CPF:number;  
  usuarios: Observable<any>;
  constructor(public navCtrl: NavController,private databaseProvider:DatabaseProvider,
    private toastCtrl:ToastController,
    private alertCtrl: AlertController){
  }
  busca(busca:string){
    this.usuarios = this.databaseProvider.getAll(busca,'CPF');
  }

}
