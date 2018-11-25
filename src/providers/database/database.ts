import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import 'rxjs/add/operator/map';


@Injectable()
export class DatabaseProvider {

  private PATH = 'usuarios/'
  constructor(private db:AngularFireDatabase) { }
  

   getAll(busca:string,tipoBusca:string) {
    return this.db.list(this.PATH, ref => ref.orderByChild(tipoBusca).equalTo(busca))
      .snapshotChanges()
      .map(changes => {
        return changes.map(u => ({ key: u.payload.key, ...u.payload.val() }));
      })
  }
  get(key:string){
    return this.db.object(this.PATH + key)
    .snapshotChanges().map(user => {
      return {key: user.key, ...user.payload.val()};
    })
  }
  save(user:any){
    return new Promise((resolve, reject) => {
      if (user.key) {
        this.db.list(this.PATH)
          .update(user.key, { 
            email: user.email,
            userAcess: user.userAcess,
            numeroRegistro: user.numeroRegistro,
            nome: user.nome,
            CPF: user.CPF,
            grupoSanguineo:user.grupoSanguineo,
            fatorRh:user.fatorRh,
            NumeroAmostra:user.NumeroAmostra,
            material:user.material,
            dataColeta:user.dataColeta,
            reagenteSifilis:user.reagenteSifilis,
            reagenteVR:user.reagenteVR,
            reagenteChagas:user.reagenteChagas,
            reagenteHiv:user.reagenteHiv,
            reagenteHtlv:user.reagenteHtlv,
          })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ 
            email: user.email,
            userAcess: user.userAcess,
            numeroRegistro: user.numeroRegistro,
            nome: user.nome,
            CPF: user.CPF,
            grupoSanguineo:user.grupoSanguineo,
            fatorRh:user.fatorRh,
            NumeroAmostra:user.NumeroAmostra,
            material:user.material,
            dataColeta:user.dataColeta,
            reagenteSifilis:user.reagenteSifilis,
            reagenteVR:user.reagenteVR,
            reagenteChagas:user.reagenteChagas,
            reagenteHiv:user.reagenteHiv,
            reagenteHtlv:user.reagenteHtlv,
            })
          .then(() => resolve());
      }
    })
  }
  remove(key:string){
    return this.db.list(this.PATH).remove(key);
  }
}
