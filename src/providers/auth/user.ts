import { sangue } from "./sangue";

export class User {
    key:string;
    email: string;
    password: string;
    userAcess:String = "usuarioComum";
    numeroRegistro:Int32Array;
    nome:string;
    grupoSanguineo:String;
    fatorRh:boolean;
    sangue:sangue;
  }