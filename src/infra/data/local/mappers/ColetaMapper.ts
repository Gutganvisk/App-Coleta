// src/infrastructure/data/local/mappers/ColetaMapper.ts
import {
  Coleta,
  SyncStatus,
} from "../../../../core/domain/entities/coleta.entity";
import { ProdutoMapper } from "../mappers/ProdutoMapper";
import { ProdutorMapper } from "../mappers/ProdutorMapper";

// Entidade do banco de dados (SQLite)
export interface ColetaEntity {
  id: string;
  produto_id: string;
  produtor_id: string;
  quantidade: number;
  unidade: string;
  data_coleta: number; // timestamp
  tecnico_id?: string;
  observacoes?: string;
  sync_status: string;
  created_at: number;
  updated_at: number;
}

// Para a API remota
export interface ColetaRemote {
  id: string;
  produtoId: string;
  produtorId: string;
  quantidade: number;
  unidade: string;
  dataColeta: string; // ISO string
  tecnicoId?: string;
  observacoes?: string;
  syncStatus: string;
  deviceId?: string;
}

export class ColetaMapper {
  constructor(
    private produtoMapper?: ProdutoMapper,
    private produtorMapper?: ProdutorMapper,
  ) {}

  // Domain → Entity (para SQLite)
  toEntity(domain: Coleta): ColetaEntity {
    return {
      id: domain.id,
      produto_id: domain.produtoId,
      produtor_id: domain.produtorId,
      quantidade: domain.quantidade,
      unidade: domain.unidade,
      data_coleta: domain.dataColeta.getTime(),
      tecnico_id: domain.tecnicoId || undefined,
      observacoes: domain.observacoes || undefined,
      sync_status: domain.syncStatus,
      created_at: Date.now(),
      updated_at: Date.now(),
    };
  }

  // Entity → Domain (do SQLite)
  toDomain(
    entity: ColetaEntity & { produto_nome?: string; produtor_nome?: string },
  ): Coleta {
    return new Coleta({
      id: entity.id,
      produtoId: entity.produto_id,
      produtorId: entity.produtor_id,
      quantidade: entity.quantidade,
      unidade: entity.unidade,
      dataColeta: new Date(entity.data_coleta),
      tecnicoId: entity.tecnico_id || undefined,
      observacoes: entity.observacoes || undefined,
      syncStatus: entity.sync_status as SyncStatus,
    });
  }

  // Domain → Remote (para API)
  toRemote(domain: Coleta, deviceId?: string): ColetaRemote {
    return {
      id: domain.id,
      produtoId: domain.produtoId,
      produtorId: domain.produtorId,
      quantidade: domain.quantidade,
      unidade: domain.unidade,
      dataColeta: domain.dataColeta.toISOString(),
      tecnicoId: domain.tecnicoId,
      observacoes: domain.observacoes,
      syncStatus: domain.syncStatus,
      deviceId,
    };
  }

  // Remote → Domain (da API)
  fromRemote(remote: ColetaRemote): Coleta {
    return new Coleta({
      id: remote.id,
      produtoId: remote.produtoId,
      produtorId: remote.produtorId,
      quantidade: remote.quantidade,
      unidade: remote.unidade,
      dataColeta: new Date(remote.dataColeta),
      tecnicoId: remote.tecnicoId,
      observacoes: remote.observacoes,
      syncStatus: remote.syncStatus as SyncStatus,
    });
  }

  // Para exibição na UI (com dados relacionados)
  toViewModel(
    domain: Coleta,
    produtoNome?: string,
    produtorNome?: string,
  ): ColetaViewModel {
    return {
      id: domain.id,
      produtoId: domain.produtoId,
      produtoNome: produtoNome || "Produto não encontrado",
      produtorId: domain.produtorId,
      produtorNome: produtorNome || "Produtor não encontrado",
      quantidade: domain.quantidade,
      unidade: domain.unidade,
      dataColeta: domain.dataColeta,
      displayDate: this.formatDate(domain.dataColeta),
      displayTime: this.formatTime(domain.dataColeta),
      displayQuantidade: `${domain.quantidade} ${domain.unidade}`,
      tecnicoId: domain.tecnicoId,
      observacoes: domain.observacoes,
      syncStatus: domain.syncStatus,
      syncIcon: this.getSyncIcon(domain.syncStatus),
      syncColor: this.getSyncColor(domain.syncStatus),
    };
  }

  // Helpers para formatação
  private formatDate(date: Date): string {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  private formatTime(date: Date): string {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  private getSyncIcon(status: SyncStatus): string {
    switch (status) {
      case SyncStatus.SYNCED:
        return "check-circle";
      case SyncStatus.PENDING:
        return "clock";
      case SyncStatus.ERROR:
        return "alert-circle";
      default:
        return "help-circle";
    }
  }

  private getSyncColor(status: SyncStatus): string {
    switch (status) {
      case SyncStatus.SYNCED:
        return "#4CAF50";
      case SyncStatus.PENDING:
        return "#FF9800";
      case SyncStatus.ERROR:
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  }
}

// ViewModel para a UI
export interface ColetaViewModel {
  id: string;
  produtoId: string;
  produtoNome: string;
  produtorId: string;
  produtorNome: string;
  quantidade: number;
  unidade: string;
  dataColeta: Date;
  displayDate: string;
  displayTime: string;
  displayQuantidade: string;
  tecnicoId?: string;
  observacoes?: string;
  syncStatus: SyncStatus;
  syncIcon: string;
  syncColor: string;
}
