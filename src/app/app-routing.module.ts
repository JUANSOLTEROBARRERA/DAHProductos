import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'view-product',
    loadChildren: () => import('./view-product/view-product.module').then( m => m.ViewProductPageModule)
  },
  {
    path: 'products-added',
    loadChildren: () => import('./products-added/products-added.module').then( m => m.ProductsAddedPageModule)
  },
  {
    path: 'add-new-product',
    loadChildren: () => import('./add-new-product/add-new-product.module').then( m => m.AddNewProductPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
