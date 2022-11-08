import { Injectable } from '@angular/core';
import { Products } from '../models/products';


@Injectable({
  providedIn: 'root'
})
export class ProductosSService {

  private products: Products[]; //PENDIENTE CREACION DE MODELO
  private carrito: number[][];
  private total: number = 0;

  constructor() {
      this.products = [
        {
          photo: "https://picsum.photos/200",
          description: "Computadora",
          price: 35000,
          added: false,
          quantity: 1
        },
        {
          photo: "https://picsum.photos/201",
          description: "Tableta",
          price: 15000,
          added: false,
          quantity: 1
        },
        {
          photo: "https://picsum.photos/202",
          description: "Telefono",
          price: 8000,
          added: false,
          quantity: 1
        }
      ]
   }

   public getProducts():Products[] {
    return this.products;
   }
   public getProductByDescription(des:string): Products{
    let item: Products;
    item = this.products.find(
      (products) => {
        return products.description==des;
      }
    );
    return item;
  }
  public addToCart(pos:number){
    this.products[pos].added=true;
  }
  public removeOfCart(pos:number,price:number,quan:number){
    this.products[pos].added=false;
    this.products[pos].quantity=1;
    this.total-=(price*quan)
  }
  public addNewProduct(name:string,price:number,photo:string){
    let newProduct: Products;
    newProduct = {
      photo: photo,
      description: name,
      price: price,
      added: false,
      quantity: 1
    }
    this.products.push(newProduct);
  }
  public sum(price:number):number{
    this.total+=price;
    return this.total;
  }
  public sub(price:number):number{
    this.total-=price;
    return this.total;
  }
  public getTotal():number{
    return this.total;
  }
  public addQuantity(pos:number){
    this.products[pos].quantity++
  }
  public reduceQuantity(pos:number){
    this.products[pos].quantity--
  }
}
