import { Component, OnInit } from '@angular/core';
import { Products } from '../models/products';
import { ProductosSService } from '../services/productos-s.service'; 

@Component({
  selector: 'app-products-added',
  templateUrl: './products-added.page.html',
  styleUrls: ['./products-added.page.scss'],
})
export class ProductsAddedPage implements OnInit {

  public products: Products[];
  public total: number = 0;

  constructor(private productosSer: ProductosSService) {
    this.products=this.productosSer.getProducts();
    this.total=this.productosSer.getTotal();
  }

  ngOnInit() {
  }

  public removeOfCart(pos: number){
    this.productosSer.removeOfCart(pos);
    this.products = this.productosSer.getProducts();
  }
  public sum(price:number){
    this.total = this.productosSer.sum(price);
  }
  public removeOfTotal(price:number){
    this.total = this.productosSer.sub(price);
  }

}
