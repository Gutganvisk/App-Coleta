// src/core/domain/entities/produtor.entity.ts
import { SyncStatus } from "./coleta.entity";

export interface ProdutorProps {
  id?: string;
  nome: string;
  cpfCnpj?: string;
  telefone?: string;
  endereco?: string;
  syncStatus?: SyncStatus;
}

export class Produtor {
  private _id: string;
  private _nome: string;
  private _cpfCnpj?: string;
  private _telefone?: string;
  private _endereco?: string;
  private _syncStatus: SyncStatus;

  constructor(props: ProdutorProps) {
    this._id = props.id || uuidv4();
    this._nome = props.nome;
    this._cpfCnpj = props.cpfCnpj;
    this._telefone = props.telefone;
    this._endereco = props.endereco;
    this._syncStatus = props.syncStatus || SyncStatus.PENDING;

    this.validate();
  }

  private validate(): void {
    if (!this._nome || this._nome.trim().length === 0) {
      throw new Error("Nome do produtor é obrigatório");
    }
  }

  // Getters
  get id(): string {
    return this._id;
  }
  get nome(): string {
    return this._nome;
  }
  get cpfCnpj(): string | undefined {
    return this._cpfCnpj;
  }
  get telefone(): string | undefined {
    return this._telefone;
  }
  get endereco(): string | undefined {
    return this._endereco;
  }
  get syncStatus(): SyncStatus {
    return this._syncStatus;
  }

  // Business methods
  atualizarContato(telefone: string): void {
    this._telefone = telefone;
  }

  atualizarEndereco(endereco: string): void {
    this._endereco = endereco;
  }
}
