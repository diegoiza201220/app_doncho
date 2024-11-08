import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc, query, getDocs } from '@angular/fire/firestore';
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

  async getSecuenciaPromise(): Promise<Secuencia[]> {
    const secuencias: Secuencia[] = [];
    const q = query(collection(this.firestore, "secuencia"));
    const querySnapshot = getDocs(q);
    (await querySnapshot).forEach((doc) => {
      const secuencia: Secuencia = {
        fecha: doc.get('fecha'), secuencia: doc.get('secuencia'), id: doc.id
      };
      secuencias.push(secuencia);
    });

    console.log(secuencias);
    return secuencias;
  }
}
