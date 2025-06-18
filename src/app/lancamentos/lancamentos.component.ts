import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LancamentosTableComponent } from "../lancamentos-table/lancamentos-table.component";
import { LancamentoFiltro } from '../models/lancamento-filtro';
import { LancamentosService } from '../services/lancamentos.service';
import { LancamentoResumido } from '../models/lancamento-resumido.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Lancamento } from '../models/lancamento.model';

@Component({
  selector: 'app-lancamentos',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    LancamentosTableComponent,
    MatDatepickerModule,
    MatNativeDateModule,
],
  templateUrl: './lancamentos.component.html',
  styleUrl: './lancamentos.component.scss'
})
export class LancamentosComponent {
 private service = inject(LancamentosService);

  filtro = signal<LancamentoFiltro>({
    descricao: '',
    dataVencimentoDe: undefined,
    dataVencimentoAte: undefined,
    page: 0,
    size: 5,
    sort: 'dataVencimento,asc'
  });

  lancamentos = signal<Lancamento[]>([]);
  totalElements = signal(0);
  paginaAtual = computed(() => this.filtro().page);

  constructor() {
    effect(() => {
      this.pesquisar();
    });
  }

pesquisar() {
  this.service.pesquisar(this.filtro()).subscribe(response => {
    this.lancamentos.set(response.content);
    this.totalElements.set(response.totalElements);
  });
}


  aoMudarPagina(event: PageEvent) {
    this.filtro.update(f => ({
      ...f,
      page: event.pageIndex,
      size: event.pageSize
    }));
    this.pesquisar();
  }

  excluirLancamento(codigo: number) {
    if (confirm('Tem certeza que deseja excluir este lançamento?')) {
      this.service.deletarLancamento(codigo).subscribe(() => {
        alert('Lançamento excluído com sucesso!');
        this.pesquisar();
      });
    }
  }
}
