import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PessoaFiltro } from '../models/pessoa-filtro';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa.model';

@Injectable({
  providedIn: 'root',
})
export class PessoasService {
  // JWT hardcoded por enquanto
  private readonly jwtToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkB1ZWEuZWR1LmJyIiwiaWF0IjoxNzUwMjczMDQ0LCJleHAiOjE3NTA2MzMwNDR9.9n-2wJOd5hI5n6SJG4A8Omy_hXldtXpm2kWbdQeYt3w';

  private readonly apiUrl = 'http://localhost:8080/pessoas'; // ajuste para o seu backend

  private http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`,
    });
  }

  pesquisar(filtro: PessoaFiltro): Observable<any> {
    let params = new HttpParams();

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    params = params.set('page', filtro.page);
    params = params.set('size', filtro.size);
    params = params.set('sort', filtro.sort || 'nome,asc');

    return this.http.get<any>(this.apiUrl, {
      params,
      headers: this.getHeaders(),
    });
  }

  criarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.apiUrl, pessoa, {
      headers: this.getHeaders(),
    });
  }

  atualizarPessoa(codigo: number, pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.apiUrl}/${codigo}`, pessoa, {
      headers: this.getHeaders(),
    });
  }

  deletarPessoa(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${codigo}`, {
      headers: this.getHeaders(),
    });
  }

  atualizarStatusAtivo(codigo: number, ativo: boolean): Observable<Pessoa> {
    return this.http.patch<Pessoa>(`${this.apiUrl}/${codigo}/ativo`, ativo, {
      headers: this.getHeaders(),
    });
  }

  buscarPorCodigo(codigo: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.apiUrl}/${codigo}`, {
      headers: this.getHeaders(),
    });
  }
}
