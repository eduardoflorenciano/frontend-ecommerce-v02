import { ChangeDetectorRef, Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { Loginlistmodel } from '../../../models/loginlistmodel';
import { LoginlistService } from '../../../services/loginlist.service';
import { SessaoService } from '../../../services/sessao.service';
import { AlterarSenha } from '../alterar-senha/alterar-senha';
import { Logindatails } from '../logindatails/logindatails';

@Component({
  standalone: true,
  imports: [MdbFormsModule, MdbModalModule, Logindatails, FormsModule, AlterarSenha],
  selector: 'app-loginlist',
  templateUrl: './loginlist.html',
  styleUrl: './loginlist.scss',
})
export class Loginlist {
  private readonly modalService = inject(MdbModalService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly loginlistService = inject(LoginlistService);
  private readonly sessaoService = inject(SessaoService);

  @ViewChild('modalLogin') modalLogin!: TemplateRef<unknown>;
  @ViewChild('modalSenha') modalSenha!: TemplateRef<unknown>;
  modalLoginRef!: MdbModalRef<unknown>;
  modalSenhaRef!: MdbModalRef<unknown>;

  form: Loginlistmodel = {
    nome: '',
    telefone: '',
    senha: '',
  };

  abrirCadastro(): void {
    this.modalLoginRef = this.modalService.open(this.modalLogin);
  }

  abrirNovaSenha(): void {
    this.modalSenhaRef = this.modalService.open(this.modalSenha);
  }

  retornoDetalhe(cliente: { id: number; nome: string }): void {
    this.sessaoService.entrar({ id: cliente.id, nome: cliente.nome });
    this.modalLoginRef.close();
    this.cdr.detectChanges();
  }

  retornoNovaSenha(): void {
    this.modalSenhaRef.close();
    this.cdr.detectChanges();
  }

  salvarItem(): void {
    const credenciais: Loginlistmodel = {
      nome: this.form.nome,
      telefone: this.form.telefone,
      senha: this.form.senha,
    };

    this.loginlistService.logar(credenciais).subscribe({
      next: (resposta) => {
        this.sessaoService.entrar({ id: null, nome: resposta.nome });
        Swal.fire({
          icon: 'success',
          title: 'Login realizado!',
          text: resposta.mensagem,
        });
      },
      error: (erro) => {
        console.error('Erro ao entrar:', erro);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao entrar',
          text: erro?.error?.message ?? 'Não foi possível realizar o login',
        });
      },
    });
  }
}
