import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.css']
})
export class EnviosComponent implements OnInit {
  formulario1 = new FormGroup({
    pais: new FormControl('', Validators.required),
    calle: new FormControl('', Validators.compose([Validators.required])),
    ciudad: new FormControl('', Validators.compose([Validators.required])),
    region: new FormControl('', Validators.compose([Validators.required])),
    codigo_postal: new FormControl('', Validators.compose([Validators.required]))
  })
  
  productosCarrito = [];
  datos_envio = [];
  constructor(private location:Location, private router: Router) { }

  ngOnInit(): void {
    let data = this.location.getState();
    this.productosCarrito = data['productosCarrito'];
  }
  Enviar(){
    this.datos_envio.push({pais: this.formulario1.value.pais, calle: this.formulario1.value.calle, ciudad: this.formulario1.value.ciudad, region: this.formulario1.value.region, codigo_postal: this.formulario1.value.codigo_postal});
    this.router.navigateByUrl('/pagos', { state: { productosCarrito: this.productosCarrito, datos_envio: this.datos_envio} });

  }

}
