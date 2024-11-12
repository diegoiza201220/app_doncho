import { Injectable } from '@angular/core';
import { Firestore, doc, collection, addDoc, deleteDoc, query, where, getDocs } from '@angular/fire/firestore';
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

  deleteOrden(orden: Orden){
    const ordenDocRef = doc(this.firestore, `ordenes/${orden.id}`);
    return deleteDoc(ordenDocRef);
  }

  async queryOrdenesPorFecha(d1: number, d2: number ): Promise<Orden[]> {
    const q = query(collection(this.firestore, "ordenes"), 
              where("fechainteger", ">=", d1),
              where("fechainteger", "<=", d2));
    const querySnapshot = await getDocs(q);
    let ordenes: any = [];
    querySnapshot.forEach((doc) => {
      let item = doc.data() as Orden;
      item.id = doc.id;
      ordenes.push(item);
    });
    return ordenes;
  }

}
