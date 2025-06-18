import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LancamentoFiltro } from '../models/lancamento-filtro';
import { Observable } from 'rxjs';
import { Lancamento } from '../models/lancamento.model';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/lancamentos';

  pesquisar(filtro: LancamentoFiltro): Observable<any> {
    let params = new HttpParams();

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoDe) {
      params = params.set('dataVencimentoDe', filtro.dataVencimentoDe.toISOString().split('T')[0]);
    }

    if (filtro.dataVencimentoAte) {
      params = params.set('dataVencimentoAte', filtro.dataVencimentoAte.toISOString().split('T')[0]);
    }

    params = params.set('page', filtro.page);
    params = params.set('size', filtro.size);
    params = params.set('sort', filtro.sort || 'dataVencimento,asc');

    return this.http.get<any>(`${this.apiUrl}/resumo`, { params });
  }

  buscarPorCodigo(codigo: number): Observable<Lancamento> {
    return this.http.get<Lancamento>(`${this.apiUrl}/${codigo}`);
  }

  criarLancamento(lancamento: Lancamento): Observable<Lancamento> {
    return this.http.post<Lancamento>(this.apiUrl, lancamento);
  }

  atualizarLancamento(codigo: number, lancamento: Lancamento): Observable<Lancamento> {
    return this.http.put<Lancamento>(`${this.apiUrl}/${codigo}`, lancamento);
  }

  deletarLancamento(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${codigo}`);
  }
}
