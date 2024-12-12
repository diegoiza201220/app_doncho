import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, query, getDocs, where } from '@angular/fire/firestore';
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

  async queryInventariosPorFecha(d1: number, d2: number ): Promise<Inventario[]> {
    const q = query(collection(this.firestore, "inventarios"), 
              where("fechainteger", ">=", d1),
              where("fechainteger", "<=", d2));
    const querySnapshot = await getDocs(q);
    let inventarios: any = [];
    querySnapshot.forEach((doc) => {
      let item = doc.data() as Inventario;
      item.id = doc.id;
      inventarios.push(item);
    });
    inventarios.sort((a: { secuencial: string; },b: { secuencial: any; }) => a.secuencial<b.secuencial);
    return inventarios;
  }
}






