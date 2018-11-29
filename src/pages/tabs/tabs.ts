import { AngularFireAuth  } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController,ToastController, Tabs, Item  } from 'ionic-angular';

import { CadastroPage } from '../cadastro/cadastro';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { HfuncPage } from '../hfunc/hfunc';
import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from 'rxjs/Observable';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  usuarios: Observable<any>;
  AdminTabs:boolean;
  funcionarioTabs:boolean;
  userDefault:boolean; 

  tab1Root = HomePage;
  tab2Root = CadastroPage;
  tab3Root = ContactPage;
  tab4Root = LoginPage;
  tab5Root = HfuncPage;

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthProvider,
    public afAuth: AngularFireAuth,
    private databaseProvider:DatabaseProvider){
      const authObserver = afAuth.authState.subscribe(user => {
        if(user){
          this.busca(user.email);
          this.usuarios.subscribe(d=>{
           d.forEach(element => {
            this.Acesso(element.userAcess);
           }
           );
          })
        }else{
          this.navCtrl.setRoot(LoginPage);
        }
        authObserver.unsubscribe();
      })
     }
  public Acesso(String){
    if(String == "admin"){
      this.AdminTabs = true;
      this.funcionarioTabs = false;
      this.userDefault = false;
    }else if(String == "profSaude"){
      this.AdminTabs = false;
      this.funcionarioTabs = true;
      this.userDefault = false;
    }
    else{
      this.AdminTabs = false;
      this.funcionarioTabs = false;
      this.userDefault = true;
    }
  }
  public signOut() {
    this.authService.signOut()
      .then(() => {
        this.navCtrl.setRoot(LoginPage);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  busca(busca:string){
    this.usuarios = this.databaseProvider.getAll(busca,'email');
  }

}
