import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  formulario1 = new FormGroup({
    tipo_de_tarjeta: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.compose([Validators.required])),
    numero: new FormControl('', Validators.compose([Validators.required])),
    codigo: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
    mes: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(2)])),
    agno: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)]))
  })
  productosCarrito = [];
  datos_envio = [];
  datos_pago = []
  constructor(private location:Location) { }

  ngOnInit(): void {
    let data = this.location.getState();
    this.productosCarrito = data['productosCarrito'];
    this.datos_envio = data['datos_envio'];
  }
  Pagar(){
    this.datos_pago.push({tipo_de_tarjeta: this.formulario1.value.tipo_de_tarjeta, nombre: this.formulario1.value.nombre, numero: this.formulario1.value.numero, codigo: this.formulario1.value.codigo, mes: this.formulario1.value.mes, agno: this.formulario1.value.agno});
  }

}
