// src/infrastructure/data/local/database/DataBase.ts
import * as SQLite from "expo-sqlite";

export class DataBase {
  private static instance: DataBase;
  private db: SQLite.SQLiteDatabase | null = null;

  private constructor() {}

  static getInstance(): DataBase {
    if (!DataBase.instance) {
      DataBase.instance = new DataBase();
    }
    return DataBase.instance;
  }

  // Abre o banco de dados
  async open(): Promise<SQLite.SQLiteDatabase> {
    if (!this.db) {
      this.db = await SQLite.openDatabaseAsync("feira_coleta.db");
      await this.createTables();
    }
    return this.db;
  }

  // Cria as tabelas
  private async createTables(): Promise<void> {
    const db = await this.open();

    try {
      // Tabela de Produtos
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS produtos (
          id TEXT PRIMARY KEY NOT NULL,
          nome TEXT NOT NULL,
          unidade_padrao TEXT,
          descricao TEXT,
          sync_status TEXT DEFAULT 'PENDING',
          created_at INTEGER,
          updated_at INTEGER
        );
      `);

      // Tabela de Produtores
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS produtores (
          id TEXT PRIMARY KEY NOT NULL,
          nome TEXT NOT NULL,
          cpf_cnpj TEXT,
          telefone TEXT,
          endereco TEXT,
          sync_status TEXT DEFAULT 'PENDING',
          created_at INTEGER,
          updated_at INTEGER
        );
      `);

      // Tabela de Relação Produto-Produtor
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS produto_produtor (
          produto_id TEXT NOT NULL,
          produtor_id TEXT NOT NULL,
          PRIMARY KEY (produto_id, produtor_id),
          FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
          FOREIGN KEY (produtor_id) REFERENCES produtores(id) ON DELETE CASCADE
        );
      `);

      // Tabela de Coletas
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS coletas (
          id TEXT PRIMARY KEY NOT NULL,
          produto_id TEXT NOT NULL,
          produtor_id TEXT NOT NULL,
          quantidade REAL NOT NULL,
          unidade TEXT NOT NULL,
          data_coleta INTEGER NOT NULL,
          tecnico_id TEXT,
          observacoes TEXT,
          sync_status TEXT DEFAULT 'PENDING',
          created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
          updated_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
          FOREIGN KEY (produto_id) REFERENCES produtos(id),
          FOREIGN KEY (produtor_id) REFERENCES produtores(id)
        );
      `);

      // Criar índices separadamente
      await db.execAsync(`
        CREATE INDEX IF NOT EXISTS idx_coletas_data ON coletas(data_coleta);
      `);

      await db.execAsync(`
        CREATE INDEX IF NOT EXISTS idx_coletas_sync ON coletas(sync_status);
      `);

      await db.execAsync(`
        CREATE INDEX IF NOT EXISTS idx_produto_nome ON produtos(nome);
      `);

      console.log("✅ Tabelas criadas com sucesso (Expo SQLite)");
    } catch (error) {
      console.error("❌ Erro ao criar tabelas:", error);
      throw error;
    }
  }

  // Método para executar queries SELECT (retorna array)
  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    try {
      const db = await this.open();
      return (await db.getAllAsync(sql, params)) as T[];
    } catch (error) {
      console.error("❌ Erro na query:", sql, params, error);
      throw error;
    }
  }

  // Método para executar queries que retornam um único resultado
  async querySingle<T = any>(
    sql: string,
    params: any[] = [],
  ): Promise<T | null> {
    try {
      const db = await this.open();
      const results = (await db.getAllAsync(sql, params)) as T[];
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error("❌ Erro na querySingle:", sql, params, error);
      throw error;
    }
  }

  // Método para executar INSERT/UPDATE/DELETE
  async execute(
    sql: string,
    params: any[] = [],
  ): Promise<SQLite.SQLiteRunResult> {
    try {
      const db = await this.open();
      return await db.runAsync(sql, params);
    } catch (error) {
      console.error("❌ Erro no execute:", sql, params, error);
      throw error;
    }
  }

  // Método para executar múltiplas operações em transação
  // Método transaction corrigido para retorno genérico
  async transaction<T>(callback: () => Promise<T>): Promise<T> {
    const db = await this.open();

    let result: T;

    await db.withTransactionAsync(async () => {
      result = await callback();
    });

    return result!;
  }

  // Método executeBatch corrigido
  async executeBatch(
    statements: Array<{ sql: string; args: any[] }>,
  ): Promise<void> {
    const db = await this.open();

    await db.withTransactionAsync(async () => {
      for (const stmt of statements) {
        await db.runAsync(stmt.sql, stmt.args);
      }
    });
  }

  // Método para contar registros
  async count(
    table: string,
    where?: string,
    params: any[] = [],
  ): Promise<number> {
    try {
      let sql = `SELECT COUNT(*) as count FROM ${table}`;
      if (where) {
        sql += ` WHERE ${where}`;
      }

      const result = await this.querySingle<{ count: number }>(sql, params);
      return result?.count || 0;
    } catch (error) {
      console.error("❌ Erro ao contar registros:", error);
      throw error;
    }
  }

  // Método para verificar se uma tabela existe
  async tableExists(tableName: string): Promise<boolean> {
    try {
      const result = await this.querySingle<{ name: string }>(
        `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
        [tableName],
      );
      return !!result;
    } catch (error) {
      console.error("❌ Erro ao verificar tabela:", error);
      return false;
    }
  }

  // Método para deletar todos os dados de uma tabela
  async clearTable(tableName: string): Promise<void> {
    try {
      await this.execute(`DELETE FROM ${tableName}`);
      console.log(`✅ Tabela ${tableName} limpa com sucesso`);
    } catch (error) {
      console.error(`❌ Erro ao limpar tabela ${tableName}:`, error);
      throw error;
    }
  }

  // Método para fechar o banco
  async close(): Promise<void> {
    if (this.db) {
      await this.db.closeAsync();
      this.db = null;
      console.log("✅ Banco de dados fechado");
    }
  }

  // Método para verificar se o banco está aberto
  isOpen(): boolean {
    return this.db !== null;
  }

  // Método para obter a versão do SQLite
  async getSQLiteVersion(): Promise<string> {
    try {
      const result = await this.querySingle<{ version: string }>(
        "SELECT sqlite_version() as version",
      );
      return result?.version || "Desconhecida";
    } catch (error) {
      console.error("❌ Erro ao obter versão do SQLite:", error);
      return "Erro";
    }
  }
}

// Exporta singleton
export const expoDatabase = DataBase.getInstance();

// Tipos auxiliares para facilitar o uso
export interface SQLResult<T = any> {
  rows: T[];
  insertId?: number;
  rowsAffected: number;
}

export interface ColetaRow {
  id: string;
  produto_id: string;
  produtor_id: string;
  quantidade: number;
  unidade: string;
  data_coleta: number;
  tecnico_id?: string;
  observacoes?: string;
  sync_status: string;
  created_at: number;
  updated_at: number;
}
