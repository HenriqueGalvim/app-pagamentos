// src\app\models\lancamento-resumido.model.ts

export interface LancamentoResumido {
  codigo: number;
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  tipoLancamento: string;
  categoria: string;
  pessoa: string;
}
