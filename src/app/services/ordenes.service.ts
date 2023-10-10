import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, query, where, getDocs } from '@angular/fire/firestore';
import Orden from '../interfaces/orden.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  constructor(private firestore:Firestore) { }

  addOrden(orden: any){
    const ordenRef = collection(this.firestore, 'ordenes');
    return addDoc(ordenRef, orden);
  }
}
