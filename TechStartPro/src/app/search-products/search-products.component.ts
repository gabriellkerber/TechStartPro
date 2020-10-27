import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Products } from '../models/products.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductsService } from '../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Categories } from '../models/categories.model';
import { CategoriesService } from '../services/categories.service';
import { DeletePageComponent } from '../delete-page/delete-page.component';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit {

  displayedColumns: string[] = ['id','name', 'description', 'value', 'idCategory','btn'];
  products: Observable<Products[]>;
  categories: Observable<Categories[]>;
  dataSource: MatTableDataSource<any>;
  searchKey;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {

    this.categories = this.categoriesService.getObservable();

    this.productsService.getObservable().subscribe(
      list => {
        let array = list.map(item =>{
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            value: item.value,
            idCategory: item.idCategory,
          };
        });
        this.dataSource = new MatTableDataSource(array);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  async openDialog(products: Products) {
    let DialogRef = this.dialog.open(DeletePageComponent);

    await DialogRef.afterClosed().subscribe(result =>{
      if(result === "true"){
        this.delete(products)
        this.snackBar.open('Product successfully deleted!');
      }
    });
  }

  async delete(products: Products) {

    await this.productsService.delete(products);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
