// src/app/pessoas/pessoas.component.ts

import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PessoasTableComponent } from '../pessoas-table/pessoas-table.component';
import { PessoasService } from '../services/pessoas.service';
import { PessoaFiltro } from '../models/pessoa-filtro';
import { Pessoa } from '../models/pessoa.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacaoDialogComponent } from '../confirmacao-dialog/confirmacao-dialog.component';
@Component({
  selector: 'app-pessoas',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    PessoasTableComponent,
  ],
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.scss',
})
export class PessoasComponent {
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  pessoasService = inject(PessoasService);
  filtro = signal<PessoaFiltro>({
    nome: '',
    page: 0,
    size: 5,
    sort: 'nome,asc',
  });

  pessoas = signal<Pessoa[]>([]);
  totalElements = signal(0);
  paginaAtual = signal(0);

  pesquisar() {
    this.pessoasService.pesquisar(this.filtro()).subscribe({
      next: (dados) => {
        this.pessoas.set(dados.content);
        this.totalElements.set(dados.totalElements);
        this.paginaAtual.set(dados.number);
      },
      error: (err) => console.error('Erro ao carregar lançamentos', err),
    });
  }

  aoMudarPagina(event: PageEvent) {
    this.filtro().page = event.pageIndex;
    this.filtro().size = event.pageSize;
    this.pesquisar();
  }

  ngOnInit() {
    this.pesquisar();
  }

  excluirPessoa(codigo: number) {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '350px',
      data: { mensagem: 'Deseja realmente excluir esta pessoa?' },
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.pessoasService.deletarPessoa(codigo).subscribe({
          next: () => {
            this.snackBar.open('Pessoa excluída com sucesso!', '', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['snackbar-success'],
            });
            this.pesquisar();
          },
          error: (e) => {
            this.snackBar.open(`${e.error.error}!`, '', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['snackbar-error'],
            });
          },
        });
      }
    });
  }

  alterarStatusPessoa(pessoa: any) {
  const novoStatus = !pessoa.ativo;
  const dadosAtualizados = { ...pessoa, ativo: novoStatus };

  this.pessoasService.atualizarPessoa(pessoa.codigo, dadosAtualizados).subscribe({
    next: () => {
      const msg = novoStatus ? 'Pessoa ativada com sucesso!' : 'Pessoa desativada com sucesso!';
      this.snackBar.open(msg, '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });
      this.pesquisar(); // Atualiza a tabela
    },
    error: () => {
      this.snackBar.open('Erro ao atualizar status da pessoa.', '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
    }
  });
}
}
