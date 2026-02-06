// src/core/domain/repositories/IProdutoRepository.ts
import { Produto } from "../entities/produto.entity";

export interface IProdutoRepository {
  salvar(produto: Produto): Promise<void>;
  buscarPorId(id: string): Promise<Produto | null>;
  buscarTodos(): Promise<Produto[]>;
  buscarPorNome(nome: string): Promise<Produto[]>;
  buscarPorCategoria(categoria: string): Promise<Produto[]>;
  excluir(id: string): Promise<void>;
}
