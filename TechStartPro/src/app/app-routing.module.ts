import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SearchProductsComponent } from './search-products/search-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';


const routes: Routes = [
  { path: '', redirectTo: 'AddCategories', pathMatch: 'full' },
  { path: 'AddCategories', component: CategoriesComponent },
  { path: 'AddProducts', component: AddProductComponent },
  { path: 'SearchProducts', component: SearchProductsComponent },
  { path: 'Edit/:id/Products', component: EditProductComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
