// src/core/domain/repositories/IProdutorRepository.ts
import { Produtor } from "../entities/produtor.entity";

export interface IProdutorRepository {
  salvar(produtor: Produtor): Promise<void>;
  buscarPorId(id: string): Promise<Produtor | null>;
  buscarTodos(): Promise<Produtor[]>;
  buscarPorProduto(produtoId: string): Promise<Produtor[]>;
  buscarPorNome(nome: string): Promise<Produtor[]>;
  excluir(id: string): Promise<void>;
}
