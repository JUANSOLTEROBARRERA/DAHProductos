import { Injectable } from '@angular/core';
import { Products } from '../models/products';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore' 
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductosSService {

  private products: Products[]; //PENDIENTE CREACION DE MODELO
  private carrito: number[][];
  private total: number = 0;

  constructor(private firestore: AngularFirestore) {
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


  public addToCart(producto:Products){
    producto.added=true;
    this.firestore.collection('products').doc(producto.id).update(producto);
  }
public newProduct(name:string,price:number,photo:string, quantity:number) {
    let newProduct: Products;
    newProduct = {
      photo: photo,
      description: name,
      price: price,
      added: false,
      quantity: quantity
    }
    this.firestore.collection('products').add(newProduct)
  }

  public getProductss(): Observable<Products[]>{
    return this.firestore.collection('products').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          console.log(a);
          const data = a.payload.doc.data() as Products;
          console.log(data);
          const id = a.payload.doc.id;
          return {id,...data};
        });
      })
    );
  }
}
