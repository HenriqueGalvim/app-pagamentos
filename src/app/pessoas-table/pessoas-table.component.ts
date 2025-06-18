import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Pessoa } from '../models/pessoa.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pessoas-table',
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './pessoas-table.component.html',
  styleUrl: './pessoas-table.component.scss'
})
export class PessoasTableComponent {
 @Input() pessoas: any[] = [];
  @Output() excluir = new EventEmitter<number>();
  @Output() alternarStatus = new EventEmitter<any>();

onAlternarStatus(pessoa: any) {
  this.alternarStatus.emit(pessoa);
}

  colunas: string[] = ['nome', 'cidade', 'estado', 'status', 'acoes'];

  onExcluir(pessoaId: number) {
    this.excluir.emit(pessoaId);
  }
}
