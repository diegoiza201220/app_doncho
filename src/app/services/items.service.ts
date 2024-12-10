import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, query, getDocs } from '@angular/fire/firestore';
import Item from '../interfaces/item.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private firestore: Firestore) { }

  addItem(item: Item) {
    const itemRef = collection(this.firestore, 'items');
    return addDoc(itemRef, item);
  }

  async getItemsPromise(): Promise<Item[]> {
    const items: Item[] = [];
    const q = query(collection(this.firestore, "items"));
    const querySnapshot = getDocs(q);
    (await querySnapshot).forEach((doc) => {
      const item: Item = {
        nombre: doc.get('nombre'), id: doc.id, 
        ubicacion: doc.get('ubicacion'), 
        familia: doc.get('familia'),
        unidad: doc.get('unidad')
      };
      items.push(item);
    });
    return items;
  }

  getItemsObservable(): Observable<Item[]> {
    const itemRef = collection(this.firestore, 'items');
    return collectionData(itemRef, { idField: 'id' }) as Observable<Item[]>;
  }

  deleteItem(item: Item) {
    const itemDocRef = doc(this.firestore, `items/${item.id}`);
    return deleteDoc(itemDocRef);
  }

  updateItem(item: Item) {
    const itemDocRef = doc(this.firestore, `items/${item.id}`);
    return updateDoc(itemDocRef, { ...item });
  }
  
}






