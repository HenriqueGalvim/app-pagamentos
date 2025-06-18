import { Routes } from '@angular/router';
import { LancamentosComponent } from './lancamentos/lancamentos.component';
import { LayoutComponent } from './layout/layout.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import { LancamentoCadastroComponent } from './novo-lancamento/novo-lancamento.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { authGuard } from './services/auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // rota pública

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard], // protege todas as rotas filhas
    children: [
      { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
      { path: 'lancamentos', component: LancamentosComponent },
      { path: 'novo-lancamento', component: LancamentoCadastroComponent },
      { path: 'nova-pessoa', component: PessoaCadastroComponent },
      { path: 'pessoas', component: PessoasComponent },
      {
        path: 'pessoas/editar/:codigo',
        loadComponent: () =>
          import('./pessoa-cadastro/pessoa-cadastro.component').then(m => m.PessoaCadastroComponent)
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
