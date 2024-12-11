import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, query, getDocs } from '@angular/fire/firestore';
import Compra from '../interfaces/compra.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor(private firestore: Firestore) { }

  addCompra(compra: Compra) {
    const compraRef = collection(this.firestore, 'compras');
    return addDoc(compraRef, compra);
  }
}






