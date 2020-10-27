import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categories } from '../models/categories.model';
import { Products } from '../models/products.model';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  categories: Observable<Categories[]>;
  idProduct: string;

  forms = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    idCategory: ['', Validators.required],
    value: ['', Validators.required],
  });
  
  product: Products;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,  
  ) { }

  async ngOnInit(){

    this.categories = this.categoriesService.getObservable();

    this.idProduct = await this.activedRoute.snapshot.paramMap.get('id');
    this.product = await this.productsService.get(this.idProduct);
    this.forms.patchValue(this.product);
  }

  async submit(){
    if(! this.forms.valid){
      return;
    }

    const dados = this.forms.value;
    this.productsService.update(this.idProduct, dados);
    this.forms.reset();
    await this.snackBar.open(`${"Product "} ${this.product.name} ${" successfully edited!"}`);
    this.router.navigate(["/SearchProducts"]);
  }

}
