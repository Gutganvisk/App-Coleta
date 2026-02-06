// src/infrastructure/data/local/mappers/ProdutorMapper.ts
import {
  Produtor,
  SyncStatus,
} from "../../../../core/domain/entities/produtor.entity";

export interface ProdutorEntity {
  id: string;
  nome: string;
  cpf_cnpj?: string;
  telefone?: string;
  endereco?: string;
  sync_status: string;
  created_at: number;
  updated_at: number;
}

export class ProdutorMapper {
  toEntity(domain: Produtor): ProdutorEntity {
    return {
      id: domain.id,
      nome: domain.nome,
      cpf_cnpj: domain.cpfCnpj || null,
      telefone: domain.telefone || null,
      endereco: domain.endereco || null,
      sync_status: domain.syncStatus,
      created_at: Date.now(),
      updated_at: Date.now(),
    };
  }

  toDomain(entity: ProdutorEntity): Produtor {
    return new Produtor({
      id: entity.id,
      nome: entity.nome,
      cpfCnpj: entity.cpf_cnpj || undefined,
      telefone: entity.telefone || undefined,
      endereco: entity.endereco || undefined,
      syncStatus: entity.sync_status as SyncStatus,
    });
  }

  toViewModel(domain: Produtor): ProdutorViewModel {
    return {
      id: domain.id,
      nome: domain.nome,
      cpfCnpj: domain.cpfCnpj,
      telefone: domain.telefone,
      endereco: domain.endereco,
      displayText: domain.nome,
      displayContact: domain.telefone || "Sem contato",
    };
  }
}

export interface ProdutorViewModel {
  id: string;
  nome: string;
  cpfCnpj?: string;
  telefone?: string;
  endereco?: string;
  displayText: string;
  displayContact: string;
}
