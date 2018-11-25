import { sangue } from './../../providers/auth/sangue';
import { Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';
import {DatabaseProvider} from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  title: string;
  form:FormGroup;
  user: any;
  constructor(
    public navCtrl: NavController,public navParams: NavParams,private formBuilder: FormBuilder,private toastCtrl: ToastController,private authService: AuthProvider,private databaseProvider:DatabaseProvider) {
    this.user= this.navParams.data.user || {};
    this.createForm();
    this.setupPageTitle();
    //this.user = { };
    // this.createForm();

    // if (this.navParams.data.key) {
    //   const subscribe = this.provider.get(this.navParams.data.key).subscribe((c: any) => {
    //     subscribe.unsubscribe();
      // 
    //     this.user = c;
    //     this.createForm();
    //   })
  }
  private setupPageTitle() {
    this.title = this.navParams.data.user ? 'Alterando usuario' : 'Novo usuario';
  }
  createAccount() {
    if (this.form.valid) {
      let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

      this.authService.createUser(this.form.value)
        .then(() => {
          this.onSubmit();
          toast.setMessage('Usuário criado com sucesso.');
          toast.present();
          this.navCtrl.setRoot(TabsPage);

        })
        .catch((error: any) => {
          if (error.code  == 'auth/email-already-in-use') {
            toast.setMessage('O e-mail digitado já está em uso.');
          } else if (error.code  == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code  == 'auth/operation-not-allowed') {
            toast.setMessage('Não está habilitado criar usuários.');
          } else if (error.code  == 'auth/weak-password') {
            toast.setMessage('A senha digitada é muito fraca.');
          }
          toast.present();
        });
    }
  }

  createForm(){
    
    this.form = this.formBuilder.group({
      
      key: [this.user.key],
      email: [this.user.email, Validators.required],
      password: [this.user.password, Validators.required],
      userAcess: [this.user.userAcess, Validators.required],
      numeroRegistro: [this.user.numeroRegistro, Validators.required],
      nome: [this.user.nome, Validators.required],
      CPF: [this.user.CPF, Validators.required],
      grupoSanguineo: [this.user.grupoSanguineo, Validators.required],
      fatorRh: [this.user.fatorRh, Validators.required],
      NumeroAmostra: [this.user.numeroAmostra, Validators.required],
      material: [this.user.material, Validators.required],
      dataColeta: [this.user.dataColeta, Validators.required],
      reagenteSifilis:[this.user.reagenteSifilis],
      reagenteVR: [this.user.reagenteVR],
      reagenteChagas: [this.user.reagenteChagas],
      reagenteHiv: [this.user.reagenteHiv],
      reagenteHtlv: [this.user.reagenteHtlv],
      
      
    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.databaseProvider.save(this.form.value)
        .then(() => {
          this.toastCtrl.create({ message: 'Usuario salvo com sucesso.', duration: 3000 }).present();
        })
        .catch((e) => {
          this.toastCtrl.create({ message: 'Erro ao salvar o usuario.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }


}