import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, query, getDocs, where } from '@angular/fire/firestore';
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

  async queryComprasPorFecha(d1: number, d2: number ): Promise<Compra[]> {
    const q = query(collection(this.firestore, "compras"), 
              where("fechainteger", ">=", d1),
              where("fechainteger", "<=", d2));
    const querySnapshot = await getDocs(q);
    let compras: any = [];
    querySnapshot.forEach((doc) => {
      let item = doc.data() as Compra;
      item.id = doc.id;
      compras.push(item);
    });
    compras.sort((a: { secuencial: string; },b: { secuencial: any; }) => a.secuencial<b.secuencial);
    return compras;
  }
}






