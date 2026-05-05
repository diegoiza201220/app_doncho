import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import Secuencia from '../interfaces/secuencia.interface';
import { LoggerService } from './logger.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecuenciaService {
  private readonly apiUrl = `${environment.apiUrl}/secuencium`;

  constructor(
    private http: HttpClient,
    private readonly logger: LoggerService
  ) {}

  getSecuenciaObservable(): Observable<Secuencia[]> {
    return this.http.get<Secuencia[]>(this.apiUrl)
      .pipe(tap(data => this.logger.log(data)));
  }

  updateSecuencia(secuencia: Secuencia): Observable<Secuencia> {
    return this.http.put<Secuencia>(`${this.apiUrl}/${secuencia.id}`, secuencia);
  }

  getSecuenciaPromise(): Promise<Secuencia[]> {
    return this.http.get<Secuencia[]>(this.apiUrl)
      .pipe(tap(data => this.logger.log(data)))
      .toPromise()
      .then(data => data ?? []);
  }
}
