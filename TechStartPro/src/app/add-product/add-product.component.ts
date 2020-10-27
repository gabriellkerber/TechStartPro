import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { Categories } from '../models/categories.model';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';
import { Products } from '../models/products.model'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  categories: Observable<Categories[]>;

  forms = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    idCategory: ['', Validators.required],
    value: ['', Validators.required],
  });
  
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.categories = this.categoriesService.getObservable();
  }

  async submit(){

    if(!this.forms.valid){
      return;
    }
    this.forms.disable();

    const product = this.forms.value as Products;


    await this.productsService.add(product);

    this.forms.enable();
    this.formGroupDirective.resetForm();
    this.snackBar.open('Product successfully added!');
  }

}
