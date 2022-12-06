import { Component, OnInit } from '@angular/core';
import { ProductosSService } from '../services/productos-s.service';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../models/products';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {

  public product: Products;

  constructor(private activatedRoute: ActivatedRoute, private productService:ProductosSService, private aRoute:ActivatedRoute ) { 
    this.product = {
      photo: "",
      description: "",
      price: 0,
      added: true,
      quantity: 0,
      id: ""
    }
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.productService.getProductByID(params.id).subscribe(item => {
        console.log(item);
        this.product = item as Products;

        console.log(this.product)
      });
    });
  }

}
