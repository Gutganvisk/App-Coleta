// src/infrastructure/data/local/mappers/ProdutoMapper.ts
import {
  Produto,
  SyncStatus,
} from "../../../../core/domain/entities/produto.entity";

export interface ProdutoEntity {
  id: string;
  nome: string;
  unidade_padrao: string;
  descricao?: string;
  categoria?: string;
  sync_status: string;
  created_at: number;
  updated_at: number;
}

export class ProdutoMapper {
  toEntity(domain: Produto): ProdutoEntity {
    return {
      id: domain.id,
      nome: domain.nome,
      unidade_padrao: domain.unidadePadrao,
      descricao: domain.descricao || undefined,
      categoria: domain.categoria || undefined,
      sync_status: domain.syncStatus,
      created_at: Date.now(),
      updated_at: Date.now(),
    };
  }

  toDomain(entity: ProdutoEntity): Produto {
    return new Produto({
      id: entity.id,
      nome: entity.nome,
      unidadePadrao: entity.unidade_padrao,
      descricao: entity.descricao || undefined,
      categoria: entity.categoria || undefined,
      syncStatus: entity.sync_status as SyncStatus,
    });
  }

  toViewModel(domain: Produto): ProdutoViewModel {
    return {
      id: domain.id,
      nome: domain.nome,
      unidadePadrao: domain.unidadePadrao,
      descricao: domain.descricao,
      categoria: domain.categoria,
      displayText: `${domain.nome} (${domain.unidadePadrao})`,
    };
  }
}

export interface ProdutoViewModel {
  id: string;
  nome: string;
  unidadePadrao: string;
  descricao?: string;
  categoria?: string;
  displayText: string;
}
