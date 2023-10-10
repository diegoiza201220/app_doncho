import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Produccioncocina from '../interfaces/produccioncocina.interface';

@Injectable({
  providedIn: 'root'
})
export class ProduccioncocinaService {

  constructor(private firestore:Firestore) { }

  getProduccioncocinaObservable(): Observable<Produccioncocina[]>{
    const produccioncocinaRef = collection(this.firestore, 'produccioncocina');
    return collectionData(produccioncocinaRef, {idField:'id'}, ) as Observable<Produccioncocina[]>;
  }

  updateProduccioncocina(produccionCocina: Produccioncocina) {
    console.log(produccionCocina);
    const produccioncocinaDocRef = doc(this.firestore, `produccioncocina/${produccionCocina.id}`);
    return updateDoc(produccioncocinaDocRef, { ...produccionCocina });
  }
}
