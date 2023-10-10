import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, query, where, getDocs } from '@angular/fire/firestore';
import Secuencia from '../interfaces/secuencia.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecuenciaService {

  constructor(private firestore:Firestore) { }

  getSecuenciaObservable(): Observable<Secuencia[]>{
    const secuenciaRef = collection(this.firestore, 'secuencia');
    return collectionData(secuenciaRef, {idField:'id'}) as Observable<Secuencia[]>;
  }

  updateSecuencia(secuencia: Secuencia) {
    const secuenciaDocRef = doc(this.firestore, `secuencia/${secuencia.id}`);
    return updateDoc(secuenciaDocRef, { ...secuencia });
  }
}
