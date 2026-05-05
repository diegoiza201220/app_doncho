import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import Orden from '../interfaces/orden.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  private readonly apiUrl = `${environment.apiUrl}/orden`;

  constructor(private http: HttpClient) {}

  addOrden(orden: any): Promise<Orden> {
    return this.http.post<Orden>(this.apiUrl, orden).toPromise() as Promise<Orden>;
  }

  deleteOrden(orden: Orden): Promise<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orden.id}`).toPromise() as Promise<void>;
  }

  async queryOrdenesPorFecha(d1: number, d2: number): Promise<Orden[]> {
    const params = new HttpParams()
      .set('fechaDesde', d1.toString())
      .set('fechaHasta', d2.toString());
    const ordenes = await this.http.get<Orden[]>(`${this.apiUrl}/porFecha`, { params }).toPromise();
    const result = ordenes ?? [];
    result.sort((a, b) => (a.secuencial < b.secuencial ? -1 : 1));
    return result;
  }
}
