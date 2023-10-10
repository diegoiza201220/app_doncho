import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Ordencocina from '../interfaces/ordencocina.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdenescocinaService {

  constructor(private firestore:Firestore) { }

  addOrdencocina(ordenCocina: Ordencocina){
    const productoRef = collection(this.firestore, 'ordenescocina');
    return addDoc(productoRef, ordenCocina);
  }

  getOrdenescocinaObservable(): Observable<Ordencocina[]>{
    const ordencocinaRef = collection(this.firestore, 'ordenescocina');
    return collectionData(ordencocinaRef, {idField:'id'}, ) as Observable<Ordencocina[]>;
  }

  updateOrdenescocina(ordenCocina: Ordencocina) {
    const ordencocinaDocRef = doc(this.firestore, `ordenescocina/${ordenCocina.id}`);
    return updateDoc(ordencocinaDocRef, { ...ordenCocina });
  }
}
