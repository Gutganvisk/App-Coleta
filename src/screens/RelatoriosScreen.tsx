import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Registro {
  id: number;
  produto: string;
  feirante: string;
  quantidade: string;
  data: string;
}

const MOCK_REGISTROS: Registro[] = [
  { id: 1, produto: "Banana", feirante: "Alfredo", quantidade: "10.000", data: "12/02/2026" },
  { id: 2, produto: "Macaxeira", feirante: "Amarildo", quantidade: "500", data: "12/02/2026" },
  { id: 3, produto: "Polpa de Açai", feirante: "Marcelo", quantidade: "80", data: "11/02/2026" },
  { id: 4, produto: "Peixe", feirante: "Tonhão", quantidade: "349", data: "11/02/2026" },
  { id: 5, produto: "Laranja", feirante: "Piauí", quantidade: "2.579", data: "10/02/2026" },
  { id: 6, produto: "Carne Suína", feirante: "Fabiano", quantidade: "1.200", data: "10/02/2026" },
];

export default function RelatoriosScreen() {
  const navigation = useNavigation();
  const [registros, setRegistros] = React.useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todos');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity 
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={{ marginLeft: 15 }}
        >
          <MaterialIcons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    // Simula carregamento de dados
    setTimeout(() => {
      setRegistros(MOCK_REGISTROS);
      setLoading(false);
    }, 1500);
  };
  
const totalColetas = registros.length

const totalPorProduto = (produto: string) => {
  return registros.filter(r => r.produto === produto).length;
}

const registroHoje = registros.filter (r => {
  const hoje = new Date().toLocaleDateString('pt-BR');
  return r.data === hoje
})

const feirantesUnicos = [...new Set(registros.map(r => r.feirante))]
const produtosUnicos = [...new Set(registros.map(r => r.produto))]

const StatCard = ({titulo, valor, icone, cor }: any) => (
  <View style={[styles.statCard, { borderLeftColor: cor }]}>
    <MaterialIcons name={icone} size={24} color={cor}/>
    <View style={styles.statInfo}>
      <Text style={styles.statTitle}>{titulo}</Text>
      <Text style={[styles.statValue, { color:cor }]}>{valor}</Text>
    </View>
  </View>
);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Relatórios</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text style={{ marginTop: 10, color: '#666' }}>Carregando dados...</Text>
        </View>
      ) : (
        <>
          <View style={styles.statGrid}>
            <StatCard
              titulo="Total de Coletas"
              valor={totalColetas}
              icone="inventory"
              cor="#2E7D32"
            />
            <StatCard
              titulo="Coletas Hoje"
              valor={registroHoje.length}
              icone="today"
              cor="#2E7D32"
            />
            <StatCard
              titulo="Feirantes"
              valor={feirantesUnicos.length}
              icone="people"
              cor="#2E7D32"
            />
            <StatCard
              titulo="Produtos"
              valor={produtosUnicos.length}
              icone="category"
              cor="#2E7D32"
            />
          </View>

          <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coletas Recentes</Text>
          {registros.slice(0, 5).map((registro) => (
            <View key={registro.id} style={styles.registroCard}>
              <View style={styles.registroHeader}>
                <Text style={styles.registroProduto}>{registro.produto}</Text>
                <View style={styles.registroValueContainer}>
                  <Text style={styles.registroQuantidade}>{registro.quantidade}</Text>
                </View>
              </View>
              <View style={styles.registroFooter}>
                <View style={styles.registroFeirante}>
                  <MaterialIcons name="person" size={14} color="#666" />
                  <Text style={styles.registroFeiranteText}>{registro.feirante}</Text>
                </View>
                <View style={styles.registroData}>
                  <MaterialIcons name="calendar-today" size={14} color="#666" />
                  <Text style={styles.registroDataText}>{registro.data}</Text>
                </View>
              </View>
              {/* <View style={styles.registroFooter}>
                <View style={styles.registroFeirante}>
                  <MaterialIcons name="person" size={16} color="#666" />
                  <Text style={styles.registroFeiranteText}>{registro.feirante}</Text>
                </View>
                <Text style={styles.registroData}>{registro.data}</Text>
              </View> */}
              </View>
           ))}
          </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estatísticas por Produto</Text>
        {produtosUnicos.slice(0, 5).map((produto, index) => (
          <View key={produto} style={styles.topItem}>
            <View style={styles.topItemLeft}>
              <Text style={styles.topPosition}>{index + 1}º</Text>
              <Text style={styles.topProduto}>{produto}</Text>
            </View>
            <Text style={styles.topCount}>{totalPorProduto(produto)} coletas</Text>
          </View>
        ))}
      </View>
    </>
    )}
    <View style={styles.bottomSpace} />
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    padding: 20,
    paddingBlock: 10,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  statCard: {
    backgroundColor: '#f5f5f5',
    width: '48%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-start',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statInfo: {
    marginLeft: 12,
    flex: 1,
    justifyContent: 'center',
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 0,
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },
  registroCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  registroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,  
  },
  registroProduto: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  registroQuantidade: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  registroFooter: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 4,
},
registroFeirante: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 12,
},
  registroFeiranteText: {
    marginLeft: 5,
    color: '#666',
    fontSize: 14,
  },
  registroData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registroDataText: {
    marginLeft: 5,
    color: '#666',
    fontSize: 14,
  },
  topItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#eee',
    },
  topItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topPosition: {
    width: 30,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  topProduto: {
    fontSize: 16,
    color: '#333',
  },
  topCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  registroValueContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    minWidth: 80,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  bottomSpace: {
    height: 450,
    width: '100%',
  }
});