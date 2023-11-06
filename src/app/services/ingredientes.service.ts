import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, query, getDocs } from '@angular/fire/firestore';
import Ingrediente from '../interfaces/ingrediente.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientesService {

  constructor(private firestore: Firestore) { }

  addIngrediente(ingrediente: Ingrediente) {
    const ingredienteRef = collection(this.firestore, 'ingredientes');
    return addDoc(ingredienteRef, ingrediente);
  }

  async getIngredientesPromise(): Promise<Ingrediente[]> {
    const ingredientes: Ingrediente[] = [];
    const q = query(collection(this.firestore, "ingredientes"));
    const querySnapshot = getDocs(q);
    (await querySnapshot).forEach((doc) => {
      const ingrediente: Ingrediente = {
        nombre: doc.get('nombre'), id: doc.id, familia: doc.get('familia'),
        ubicacion: doc.get('ubicacion'), unidad: doc.get('unidad')
      };
      ingredientes.push(ingrediente);
    });
    console.log(ingredientes);
    return ingredientes;
  }

  getIngredientesObservable(): Observable<Ingrediente[]> {
    const ingredienteRef = collection(this.firestore, 'ingredientes');
    return collectionData(ingredienteRef, { idField: 'id' }) as Observable<Ingrediente[]>;
  }

  deleteIngrediente(ingrediente: Ingrediente) {
    const ingredienteDocRef = doc(this.firestore, `ingredientes/${ingrediente.id}`);
    return deleteDoc(ingredienteDocRef);
  }

  updateIngrediente(ingrediente: Ingrediente) {
    const ingredienteDocRef = doc(this.firestore, `ingredientes/${ingrediente.id}`);
    return updateDoc(ingredienteDocRef, { ...ingrediente });
  }
  
}






