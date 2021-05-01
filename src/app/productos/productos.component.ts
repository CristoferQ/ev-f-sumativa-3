import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../productos.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit{
  formulario1 = new FormGroup({
    codigo: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.compose([Validators.required])),
    descripcion: new FormControl('', Validators.compose([Validators.required])),
    precio: new FormControl('', Validators.compose([Validators.required])),
    stock: new FormControl('', Validators.compose([Validators.required]))
  })
  formulario2 = new FormGroup({
    codigo: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.compose([Validators.required])),
    descripcion: new FormControl('', Validators.compose([Validators.required])),
    precio: new FormControl('', Validators.compose([Validators.required])),
    stock: new FormControl('', Validators.compose([Validators.required]))
  })
  codigo_a_editar = null;
  productos = null;
  productosCarrito = [];
  dtOptions1: DataTables.Settings = {};
  dtOptions2: DataTables.Settings = {};
  constructor(private productosService: ProductosService, private router: Router) { }

  ngOnInit(): void {
    this.productos = this.productosService.listarProductos();
    this.dtOptions1 = {
      pageLength: 4,
      scrollX:true,
      ordering:false
    };
    this.dtOptions2 = {
      pageLength: 5,
      ordering:false
    };
  }
  
  comprar(codigo:string){
    let objIndex = this.productos.findIndex((obj => obj.codigo == codigo));
    var alertAñadir = document.getElementById('alertAñadir')
    alertAñadir.style.display = ('')
    alertAñadir.innerHTML = "Se ha añadido: <strong> 1 "+this.productos[objIndex].nombre+"</strong> al carrito de compras"
    setTimeout(function(){ alertAñadir.style.display = ('none')}, 1500);
    if (objIndex != null){
      this.productos[objIndex].stock = this.productos[objIndex].stock-1
      let obj = this.productosCarrito.find(o => o.codigo === codigo);
      if (obj != null){
        obj.stock++;
        obj.total = obj.total+obj.precio
      }
      else{
        this.productosCarrito.push(
          {codigo: this.productos[objIndex].codigo,
          nombre: this.productos[objIndex].nombre,
          descripcion: this.productos[objIndex].descripcion,
          precio: this.productos[objIndex].precio,
          stock: 1,
          total: this.productos[objIndex].precio*1
          }
        )
      }
    }
  }
  comprarSubmit(){
    this.router.navigateByUrl('/envios', { state: { productosCarrito: this.productosCarrito} });
  }
  editar(codigo:string){
    var alertEditar = document.getElementById('alertEditar')
    alertEditar.style.display = ('none')
    this.codigo_a_editar = codigo;
    let obj = this.productos.find(o => o.codigo === codigo);
    if(obj != null){
      this.formulario1.controls['codigo'].setValue(obj.codigo);
      this.formulario1.controls['nombre'].setValue(obj.nombre);
      this.formulario1.controls['descripcion'].setValue(obj.descripcion);
      this.formulario1.controls['precio'].setValue(obj.precio);
      this.formulario1.controls['stock'].setValue(obj.stock);
    }    
  }
  EditarSubmit() {
    if (this.formulario1.valid) {
      let objIndex = this.productos.findIndex((obj => obj.codigo == this.codigo_a_editar));
      this.productos[objIndex].codigo = this.formulario1.value.codigo;
      this.productos[objIndex].nombre = this.formulario1.value.nombre;
      this.productos[objIndex].descripcion = this.formulario1.value.descripcion;
      this.productos[objIndex].precio = this.formulario1.value.precio;
      this.productos[objIndex].stock = this.formulario1.value.stock;
      var alertEditar = document.getElementById('alertEditar')
      alertEditar.style.display = ('')
    }
  }
  eliminar(codigo:string){
    this.productos = this.productos.filter(i => i.codigo != codigo);
    this.productosCarrito = this.productosCarrito.filter(i => i.codigo != codigo);
  }
  eliminarCarrito(codigo:string){
    let obj = this.productos.find(o => o.codigo === codigo);
    obj.stock++;
    let objCarrito = this.productosCarrito.find(o => o.codigo === codigo);
    if (objCarrito.stock > 1){
      objCarrito.stock--;
      objCarrito.total = objCarrito.total-objCarrito.precio
    }else{
      this.productosCarrito = this.productosCarrito.filter(i => i.codigo != codigo);
    }
  }
  agregar(){
    this.productos.push({codigo: this.formulario1.value.codigo, nombre: this.formulario1.value.nombre, descripcion: this.formulario1.value.descripcion, precio: this.formulario1.value.precio, stock: this.formulario1.value.stock});
    this.formulario1.controls['codigo'].setValue("");
    this.formulario1.controls['nombre'].setValue("");
    this.formulario1.controls['descripcion'].setValue("");
    this.formulario1.controls['precio'].setValue("");
    this.formulario1.controls['stock'].setValue("");
  }
}
