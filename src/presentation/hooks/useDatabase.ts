// src/presentation/hooks/useDatabase.ts
import { useEffect, useState } from "react";
import { expoDatabase } from "../../infrastructure/data/local/database/ExpoDatabase";

export const useDatabase = () => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        await expoDatabase.open();
        setIsReady(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        console.error("Erro ao inicializar banco:", err);
      }
    };

    init();
  }, []);

  return { isReady, error, database: expoDatabase };
};

// Hook específico para coletas
export const useColetas = (date: Date = new Date()) => {
  const { isReady, database } = useDatabase();
  const [coletas, setColetas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadColetas = async () => {
      if (!isReady) return;

      setLoading(true);
      try {
        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59, 999));

        const results = await database.query<any>(
          `SELECT c.*, p.nome as produto_nome 
           FROM coletas c
           LEFT JOIN produtos p ON c.produto_id = p.id
           WHERE c.data_coleta BETWEEN ? AND ?
           ORDER BY c.data_coleta DESC`,
          [startOfDay.getTime(), endOfDay.getTime()],
        );

        setColetas(results);
      } catch (error) {
        console.error("Erro ao carregar coletas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadColetas();
  }, [isReady, date]);

  return { coletas, loading, refetch: () => {} };
};
