import { Categoria } from './categoria.model';
import { Pessoa } from './pessoa.model';
import { TipoLancamento } from './tipo-lancamento.enum';

export interface Lancamento {
  codigo: number;
  descricao: string;
  dataVencimento: string;   // Pode usar Date se preferir
  dataPagamento: string;    // Pode usar Date se preferir
  valor: number;
  observacao: string;
  tipoLancamento: TipoLancamento;
  categoria: Categoria;
  pessoa: Pessoa;
}
