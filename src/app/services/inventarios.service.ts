import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import Inventario from '../interfaces/inventario.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventariosService {
  private readonly apiUrl = `${environment.apiUrl}/inventario`;

  constructor(private http: HttpClient) {}

  addCompra(inventario: Inventario): Observable<Inventario> {
    return this.http.post<Inventario>(this.apiUrl, inventario);
  }

  async queryInventariosPorFecha(d1: number, d2: number): Promise<Inventario[]> {
    const params = new HttpParams()
      .set('fechaDesde', d1.toString())
      .set('fechaHasta', d2.toString());
    const inventarios = await this.http.get<Inventario[]>(`${this.apiUrl}/porFecha`, { params }).toPromise();
    const result = inventarios ?? [];
    result.sort((a, b) => (a.secuencial < b.secuencial ? -1 : 1));
    return result;
  }
}
