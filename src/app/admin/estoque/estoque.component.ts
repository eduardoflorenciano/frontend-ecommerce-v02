import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EstoqueService } from '../../services/estoque.service';
import { ProdutoEstoqueAdmin } from '../../models/estoque.dto';

@Component({
  selector: 'app-estoque',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estoque.component.html',
  styleUrl: './estoque.component.scss',
})
export class EstoqueComponent implements OnInit {
  private readonly estoqueService = inject(EstoqueService);

  produtos: ProdutoEstoqueAdmin[] = [];

  termoBusca = '';

  carregando = false;
  erro = '';

  ngOnInit(): void {
    this.carregarEstoque();
  }

  carregarEstoque(): void {
    this.carregando = true;
    this.erro = '';

    this.estoqueService.listarEstoque().subscribe({
      next: (resposta) => {
        this.produtos = resposta;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar estoque:', erro);

        this.erro = 'Não foi possível carregar o estoque. Verifique a conexão com o servidor';
        this.carregando = false;
      },
    });
  }

  get produtosFiltrados(): ProdutoEstoqueAdmin[] {
    const termo = this.termoBusca.trim().toLowerCase();

    if (!termo) {
      return this.produtos;
    }

    return this.produtos.filter((produto) =>
      [produto.nome, produto.marca, produto.modelo, produto.medida]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(termo),
    );
  }

  get totalProdutos(): number {
    return this.produtos.length;
  }

  get totalUnidades(): number {
    return this.produtos.reduce((total, produto) => total + produto.quantidadeEstoque, 0);
  }

  get totalReservado(): number {
    return this.produtos.reduce((total, produto) => total + produto.quantidadeReservada, 0);
  }

  get totalDisponivel(): number {
    return this.produtos.reduce((total, produto) => total + produto.quantidadeDisponivel, 0);
  }

  get produtosSemEstoque(): number {
    return this.produtos.filter((produto) => produto.quantidadeDisponivel <= 0).length;
  }
}
