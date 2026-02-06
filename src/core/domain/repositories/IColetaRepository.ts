// src/core/domain/repositories/IColetaRepository.ts
import { Coleta } from "../entities/coleta.entity";
import { SyncStatus } from "../entities/coleta.entity";

export interface IColetaRepository {
  // CRUD básico
  salvar(coleta: Coleta): Promise<void>;
  buscarPorId(id: string): Promise<Coleta | null>;
  buscarPorData(data: Date): Promise<Coleta[]>;
  buscarPorPeriodo(dataInicio: Date, dataFim: Date): Promise<Coleta[]>;
  excluir(id: string): Promise<void>;
  atualizar(coleta: Coleta): Promise<void>;

  // Sincronização
  buscarPendentesSincronizacao(): Promise<Coleta[]>;
  buscarPorSyncStatus(status: SyncStatus): Promise<Coleta[]>;
  atualizarSyncStatus(id: string, status: SyncStatus): Promise<void>;

  // Estatísticas
  contarPorData(data: Date): Promise<number>;
  somarQuantidadePorData(data: Date): Promise<number>;

  // Buscas específicas
  buscarPorProduto(produtoId: string): Promise<Coleta[]>;
  buscarPorProdutor(produtorId: string): Promise<Coleta[]>;
}
