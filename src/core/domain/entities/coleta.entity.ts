import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export interface ColetaProps {
  id?: string;
  produtoId: string;
  produtorId: string;
  quantidade: number;
  unidade: string;
  dataColeta: Date;
  tecnicoId?: string;
  observacoes?: string;
  syncStatus?: SyncStatus;
}

export enum SyncStatus {
  PENDING = "PENDING",
  SYNCED = "SYNCED",
  ERROR = "ERROR",
}

export class Coleta {
  private _id: string;
  private _produtoId: string;
  private _produtorId: string;
  private _quantidade: number;
  private _unidade: string;
  private _dataColeta: Date;
  private _tecnicoId?: string;
  private _observacoes?: string;
  private _syncStatus: SyncStatus;

  constructor(props: ColetaProps) {
    this._id = props.id || uuidv4();
    this._produtoId = props.produtoId;
    this._produtorId = props.produtorId;
    this._quantidade = props.quantidade;
    this._unidade = props.unidade;
    this._dataColeta = props.dataColeta;
    this._tecnicoId = props.tecnicoId;
    this._observacoes = props.observacoes;
    this._syncStatus = props.syncStatus || SyncStatus.PENDING;

    this.validate();
  }

  private validate(): void {
    if (!this._produtoId || this._produtoId.trim().length === 0) {
      throw new Error("Produto é obrigatório");
    }

    if (!this._produtorId || this._produtorId.trim().length === 0) {
      throw new Error("Produtor é obrigatório");
    }

    if (this._quantidade <= 0) {
      throw new Error("Quantidade deve ser maior que zero");
    }

    if (!this._unidade || this._unidade.trim().length === 0) {
      throw new Error("Unidade é obrigatória");
    }

    if (!this._dataColeta || isNaN(this._dataColeta.getTime())) {
      throw new Error("Data de coleta inválida");
    }
  }

  // Getters
  get id(): string {
    return this._id;
  }
  get produtoId(): string {
    return this._produtoId;
  }
  get produtorId(): string {
    return this._produtorId;
  }
  get quantidade(): number {
    return this._quantidade;
  }
  get unidade(): string {
    return this._unidade;
  }
  get dataColeta(): Date {
    return this._dataColeta;
  }
  get tecnicoId(): string | undefined {
    return this._tecnicoId;
  }
  get observacoes(): string | undefined {
    return this._observacoes;
  }
  get syncStatus(): SyncStatus {
    return this._syncStatus;
  }

  // Setters com validação
  atualizarQuantidade(novaQuantidade: number): void {
    if (novaQuantidade <= 0) {
      throw new Error("Quantidade deve ser maior que zero");
    }
    this._quantidade = novaQuantidade;
  }

  atualizarObservacoes(observacoes: string): void {
    this._observacoes = observacoes;
  }

  marcarComoEnviado(): void {
    this._syncStatus = SyncStatus.SYNCED;
  }

  marcarComoErro(): void {
    this._syncStatus = SyncStatus.ERROR;
  }

  // Métodos de domínio
  formatarParaExibicao(): string {
    return `${this._quantidade} ${this._unidade}`;
  }

  // Factory method
  static criar(props: Omit<ColetaProps, "id" | "dataColeta">): Coleta {
    return new Coleta({
      ...props,
      dataColeta: new Date(),
    });
  }

  // Para serialização
  toJSON(): any {
    return {
      id: this._id,
      produtoId: this._produtoId,
      produtorId: this._produtorId,
      quantidade: this._quantidade,
      unidade: this._unidade,
      dataColeta: this._dataColeta.toISOString(),
      tecnicoId: this._tecnicoId,
      observacoes: this._observacoes,
      syncStatus: this._syncStatus,
    };
  }

  // Para deserialização
  static fromJSON(json: any): Coleta {
    return new Coleta({
      id: json.id,
      produtoId: json.produtoId,
      produtorId: json.produtorId,
      quantidade: json.quantidade,
      unidade: json.unidade,
      dataColeta: new Date(json.dataColeta),
      tecnicoId: json.tecnicoId,
      observacoes: json.observacoes,
      syncStatus: json.syncStatus,
    });
  }
}
