import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, query, getDocs } from '@angular/fire/firestore';
import Inventario from '../interfaces/inventario.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InventariosService {

  constructor(private firestore: Firestore) { }

  addCompra(inventario: Inventario) {
    const invetarioRef = collection(this.firestore, 'inventarios');
    return addDoc(invetarioRef, inventario);
  }
}






