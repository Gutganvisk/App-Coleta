// src/infrastructure/data/local/daos/ColetaDAO.ts
import { DataBase } from "../dataBase/DataBase";
import { Coleta } from "../../../../core/domain/entities/coleta.entity";
import { ColetaMapper } from "../mappers/ColetaMapper";

export class ColetaDAO {
  private mapper = new ColetaMapper();
  private db = DataBase.getInstance();

  async salvar(coleta: Coleta): Promise<void> {
    const entity = this.mapper.toEntity(coleta);

    await this.db.execute(
      `INSERT OR REPLACE INTO coletas 
       (id, produto_id, produtor_id, quantidade, unidade, data_coleta, tecnico_id, observacoes, sync_status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        entity.id,
        entity.produto_id,
        entity.produtor_id,
        entity.quantidade,
        entity.unidade,
        entity.data_coleta,
        entity.tecnico_id || null,
        entity.observacoes || null,
        "PENDING", // Sempre começa como pendente de sync
        Date.now(),
        Date.now(),
      ],
    );
  }

  async buscarPorId(id: string): Promise<Coleta | null> {
    const rows = await this.db.query<any>(
      `SELECT c.*, p.nome as produto_nome, pr.nome as produtor_nome
       FROM coletas c
       LEFT JOIN produtos p ON c.produto_id = p.id
       LEFT JOIN produtores pr ON c.produtor_id = pr.id
       WHERE c.id = ?`,
      [id],
    );

    if (rows.length === 0) {
      return null;
    }

    return this.mapper.toDomain(rows[0]);
  }

  async buscarPorData(data: Date): Promise<Coleta[]> {
    const startOfDay = new Date(data);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(data);
    endOfDay.setHours(23, 59, 59, 999);

    const rows = await this.db.query<any>(
      `SELECT c.*, p.nome as produto_nome, pr.nome as produtor_nome
       FROM coletas c
       LEFT JOIN produtos p ON c.produto_id = p.id
       LEFT JOIN produtores pr ON c.produtor_id = pr.id
       WHERE c.data_coleta BETWEEN ? AND ?
       ORDER BY c.data_coleta DESC`,
      [startOfDay.getTime(), endOfDay.getTime()],
    );

    return rows.map((row) => this.mapper.toDomain(row));
  }

  async buscarPorIntervaloData(
    dataInicio: Date,
    dataFim: Date,
  ): Promise<Coleta[]> {
    const startDate = new Date(dataInicio);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(dataFim);
    endDate.setHours(23, 59, 59, 999);

    const rows = await this.db.query<any>(
      `SELECT c.*, p.nome as produto_nome, pr.nome as produtor_nome
       FROM coletas c
       LEFT JOIN produtos p ON c.produto_id = p.id
       LEFT JOIN produtores pr ON c.produtor_id = pr.id
       WHERE c.data_coleta BETWEEN ? AND ?
       ORDER BY c.data_coleta DESC`,
      [startDate.getTime(), endDate.getTime()],
    );

    return rows.map((row) => this.mapper.toDomain(row));
  }

  async buscarTodos(): Promise<Coleta[]> {
    const rows = await this.db.query<any>(
      `SELECT c.*, p.nome as produto_nome, pr.nome as produtor_nome
       FROM coletas c
       LEFT JOIN produtos p ON c.produto_id = p.id
       LEFT JOIN produtores pr ON c.produtor_id = pr.id
       ORDER BY c.data_coleta DESC`,
    );

    return rows.map((row) => this.mapper.toDomain(row));
  }

  async buscarPendentesSync(): Promise<Coleta[]> {
    const rows = await this.db.query<any>(
      `SELECT c.*, p.nome as produto_nome, pr.nome as produtor_nome
       FROM coletas c
       LEFT JOIN produtos p ON c.produto_id = p.id
       LEFT JOIN produtores pr ON c.produtor_id = pr.id
       WHERE c.sync_status = 'PENDING'
       ORDER BY c.created_at ASC`,
    );

    return rows.map((row) => this.mapper.toDomain(row));
  }

  async atualizarStatusSync(
    id: string,
    status: "PENDING" | "SYNCED" | "ERROR",
  ): Promise<void> {
    await this.db.execute(
      `UPDATE coletas 
       SET sync_status = ?, updated_at = ?
       WHERE id = ?`,
      [status, Date.now(), id],
    );
  }

  async marcarComoSincronizado(id: string): Promise<void> {
    await this.atualizarStatusSync(id, "SYNCED");
  }

  async excluir(id: string): Promise<void> {
    await this.db.execute(`DELETE FROM coletas WHERE id = ?`, [id]);
  }

  async buscarPorProdutor(produtorId: string): Promise<Coleta[]> {
    const rows = await this.db.query<any>(
      `SELECT c.*, p.nome as produto_nome, pr.nome as produtor_nome
       FROM coletas c
       LEFT JOIN produtos p ON c.produto_id = p.id
       LEFT JOIN produtores pr ON c.produtor_id = pr.id
       WHERE c.produtor_id = ?
       ORDER BY c.data_coleta DESC`,
      [produtorId],
    );

    return rows.map((row) => this.mapper.toDomain(row));
  }

  async buscarPorProduto(produtoId: string): Promise<Coleta[]> {
    const rows = await this.db.query<any>(
      `SELECT c.*, p.nome as produto_nome, pr.nome as produtor_nome
       FROM coletas c
       LEFT JOIN produtos p ON c.produto_id = p.id
       LEFT JOIN produtores pr ON c.produtor_id = pr.id
       WHERE c.produto_id = ?
       ORDER BY c.data_coleta DESC`,
      [produtoId],
    );

    return rows.map((row) => this.mapper.toDomain(row));
  }

  async contarTotal(): Promise<number> {
    const result = await this.db.querySingle<{ count: number }>(
      "SELECT COUNT(*) as count FROM coletas",
    );
    return result?.count || 0;
  }

  async contarPendentesSync(): Promise<number> {
    const result = await this.db.querySingle<{ count: number }>(
      "SELECT COUNT(*) as count FROM coletas WHERE sync_status = 'PENDING'",
    );
    return result?.count || 0;
  }

  async buscarUltimasColetas(limit: number = 10): Promise<Coleta[]> {
    const rows = await this.db.query<any>(
      `SELECT c.*, p.nome as produto_nome, pr.nome as produtor_nome
       FROM coletas c
       LEFT JOIN produtos p ON c.produto_id = p.id
       LEFT JOIN produtores pr ON c.produtor_id = pr.id
       ORDER BY c.data_coleta DESC
       LIMIT ?`,
      [limit],
    );

    return rows.map((row) => this.mapper.toDomain(row));
  }
}
