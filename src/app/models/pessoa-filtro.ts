// src/app/models/pessoa-filtro.ts

export interface PessoaFiltro {
  nome?: string;
  page: number;
  size: number;
  sort?: string;
}
