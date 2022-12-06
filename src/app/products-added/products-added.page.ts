import { Component, OnInit } from '@angular/core';
import { Products } from '../models/products';
import { Recibo } from '../models/recibo';
import { ProductosSService } from '../services/productos-s.service'; 

@Component({
  selector: 'app-products-added',
  templateUrl: './products-added.page.html',
  styleUrls: ['./products-added.page.scss'],
})
export class ProductsAddedPage implements OnInit {

  public products: Products[];
  public total: Recibo[];
  public totalUnico: number;
  

  constructor(private productosSer: ProductosSService) {
    this.totalUnico = 0;
    console.log(this.productosSer.getTotal())

    //this.products=this.productosSer.getProducts();
    //this.total=this.productosSer.getTotal();

    this.productosSer.getTotal().subscribe(res => {
      this.total = res;
      this.totalUnico=this.total[0].total;
      console.log("El total es:"+this.totalUnico);
    });

    this.productosSer.getProductss().subscribe(res =>{
      this.products=res;
      //console.log(this.products)
    })
  }

  ngOnInit() {
  }

  public removeOfCart(id: string, item:Products){
    let cantidad:number;
    cantidad = item.price*item.quantity;
    this.productosSer.sub(cantidad, this.totalUnico)
    this.productosSer.eliminar(id,item)
  }

  public addQuantity(id:string,item:Products){
    this.productosSer.addQuantity(id,item,this.totalUnico);
  }
  public reduceQuantity(id:string,item:Products){
    this.productosSer.reduceQuantity(id,item,this.totalUnico);
  }
}
