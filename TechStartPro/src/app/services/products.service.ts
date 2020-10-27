import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Products } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Products [] = [];

  constructor(private firestore: AngularFirestore) { }


  async add(products){

    await this.firestore.collection('products').add(products);
  }

  getObservable(): Observable<Products[]>{
    return this.firestore.collection<Products>('products'
    ).valueChanges({ idField: 'id'});
  }

  async delete(product: Products): Promise<void>{
    await this.firestore.collection('products').doc(product.id).delete();
  }

  async update(id: string, produto: Products): Promise<void> {

    await this.firestore.collection<Products>('products').doc(id).update(produto);
  }

  async get(id: string): Promise<Products>{
    const doc =  await this.firestore.collection<Products>('products').doc(id).get().toPromise();
    return {
      id: doc.id,
      ...doc.data()
    } as Products;
  }
}