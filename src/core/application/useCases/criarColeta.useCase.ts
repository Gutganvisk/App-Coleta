// src/core/application/use-cases/CriarColetaUseCase.ts
import { Coleta } from "../../domain/entities/coleta.entity";
import { IColetaRepository } from "../../domain/repositories/IColetaRepository";
import { IProdutoRepository } from "../../domain/repositories/IProdutoRepository";
import { IProdutorRepository } from "../../domain/repositories/IProdutorRepository";

export interface CriarColetaCommand {
  produtoId: string;
  produtorId: string;
  quantidade: number;
  unidade: string;
  tecnicoId?: string;
  observacoes?: string;
}

export class CriarColetaUseCase {
  constructor(
    private coletaRepository: IColetaRepository,
    private produtoRepository: IProdutoRepository,
    private produtorRepository: IProdutorRepository,
  ) {}

  async execute(command: CriarColetaCommand): Promise<Coleta> {
    try {
      // 1. Validar se produto existe
      const produto = await this.produtoRepository.buscarPorId(
        command.produtoId,
      );
      if (!produto) {
        throw new Error("Produto não encontrado");
      }

      // 2. Validar se produtor existe
      const produtor = await this.produtorRepository.buscarPorId(
        command.produtorId,
      );
      if (!produtor) {
        throw new Error("Produtor não encontrado");
      }

      // 3. Criar entidade de domínio
      const coleta = Coleta.criar({
        produtoId: command.produtoId,
        produtorId: command.produtorId,
        quantidade: command.quantidade,
        unidade: command.unidade,
        tecnicoId: command.tecnicoId,
        observacoes: command.observacoes,
      });

      // 4. Salvar no repositório
      await this.coletaRepository.salvar(coleta);

      return coleta;
    } catch (error) {
      console.error("Erro ao criar coleta:", error);
      throw error;
    }
  }
}
