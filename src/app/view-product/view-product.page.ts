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

  constructor(private productService:ProductosSService, private aRoute:ActivatedRoute ) { }

  ngOnInit() {
    this.aRoute.queryParams.subscribe(
      (params) => {
        console.log(params);
        this.product = this.productService.getProductByDescription(params.description);
      }
    );
  }

}
