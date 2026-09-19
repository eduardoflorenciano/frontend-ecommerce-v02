import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';
import { AlterarSenhaModel } from '../../../models/alterar-senha-model';
import { AlterarSenhaService } from '../../../services/alterar-senha.service';
import { SessaoService } from '../../../services/sessao.service';

@Component({
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  selector: 'app-alterar-senha',
  styleUrl: './alterar-senha.scss',
  templateUrl: './alterar-senha.html',
})
export class AlterarSenha {
  private readonly alterarSenhaService = inject(AlterarSenhaService);
  private readonly sessaoService = inject(SessaoService);

  @Output() retorno = new EventEmitter<AlterarSenhaModel>();

  form: AlterarSenhaModel = {
    nome: '',
    senha: '',
    confirmarSenha: '',
  };

  salvarSenha(): void {
    const clienteId = this.sessaoService.cliente()?.id;

    if (!clienteId) {
      Swal.fire({
        icon: 'warning',
        title: 'Não foi possível identificar sua conta',
        text: 'Cadastre-se novamente ou peça para o time do back-end incluir o id na resposta de login',
      });
      return;
    }

    const dados: AlterarSenhaModel = {
      nome: this.form.nome,
      senha: this.form.senha,
      confirmarSenha: this.form.confirmarSenha,
    };

    this.alterarSenhaService.atualizar(clienteId, dados).subscribe({
      next: (resposta) => {
        this.retorno.emit(dados);
        Swal.fire({
          icon: 'success',
          title: 'Senha alterada com sucesso!',
          text: resposta.mensagem,
        });
      },
      error: (erro) => {
        console.error('Erro ao alterar senha:', erro);
        this.retorno.emit(this.form);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao mudar a senha',
          text: erro?.error?.message ?? 'Não foi possível trocar a senha',
        });
      },
    });
  }
}
