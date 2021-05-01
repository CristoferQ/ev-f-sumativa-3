import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productos: Producto[] = []
  constructor() { }
  listarProductos(){
    return this.productos = [
      {codigo: "1", nombre: "Celular", descripcion: "Este es un celular", precio: 90000, stock: 7},
      {codigo: "2", nombre: "Notebook", descripcion: "Este es un notebook", precio: 450000, stock: 5},
      {codigo: "3", nombre: "Impresora", descripcion: "Esta es una impresora", precio: 80000, stock: 4},
      {codigo: "4", nombre: "Mouse", descripcion: "Este es un mouse", precio: 25000, stock: 12},
      {codigo: "5", nombre: "Teclado", descripcion: "Este es un teclado", precio: 45000, stock: 8},
      {codigo: "6", nombre: "Cable HDMI", descripcion: "Este es un cable HDMI", precio: 5000, stock: 12},
      {codigo: "7", nombre: "HUD USB", descripcion: "Este es un HUD USB", precio: 6000, stock: 8},
      {codigo: "8", nombre: "Pendrive", descripcion: "Este es un pendrive", precio: 8000, stock: 15},

    ];
  }
}
class Producto{
  constructor(
    public codigo:string,
    public nombre:string,
    public descripcion:string,
    public precio:number,
    public stock:number,
  ){}
}