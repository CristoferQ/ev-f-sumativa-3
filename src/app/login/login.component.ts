import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarios = null;

  formulario1 = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.compose([Validators.required]))
  })
  constructor(private usuariosService: UsuariosService, private router: Router){}

  ngOnInit(): void {
    this.usuarios = this.usuariosService.listar();
  }

  login(){
    var error = document.getElementById('error').style.display = ('none')
    let emailEncontrado = this.usuarios.find(o => o.email === this.formulario1.value.email);
    let passwordEncontrado = this.usuarios.find(o => o.password === this.formulario1.value.password);
    if (emailEncontrado != null && passwordEncontrado != null){
      this.router.navigateByUrl('/productos');
    }else{
      var error = document.getElementById('error').style.display = ('')
    }
  }
}
