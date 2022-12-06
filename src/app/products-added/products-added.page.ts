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
    //this.products=this.productosSer.getProducts();
    //this.total=this.productosSer.getTotal();

    this.productosSer.getProductss().subscribe(res =>{
      this.products=res;
      //console.log(this.products)
    })
    this.total = 0;
  }

  ngOnInit() {
  }

  public removeOfCart(id: string, item:Products){
    item.added = false;

    console.log(item)
    this.productosSer.removeOfCart(id,item);
    //this.products = this.productosSer.getProducts();
    //this.total = this.productosSer.getTotal()
  }

  public sum(price:number){
    this.total = this.productosSer.sum(price);
  }
  public addQuantity(pos:number,price:number){
    this.productosSer.addQuantity(pos);
    this.total = this.productosSer.sum(price);
  }
  public reduceQuantity(pos:number,price:number){
    this.productosSer.reduceQuantity(pos);
    this.total = this.productosSer.sub(price);
  }
}
