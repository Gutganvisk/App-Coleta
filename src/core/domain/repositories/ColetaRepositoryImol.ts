// src/infrastructure/data/local/repositories/ColetaRepositoryImpl.ts
import { IColetaRepository } from "../../../core/domain/repositories/IColetaRepository";
import {
  Coleta,
  SyncStatus,
} from "../../../core/domain/entities/coleta.entity";
import {
  ColetaMapper,
  ColetaEntity,
} from "../../../infra/data/local/mappers/ColetaMapper";
import { expoDatabase } from "../../../infra/data/local/dataBase/DataBase";
import { ProdutoMapper } from "../../../infra/data/local/mappers/ProdutoMapper";
import { ProdutorMapper } from "../../../infra/data/local/mappers/ProdutorMapper";

export class ColetaRepositoryImpl implements IColetaRepository {
  private mapper: ColetaMapper;

  constructor() {
    const produtoMapper = new ProdutoMapper();
    const produtorMapper = new ProdutorMapper();
    this.mapper = new ColetaMapper(produtoMapper, produtorMapper);
  }

  async salvar(coleta: Coleta): Promise<void> {
    try {
      const entity = this.mapper.toEntity(coleta);

      await expoDatabase.execute(
        `INSERT OR REPLACE INTO coletas (
          id, produto_id, produtor_id, quantidade, unidade, 
          data_coleta, tecnico_id, observacoes, sync_status,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          entity.id,
          entity.produto_id,
          entity.produtor_id,
          entity.quantidade,
          entity.unidade,
          entity.data_coleta,
          entity.tecnico_id || null,
          entity.observacoes || null,
          entity.sync_status,
          entity.created_at,
          entity.updated_at,
        ],
      );
    } catch (error) {
      console.error("Erro ao salvar coleta:", error);
      throw new Error(`Falha ao salvar coleta: ` + error);
    }
  }

  async buscarPorId(id: string): Promise<Coleta | null> {
    try {
      const rows = await expoDatabase.query<ColetaEntity>(
        `SELECT c.*, p.nome as produto_nome, pr.nome as produtor_nome
         FROM coletas c
         LEFT JOIN produtos p ON c.produto_id = p.id
         LEFT JOIN produtores pr ON c.produtor_id = pr.id
         WHERE c.id = ?`,
        [id],
      );

      if (rows.length === 0) return null;

      return this.mapper.toDomain(rows[0]);
    } catch (error) {
      console.error("Erro ao buscar coleta por ID:", error);
      throw new Error(`Falha ao buscar coleta: ` + error);
    }
  }

  async buscarPorData(data: Date): Promise<Coleta[]> {
    try {
      const startOfDay = new Date(data);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(data);
      endOfDay.setHours(23, 59, 59, 999);

      const rows = await expoDatabase.query<
        ColetaEntity & { produto_nome: string; produtor_nome: string }
      >(
        `SELECT c.*, p.nome as produto_nome, pr.nome as produtor_nome
         FROM coletas c
         LEFT JOIN produtos p ON c.produto_id = p.id
         LEFT JOIN produtores pr ON c.produtor_id = pr.id
         WHERE c.data_coleta BETWEEN ? AND ?
         ORDER BY c.data_coleta DESC`,
        [startOfDay.getTime(), endOfDay.getTime()],
      );

      return rows.map((row) => this.mapper.toDomain(row));
    } catch (error) {
      console.error("Erro ao buscar coletas por data:", error);
      throw new Error(`Falha ao buscar coletas: ` + error);
    }
  }

  async buscarPorPeriodo(dataInicio: Date, dataFim: Date): Promise<Coleta[]> {
    try {
      const rows = await expoDatabase.query<ColetaEntity>(
        `SELECT c.*, p.nome as produto_nome, pr.nome as produtor_nome
         FROM coletas c
         LEFT JOIN produtos p ON c.produto_id = p.id
         LEFT JOIN produtores pr ON c.produtor_id = pr.id
         WHERE c.data_coleta BETWEEN ? AND ?
         ORDER BY c.data_coleta DESC`,
        [dataInicio.getTime(), dataFim.getTime()],
      );

      return rows.map((row) => this.mapper.toDomain(row));
    } catch (error) {
      console.error("Erro ao buscar coletas por período:", error);
      throw new Error(`Falha ao buscar coletas: ` + error);
    }
  }

  async excluir(id: string): Promise<void> {
    try {
      await expoDatabase.execute("DELETE FROM coletas WHERE id = ?", [id]);
    } catch (error) {
      console.error("Erro ao excluir coleta:", error);
      throw new Error(`Falha ao excluir coleta: ` + error);
    }
  }

  async atualizar(coleta: Coleta): Promise<void> {
    try {
      const entity = this.mapper.toEntity(coleta);

      await expoDatabase.execute(
        `UPDATE coletas SET
          produto_id = ?,
          produtor_id = ?,
          quantidade = ?,
          unidade = ?,
          data_coleta = ?,
          tecnico_id = ?,
          observacoes = ?,
          sync_status = ?,
          updated_at = ?
         WHERE id = ?`,
        [
          entity.produto_id,
          entity.produtor_id,
          entity.quantidade,
          entity.unidade,
          entity.data_coleta,
          entity.tecnico_id || null,
          entity.observacoes || null,
          entity.sync_status,
          Date.now(),
          entity.id,
        ],
      );
    } catch (error) {
      console.error("Erro ao atualizar coleta:", error);
      throw new Error(`Falha ao atualizar coleta: ` + error);
    }
  }

  async buscarPendentesSincronizacao(): Promise<Coleta[]> {
    try {
      const rows = await expoDatabase.query<ColetaEntity>(
        `SELECT c.*, p.nome as produto_nome, pr.nome as produtor_nome
         FROM coletas c
         LEFT JOIN produtos p ON c.produto_id = p.id
         LEFT JOIN produtores pr ON c.produtor_id = pr.id
         WHERE c.sync_status = ?
         ORDER BY c.created_at ASC`,
        [SyncStatus.PENDING],
      );

      return rows.map((row) => this.mapper.toDomain(row));
    } catch (error) {
      console.error("Erro ao buscar coletas pendentes:", error);
      throw new Error(`Falha ao buscar coletas pendentes: ` + error);
    }
  }

  async buscarPorSyncStatus(status: SyncStatus): Promise<Coleta[]> {
    try {
      const rows = await expoDatabase.query<ColetaEntity>(
        `SELECT c.*, p.nome as produto_nome, pr.nome as produtor_nome
         FROM coletas c
         LEFT JOIN produtos p ON c.produto_id = p.id
         LEFT JOIN produtores pr ON c.produtor_id = pr.id
         WHERE c.sync_status = ?
         ORDER BY c.created_at DESC`,
        [status],
      );

      return rows.map((row) => this.mapper.toDomain(row));
    } catch (error) {
      console.error("Erro ao buscar coletas por status:", error);
      throw new Error(`Falha ao buscar coletas: ` + error);
    }
  }

  async atualizarSyncStatus(id: string, status: SyncStatus): Promise<void> {
    try {
      await expoDatabase.execute(
        `UPDATE coletas SET
          sync_status = ?,
          updated_at = ?
         WHERE id = ?`,
        [status, Date.now(), id],
      );
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      throw new Error(`Falha ao atualizar status: ` + error);
    }
  }

  async contarPorData(data: Date): Promise<number> {
    try {
      const startOfDay = new Date(data);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(data);
      endOfDay.setHours(23, 59, 59, 999);

      const rows = await expoDatabase.query<{ count: number }>(
        `SELECT COUNT(*) as count FROM coletas
         WHERE data_coleta BETWEEN ? AND ?`,
        [startOfDay.getTime(), endOfDay.getTime()],
      );

      return rows[0]?.count || 0;
    } catch (error) {
      console.error("Erro ao contar coletas:", error);
      return 0;
    }
  }

  async somarQuantidadePorData(data: Date): Promise<number> {
    try {
      const startOfDay = new Date(data);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(data);
      endOfDay.setHours(23, 59, 59, 999);

      const rows = await expoDatabase.query<{ total: number }>(
        `SELECT SUM(quantidade) as total FROM coletas
         WHERE data_coleta BETWEEN ? AND ?`,
        [startOfDay.getTime(), endOfDay.getTime()],
      );

      return rows[0]?.total || 0;
    } catch (error) {
      console.error("Erro ao somar quantidades:", error);
      return 0;
    }
  }

  async buscarPorProduto(produtoId: string): Promise<Coleta[]> {
    try {
      const rows = await expoDatabase.query<ColetaEntity>(
        `SELECT c.*, p.nome as produto_nome, pr.nome as produtor_nome
         FROM coletas c
         LEFT JOIN produtos p ON c.produto_id = p.id
         LEFT JOIN produtores pr ON c.produtor_id = pr.id
         WHERE c.produto_id = ?
         ORDER BY c.data_coleta DESC`,
        [produtoId],
      );

      return rows.map((row) => this.mapper.toDomain(row));
    } catch (error) {
      console.error("Erro ao buscar coletas por produto:", error);
      throw new Error(`Falha ao buscar coletas: ` + error);
    }
  }

  async buscarPorProdutor(produtorId: string): Promise<Coleta[]> {
    try {
      const rows = await expoDatabase.query<ColetaEntity>(
        `SELECT c.*, p.nome as produto_nome, pr.nome as produtor_nome
         FROM coletas c
         LEFT JOIN produtos p ON c.produto_id = p.id
         LEFT JOIN produtores pr ON c.produtor_id = pr.id
         WHERE c.produtor_id = ?
         ORDER BY c.data_coleta DESC`,
        [produtorId],
      );

      return rows.map((row) => this.mapper.toDomain(row));
    } catch (error) {
      console.error("Erro ao buscar coletas por produtor:", error);
      throw new Error(`Falha ao buscar coletas: ` + error);
    }
  }
}
