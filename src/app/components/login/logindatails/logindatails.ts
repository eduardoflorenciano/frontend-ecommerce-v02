import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';
import { Logindatailsmodel } from '../../../models/logindatailsmodel';
import { LogindatailsService } from '../../../services/logindatails.service';

@Component({
  standalone: true,
  selector: 'app-logindatails',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './logindatails.html',
  styleUrl: './logindatails.scss',
})
export class Logindatails {
  private readonly logindatailsService = inject(LogindatailsService);

  @Output() retorno = new EventEmitter<{ id: number; nome: string }>();

  form: Logindatailsmodel = {
    nome: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
  };

  salvar(): void {
    const cadastro: Logindatailsmodel = {
      nome: this.form.nome,
      telefone: this.form.telefone,
      senha: this.form.senha,
      confirmarSenha: this.form.confirmarSenha,
    };

    this.logindatailsService.logar(cadastro).subscribe({
      next: (resposta) => {
        this.retorno.emit({ id: resposta.id, nome: resposta.nome });
        Swal.fire({
          icon: 'success',
          title: 'Cadastro feito com sucesso!',
          text: resposta.mensagem,
        });
      },
      error: (erro) => {
        console.error('Erro ao cadastrar:', erro);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao se cadastrar',
          text: erro?.error?.message ?? 'Não foi possível fazer o seu cadastro',
        });
      },
    });
  }
}
