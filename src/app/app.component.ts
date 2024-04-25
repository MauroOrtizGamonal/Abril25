import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Producto } from './Producto';
import { ServicioProductosService } from './servicio-productos.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule,NgIf,NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  [x: string]: any;
  productos:Producto[]=[];
  nuevoProducto: Producto = {} as Producto; // Initialize an empty Producto object
  constructor(private servicio:ServicioProductosService){}
 
  ngOnInit(): void {
    this.servicio.obtenerProducto().subscribe(data => this.productos = data);
    console.log(this.productos);
 
   
  }
 
  addProducto(): void {
    this.servicio.addProducto(this.nuevoProducto).subscribe(response => {
      console.log('Producto añadido:', response);
      this.nuevoProducto = {} as Producto;
      this.servicio.obtenerProducto().subscribe(updatedProducts => this.productos = updatedProducts); // Refresh product list
    }, error => {
      console.error('Error adding product:', error);
    });
  }
}