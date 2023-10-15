import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, getDoc, query, where, getDocs} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Usuario from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore:Firestore) { }

  async query(usuario: Usuario): Promise<Usuario>{
    let u : Usuario = {nombre:'',password:'.'};
    const q = query(
      collection(this.firestore, "usuarios"),
      where("nombre", "==", usuario.nombre),
      where("password", "==", usuario.password)
    );
    
    const docsSnap = await getDocs(q);
        
    docsSnap.forEach((doc) => {
      console.log(doc.data());
      u = doc.data() as Usuario;
    });
    return u;
  }
}
