import { Injectable } from '@angular/core';
import { AngularFirestore } from  '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Categories } from '../models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categories: Categories [] = [];


  constructor(private firestore: AngularFirestore) { }


  async add(categories){

    await this.firestore.collection('categories').add({
      name: categories
    });
  }
  
  atualizarLista(){
    this.firestore.collection<Categories>('Categories').get()
    .toPromise()
    .then(documentData => {


      this.categories = documentData.docs.map(doc =>{ 
        return {
          id: doc.id, ...doc.data()
        } as Categories;
      });

    }).catch(error => {
    });
  }

  async get(id: string): Promise<Categories>{
    const doc =  await this.firestore.collection<Categories>('categories').doc(id).get().toPromise();
    return {
      id: doc.id,
      ...doc.data()
    } as Categories;
  }

  getObservable(): Observable<Categories[]> {
    return this.firestore.collection<Categories>('categories').valueChanges({ idField: 'id' });
  }
}
