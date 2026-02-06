import { SyncStatus } from "./coleta.entity";
import 

export interface ProdutoProps {
  id?: string;
  nome: string;
  unidadePadrao: string;
  descricao?: string;
  categoria?: string;
  syncStatus?: SyncStatus;
}

export class Produto {
  private _id: string;
  private _nome: string;
  private _unidadePadrao: string;
  private _descricao?: string;
  private _categoria?: string;
  private _syncStatus: SyncStatus;

  constructor(props: ProdutoProps) {
    this._id = props.id || uuidv4();
    this._nome = props.nome;
    this._unidadePadrao = props.unidadePadrao;
    this._descricao = props.descricao;
    this._categoria = props.categoria;
    this._syncStatus = props.syncStatus || SyncStatus.PENDING;

    this.validate();
  }

  private validate(): void {
    if (!this._nome || this._nome.trim().length === 0) {
      throw new Error("Nome do produto é obrigatório");
    }

    if (!this._unidadePadrao || this._unidadePadrao.trim().length === 0) {
      throw new Error("Unidade padrão é obrigatória");
    }
  }

  // Getters
  get id(): string {
    return this._id;
  }
  get nome(): string {
    return this._nome;
  }
  get unidadePadrao(): string {
    return this._unidadePadrao;
  }
  get descricao(): string | undefined {
    return this._descricao;
  }
  get categoria(): string | undefined {
    return this._categoria;
  }
  get syncStatus(): SyncStatus {
    return this._syncStatus;
  }

  // Business methods
  alterarUnidadePadrao(novaUnidade: string): void {
    this._unidadePadrao = novaUnidade;
  }

  atualizarDescricao(descricao: string): void {
    this._descricao = descricao;
  }
}
