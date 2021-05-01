import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  usuarios: Usuario[] = []

  constructor() {}
  listar(){
    return this.usuarios = [
      {email: "test@everis.cl", password: "123"}
    ];
  }
}
class Usuario{
  constructor(public email:string, public password:string){}
}