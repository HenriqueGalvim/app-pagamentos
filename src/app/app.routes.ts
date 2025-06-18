import { Routes } from '@angular/router';
import { LancamentosComponent } from './lancamentos/lancamentos.component';
import { LayoutComponent } from './layout/layout.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import { LancamentoCadastroComponent } from './novo-lancamento/novo-lancamento.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
      { path: 'lancamentos', component: LancamentosComponent },
      { path: 'pessoas', component: PessoasComponent },
      { path: 'novo-lancamento', component: LancamentoCadastroComponent },
      { path: 'nova-pessoa', component: PessoaCadastroComponent },
    ],
  },
  {
    path: 'pessoas/editar/:codigo',
    loadComponent: () =>
      import('./pessoa-cadastro/pessoa-cadastro.component').then(
        (m) => m.PessoaCadastroComponent
      ),
  },
];
