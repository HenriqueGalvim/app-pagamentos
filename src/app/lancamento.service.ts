import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lancamento } from './models/lancamento.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LancamentoService {
  private readonly apiUrl = '/api/lancamentos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Lancamento[]> {
    return this.http.get<Lancamento[]>(this.apiUrl);
  }
}
