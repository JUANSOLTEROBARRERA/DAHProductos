import { Injectable } from '@angular/core';
import { Products } from '../models/products';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { Recibo } from '../models/recibo';


@Injectable({
  providedIn: 'root'
})
export class ProductosSService {

  private products: Products[]; //PENDIENTE CREACION DE MODELO
  private carrito: number[][];
  private total: number;

  constructor(private firestore: AngularFirestore) {

  }

  public getTotal(): Observable<Recibo[]> {
    return this.firestore.collection('recibo').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Recibo;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  public getProducts(): Products[] {
    return this.products;
  }
  public getProductByID(id: string) {
    let result = this.firestore.collection('products').doc(id).valueChanges();
    return result;
  }

  public removeOfCart(id: string, item2: Products) {
    //this.products[pos].added=false;
    //this.products[pos].quantity=1;
    //this.total-=(price*quan)
    this.firestore.doc('products/' + id).update(item2);
  }
  public addNewProduct(name: string, price: number, photo: string) {
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
  public eliminar(id:string, item:Products){
    item.quantity = 1;
    item.added = false;
    this.firestore.doc('products/'+id).update(item);
  }
  public sum(price: number, total:number){
    let totalactual:Recibo = {
      total : total
    }
    totalactual.total+=price;

    this.firestore.doc('recibo/' + "cqpngGbAMOE3Mx3URiHm").update(totalactual);
  }
  public sub(price: number, total:number) {
    let totalactual:Recibo = {
      total : total
    }
    totalactual.total-=price;

    this.firestore.doc('recibo/' + "cqpngGbAMOE3Mx3URiHm").update(totalactual);
  }
  //public getTotal(): number {
  //  return this.total;
  //}
  public addQuantity(id: string, item: Products, total:number) {
    item.quantity++
    this.firestore.doc('products/' + id).update(item);
    this.sum(item.price, total);
  }
  public reduceQuantity(id: string, item: Products, total:number) {
    item.quantity--
    this.firestore.doc('products/' + id).update(item);
    this.sub(item.price, total);
  }


  public addToCart(producto: Products) {
    producto.added = true;
    this.firestore.collection('products').doc(producto.id).update(producto);
  }
  public newProduct(name: string, price: number, photo: string, quantity: number) {
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

  public getProductss(): Observable<Products[]> {
    return this.firestore.collection('products').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          //console.log(a);
          const data = a.payload.doc.data() as Products;
          //console.log(data);
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
