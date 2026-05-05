import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Usuario from '../interfaces/usuario.interface';
import { LoggerService } from './logger.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private readonly apiUrl = `${environment.apiUrl}/usuario`;

  constructor(
    private readonly http: HttpClient,
    private readonly logger: LoggerService
  ) {}

  async query(usuario: Usuario): Promise<Usuario> {
    const result = await this.http.post<Usuario>(`${this.apiUrl}/validar`, usuario)
      .toPromise();
    this.logger.log(result);
    return result ?? { nombre: '', password: '.' };
  }
}
