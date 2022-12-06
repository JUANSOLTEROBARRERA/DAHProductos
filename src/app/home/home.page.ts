import { Component } from '@angular/core';
import { Products } from '../models/products';
import { ProductosSService } from '../services/productos-s.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Recibo } from '../models/recibo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  public name: string;
  public price: number;
  public photo: string;
  public total: Recibo[];
  public totalUnico: number;

  public products: Products[];

  constructor(private toastController: ToastController,private productosSer: ProductosSService, private router: Router) {
    //this.products=this.productosSer.getProducts();
    //this.total=this.productosSer.getTotal();
    this.productosSer.getProductss().subscribe(res =>{
      this.products=res;
      console.log(this.products)
    })

    this.productosSer.getTotal().subscribe(res => {
      this.total = res;
      this.totalUnico=this.total[0].total;
      console.log("El total es:"+this.totalUnico);
    });
  }
  
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Producto agregado al carrito!',
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  public getProductByDescription(id: string): void{
    this.router.navigate(
      ['/view-product'],
      {
        queryParams: {id: id}
      }
      );
  }
  

  public viewCart(){
    this.router.navigate(
      ['/products-added']
      );
  }

  public newProduct(){
    this.productosSer.newProduct(this.name,this.price,this.photo,1);
    this.products=this.productosSer.getProducts();

    this.name = "";
    this.price = 0;
    this.photo = "";
  }
public addToCart(product: Products){
    this.productosSer.addToCart(product);
    this.products = this.productosSer.getProducts();
  }
  
  public addNewProduct(){
    this.router.navigate(
      ['/add-new-product']
      );
  }

  
  public sum(price:number){
    this.productosSer.sum(price, this.totalUnico)
  }
}
