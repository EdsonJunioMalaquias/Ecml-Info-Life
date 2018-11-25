import { Component } from '@angular/core';
import { NavController,NavParams, ToastController } from 'ionic-angular';
import {DatabaseProvider} from './../../providers/database/database';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  usuarios: Observable<any>;
    constructor(public navCtrl: NavController,private databaseProvider:DatabaseProvider,private toastCtrl:ToastController,private alertCtrl: AlertController){
  }

  editContact(user: any) {
    this.navCtrl.push('ContactEditPage', { user: user });
  }
  removeContact(key: string) {
    if (key) {
      this.databaseProvider.remove(key)
        .then(() => {
          this.toastCtrl.create({ message: 'Contato removido sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toastCtrl.create({ message: 'Erro ao remover o contato.', duration: 3000 }).present();
        });
    }
  }
  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Busca de Registros',
      enableBackdropDismiss: true,
      inputs: [
        {
          type:'number',
          name: 'registro',
          placeholder: 'Registro'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          },
        {
          text: 'Confirma',
          role: 'confirma',
          handler: data => {
            this.busca(data.registro);
          }
        },
        
      ]
    });
    alert.present();
  }
  busca(busca:string){
    this.usuarios = this.databaseProvider.getAll(busca,'numeroRegistro');
    
  }
}