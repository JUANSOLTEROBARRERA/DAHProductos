import { Component } from '@angular/core';
import { Products } from '../models/products';
import { ProductosSService } from '../services/productos-s.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  public name: string;
  public price: number;
  public photo: string;
  public total: number = 0;

  public products: Products[];

  constructor(private toastController: ToastController,private productosSer: ProductosSService, private router: Router) {
    this.products=this.productosSer.getProducts();
    this.total=this.productosSer.getTotal();
  }
  
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Producto agregado al carrito!',
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  public getProductByDescription(des: string): void{
    this.router.navigate(
      ['/view-product'],
      {
        queryParams: {description: des}
      }
      );
  }
  public addToCart(pos: number){
    this.productosSer.addToCart(pos);
    this.products = this.productosSer.getProducts();
  }

  public viewCart(){
    this.router.navigate(
      ['/products-added']
      );
  }
  
  public addNewProduct(){
    this.router.navigate(
      ['/add-new-product']
      );
  }

  public newProduct(){
    this.productosSer.addNewProduct(this.name,this.price,this.photo);
    this.products=this.productosSer.getProducts();

    this.name = "";
    this.price = 0;
    this.photo = "";
  }

  public sum(price:number){
    this.total = this.productosSer.sum(price)
  }
}
