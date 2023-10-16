import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, query, where, getDocs } from '@angular/fire/firestore';
import Orden from '../interfaces/orden.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  constructor(private firestore: Firestore) { }

  addOrden(orden: any) {
    const ordenRef = collection(this.firestore, 'ordenes');
    return addDoc(ordenRef, orden);
  }

  async queryOrdenesPorFecha(d1: Date, d2: Date ): Promise<Orden[]> {
    const q = query(collection(this.firestore, "ordenes"), 
              where("fecha", ">=", d1.toISOString()),
              where("fecha", "<=", d2.toISOString()));
    const querySnapshot = await getDocs(q);
    let ordenes: any = [];
    querySnapshot.forEach((doc) => {
      ordenes.push(doc.data() as Orden);
    });
    //console.log(ordenes);
    return ordenes;
  }

}
