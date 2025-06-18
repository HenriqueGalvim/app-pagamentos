import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { NgxMaskDirective } from 'ngx-mask';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Lancamento } from '../models/lancamento.model';
import { LancamentosService } from '../services/lancamentos.service';
import { CategoriaServiceService } from '../services/categoria-service.service';
import { Categoria } from '../models/categoria.model';
import { PessoasService } from '../services/pessoas.service';

@Component({
  selector: 'app-lancamento-cadastro',
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatButtonToggleModule,
    NgxMaskDirective,
  ],
  templateUrl: './novo-lancamento.component.html',
  styleUrl: './novo-lancamento.component.scss',
})
export class LancamentoCadastroComponent {
  private categoriaService = inject(CategoriaServiceService);
  private pessoaService = inject(PessoasService);
  categorias: Categoria[] = [];
  form: FormGroup;
  pessoaSelecionada: Lancamento | null = null;

  pessoas: any[] = [];

carregarPessoas() {
  this.pessoaService.pesquisar({
    nome: '',
    page: 0,
    size: 1000,
    sort: 'nome,asc'
  }).subscribe(response => {
    this.pessoas = response.content;
  });
}

  private fb = inject(FormBuilder);
  private service = inject(LancamentosService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);


  constructor() {
    this.form = this.fb.group({
      tipo: ['', Validators.required],
      vencimento: ['', Validators.required],
      recebimento: [''],
      descricao: ['', [Validators.required, Validators.minLength(10)]],
      valor: ['', [Validators.required, Validators.min(0.01)]],
      categoria: ['', Validators.required],
      pessoa: ['', Validators.required],
      observacao: [''],
    });
  }

  ngOnInit() {
    this.carregarPessoas();
    this.carregarCategorias();

    const codigo = this.route.snapshot.paramMap.get('codigo');
    if (codigo) {
      this.carregarLancamento(Number(codigo));
    }
  }

  carregarCategorias() {
    this.categoriaService.listarTodas().subscribe((response) => {
      this.categorias = response;
    });
  }

  carregarLancamento(codigo: number) {
    this.service.buscarPorCodigo(codigo).subscribe((lanc) => {
      this.pessoaSelecionada = lanc;
      this.form.patchValue({
        tipoLancamento: lanc.tipoLancamento,
        vencimento: lanc.dataVencimento,
        recebimento: lanc.dataPagamento,
        descricao: lanc.descricao,
        valor: lanc.valor,
        categoria: lanc.categoria,
        pessoa: lanc.pessoa,
        observacao: lanc.observacao,
      });
    });
  }

salvar() {
  const lancamento = {
    ...this.form.value,
    tipo: this.form.value.tipo.toUpperCase(),
    categoria: { codigo: this.form.value.categoria },
    pessoa: { codigo: this.form.value.pessoa }
  };

  if (this.pessoaSelecionada) {
    this.service.atualizarLancamento(this.pessoaSelecionada.codigo, lancamento).subscribe(() => {
      alert('Lançamento atualizado com sucesso!');
      this.router.navigate(['/lancamentos']);
    });
  } else {
    this.service.criarLancamento(lancamento).subscribe(() => {
      alert('Lançamento salvo com sucesso!');
      this.router.navigate(['/lancamentos']);
    });
  }
}



  novo() {
    this.form.reset();
    this.pessoaSelecionada = null;
    this.router.navigate(['/novo-lancamento']);
  }
}
