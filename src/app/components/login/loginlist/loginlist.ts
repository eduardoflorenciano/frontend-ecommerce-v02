import { ChangeDetectorRef, Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { CadastroConcluido } from '../../../models/logindatailsmodel';
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
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

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

  
  retornoDetalhe(cadastro: CadastroConcluido): void {
    this.modalLoginRef.close();
    this.cdr.detectChanges();

    this.autenticar(
      { nome: cadastro.nome, telefone: cadastro.telefone, senha: cadastro.senha },
      true,
    );
  }

  retornoNovaSenha(): void {
    this.modalSenhaRef.close();
    this.cdr.detectChanges();
  }

  salvarItem(): void {
    this.autenticar(
      { nome: this.form.nome, telefone: this.form.telefone, senha: this.form.senha },
      false,
    );
  }

  private autenticar(credenciais: Loginlistmodel, aposCadastro: boolean): void {
    this.loginlistService.logar(credenciais).subscribe({
      next: (resposta) => {
        this.sessaoService.entrar(resposta.token, {
          id: resposta.id,
          nome: resposta.nome,
          perfil: resposta.perfil,
        });

        if (aposCadastro) {
          this.irParaDestino();
          return;
        }

        Swal.fire({
          icon: 'success',
          title: 'Login realizado!',
          text: resposta.mensagem,
          confirmButtonText: 'Continuar',
        }).then(() => this.irParaDestino());
      },

      error: (erro) => {
        console.error('Erro ao entrar:', erro);
        Swal.fire({
          icon: 'error',
          title: aposCadastro ? 'Cadastro feito, mas não foi possível entrar' : 'Erro ao entrar',
          text:
            erro?.error?.message ??
            (aposCadastro
              ? 'Faça login com o telefone e a senha cadastrados'
              : 'Não foi possível realizar o login'),
        });
      },
    });
  }

  
  private irParaDestino(): void {
    const redirect = this.route.snapshot.queryParamMap.get('redirect');
    const interno = !!redirect && redirect.startsWith('/') && !redirect.startsWith('//');
    this.router.navigateByUrl(interno ? redirect : '/');
  }
}
