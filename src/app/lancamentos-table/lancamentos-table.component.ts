import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LancamentoResumido } from '../models/lancamento-resumido.model';
import { Lancamento } from '../models/lancamento.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lancamentos-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule
  ],
  templateUrl: './lancamentos-table.component.html',
  styleUrl: './lancamentos-table.component.scss'
})
export class LancamentosTableComponent {
  @Input() lancamentos: Lancamento[] = [];
  @Output() excluir = new EventEmitter<number>();

  colunas = ['pessoa', 'descricao', 'vencimento', 'pagamento', 'valor', 'acoes'];

  onExcluir(codigo: number) {
    this.excluir.emit(codigo);
  }
}
