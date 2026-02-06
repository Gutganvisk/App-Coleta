// src/infrastructure/data/local/seed/InitialDataSeed.ts
import { DataBase } from "../dataBase/DataBase";

export const seedInitialData = async (): Promise<void> => {
  try {
    // Produtos padrão da feira
    const produtosPadrao = [
      {
        id: "1",
        nome: "Alface",
        unidade_padrao: "kg",
        descricao: "Alface crespa",
      },
      {
        id: "2",
        nome: "Tomate",
        unidade_padrao: "kg",
        descricao: "Tomate vermelho",
      },
      {
        id: "3",
        nome: "Cenoura",
        unidade_padrao: "kg",
        descricao: "Cenoura orgânica",
      },
      {
        id: "4",
        nome: "Batata",
        unidade_padrao: "kg",
        descricao: "Batata inglesa",
      },
      {
        id: "5",
        nome: "Cebola",
        unidade_padrao: "kg",
        descricao: "Cebola roxa",
      },
      {
        id: "6",
        nome: "Couve",
        unidade_padrao: "maço",
        descricao: "Couve manteiga",
      },
      {
        id: "7",
        nome: "Abóbora",
        unidade_padrao: "un",
        descricao: "Abóbora moranga",
      },
      {
        id: "8",
        nome: "Limão",
        unidade_padrao: "kg",
        descricao: "Limão tahiti",
      },
    ];

    // Produtores padrão
    const produtoresPadrao = [
      { id: "101", nome: "João Silva", telefone: "(11) 99999-9999" },
      { id: "102", nome: "Maria Santos", telefone: "(11) 98888-8888" },
      { id: "103", nome: "José Oliveira", telefone: "(11) 97777-7777" },
    ];

    // Usa transação para tudo
    await DataBase.transaction(async (tx) => {
      // Insere produtos
      for (const produto of produtosPadrao) {
        await tx.runAsync(
          `INSERT OR IGNORE INTO produtos 
           (id, nome, unidade_padrao, descricao, sync_status, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            produto.id,
            produto.nome,
            produto.unidade_padrao,
            produto.descricao,
            "SYNCED", // Já sincronizado (dados padrão)
            Date.now(),
            Date.now(),
          ],
        );
      }

      // Insere produtores
      for (const produtor of produtoresPadrao) {
        await tx.runAsync(
          `INSERT OR IGNORE INTO produtores 
           (id, nome, telefone, sync_status, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            produtor.id,
            produtor.nome,
            produtor.telefone,
            "SYNCED",
            Date.now(),
            Date.now(),
          ],
        );
      }

      // Cria algumas relações produto-produtor
      const relacoes = [
        { produto_id: "1", produtor_id: "101" }, // João vende Alface
        { produto_id: "2", produtor_id: "101" }, // João vende Tomate
        { produto_id: "3", produtor_id: "102" }, // Maria vende Cenoura
        { produto_id: "4", produtor_id: "102" }, // Maria vende Batata
        { produto_id: "5", produtor_id: "103" }, // José vende Cebola
      ];

      for (const relacao of relacoes) {
        await tx.runAsync(
          `INSERT OR IGNORE INTO produto_produtor (produto_id, produtor_id) VALUES (?, ?)`,
          [relacao.produto_id, relacao.produtor_id],
        );
      }
    });

    console.log("🌱 Dados iniciais inseridos com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao inserir dados iniciais:", error);
  }
};
