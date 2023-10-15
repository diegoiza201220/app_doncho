import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, query, where, getDocs } from '@angular/fire/firestore';
import Producto from '../interfaces/productos.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private firestore: Firestore) { }

  addProducto(producto: Producto) {
    const productoRef = collection(this.firestore, 'productos');
    return addDoc(productoRef, producto);
  }

  async getProductosPromise(): Promise<Producto[]> {
    const productos: Producto[] = [];
    const q = query(collection(this.firestore, "productos"));
    const querySnapshot = getDocs(q);
    (await querySnapshot).forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      const producto: Producto = {
        nombre: doc.get('nombre'), id: doc.id, valor: doc.get('valor'),
        grupo: doc.get('grupo'), activo: doc.get('activo'), ordenaparicion: doc.get('ordenaparicion'), pedidoacocina: doc.get('pedidoacocina')
      };
      productos.push(producto);
    });

    console.log(productos);
    return productos;
  }

  getProductosObservable(): Observable<Producto[]> {
    const productoRef = collection(this.firestore, 'productos');
    return collectionData(productoRef, { idField: 'id' }) as Observable<Producto[]>;
  }

  deleteProducto(producto: Producto) {
    const productoDocRef = doc(this.firestore, `productos/${producto.id}`);
    return deleteDoc(productoDocRef);
  }

  updateProducto(producto: Producto) {
    const productoDocRef = doc(this.firestore, `productos/${producto.id}`);
    return updateDoc(productoDocRef, { ...producto });
  }

  // query(producto: Producto): Producto[] {
  //   const q = query(collection(this.firestore, "cities"), where("capital", "==", true));

  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //   });
  // }
}
