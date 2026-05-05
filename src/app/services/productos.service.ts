import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import Producto from '../interfaces/productos.interface';
import { LoggerService } from './logger.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private readonly apiUrl = `${environment.apiUrl}/producto`;

  constructor(
    private http: HttpClient,
    private readonly logger: LoggerService
  ) {}

  addProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  getProductosPromise(): Promise<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl)
      .pipe(tap(data => this.logger.log(data)))
      .toPromise()
      .then(data => data ?? []);
  }

  getProductosObservable(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl)
      .pipe(tap(data => this.logger.log(data)));
  }

  deleteProducto(producto: Producto): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${producto.id}`);
  }

  updateProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${producto.id}`, producto);
  }
}
