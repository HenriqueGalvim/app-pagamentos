import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-pessoa-cadastro',
  standalone: true,
  templateUrl: './pessoa-cadastro.component.html',
  styleUrl: './pessoa-cadastro.component.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    NgxMaskDirective
  ]
})
export class PessoaCadastroComponent {
  form: FormGroup;

constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
     });
  }

  salvar() {
    if (this.form.valid) {
      console.log('Dados salvos:', this.form.value);
    }
  }

  novo() {
    this.form.reset();
  }
}
