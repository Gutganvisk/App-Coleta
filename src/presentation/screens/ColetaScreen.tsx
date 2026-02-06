// src/presentation/screens/ColetaScreen.tsx - ATUALIZADO E FUNCIONAL
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/material-design-icons';
import {Picker} from '@react-native-picker/picker';


// Componentes customizados
import { TabletCard } from '../components/ui/TabletsCard';
import { CustomButton } from '../components/ui/CustomButtom';

// Temas
import { Colors, Typography, Spacing } from '../themes';

export const ColetaScreen = () => {
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [produtorSelecionado, setProdutorSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [unidade, setUnidade] = useState('kg');
  const [loading, setLoading] = useState(false);

  // Dados mockados (depois substituir pelo repositório)
  const produtos = [
    { id: '1', nome: 'Alface', unidadePadrao: 'kg' },
    { id: '2', nome: 'Tomate', unidadePadrao: 'kg' },
    { id: '3', nome: 'Cenoura', unidadePadrao: 'kg' },
    { id: '4', nome: 'Batata', unidadePadrao: 'kg' },
    { id: '5', nome: 'Cebola', unidadePadrao: 'kg' },
  ];

  const produtores = [
    { id: '101', nome: 'João Silva' },
    { id: '102', nome: 'Maria Santos' },
    { id: '103', nome: 'José Oliveira' },
  ];

  const handleSalvar = async () => {
    if (!produtoSelecionado || !produtorSelecionado || !quantidade) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios');
      return;
    }

    const quantidadeNum = parseFloat(quantidade);
    if (isNaN(quantidadeNum) || quantidadeNum <= 0) {
      Alert.alert('Erro', 'Digite uma quantidade válida (maior que zero)');
      return;
    }

    setLoading(true);

    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));

      const produto = produtos.find(p => p.id === produtoSelecionado);
      const produtor = produtores.find(p => p.id === produtorSelecionado);

      Alert.alert(
        '✅ Sucesso!',
        `Coleta registrada:\n${quantidade} ${unidade} de ${produto?.nome}\nProdutor: ${produtor?.nome}`
      );

      // Reset form
      setQuantidade('');
      
    } catch (error) {
      Alert.alert('❌ Erro', 'Não foi possível salvar a coleta');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  // Atualiza unidade quando produto muda
  useEffect(() => {
    if (produtoSelecionado) {
      const produto = produtos.find(p => p.id === produtoSelecionado);
      if (produto) {
        setUnidade(produto.unidadePadrao);
      }
    }
  }, [produtoSelecionado]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TabletCard elevated>
          {/* Header */}
          <View style={styles.header}>
            <Icon name="basket" size={40} color={Colors.primary} />
            <Text style={styles.title}>Nova Coleta</Text>
            <Text style={styles.subtitle}>Registre os produtos da feira</Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>
            {/* Produto */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Produto *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={produtoSelecionado}
                  onValueChange={(value) => {
                    setProdutoSelecionado(value);
                    setProdutorSelecionado(''); // Reset produtor
                  }}
                  style={styles.picker}
                  dropdownIconColor={Colors.primary}
                >
                  <Picker.Item 
                    label="Selecione um produto" 
                    value="" 
                    enabled={false}
                    color={Colors.disabled}
                  />
                  {produtos.map((produto) => (
                    <Picker.Item
                      key={produto.id}
                      label={`${produto.nome} (${produto.unidadePadrao})`}
                      value={produto.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Produtor */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Produtor *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={produtorSelecionado}
                  onValueChange={setProdutorSelecionado}
                  style={styles.picker}
                  enabled={!!produtoSelecionado}
                  dropdownIconColor={Colors.primary}
                >
                  <Picker.Item 
                    label={produtoSelecionado ? "Selecione um produtor" : "Primeiro selecione um produto"} 
                    value="" 
                    enabled={false}
                    color={Colors.disabled}
                  />
                  {produtores.map((produtor) => (
                    <Picker.Item
                      key={produtor.id}
                      label={produtor.nome}
                      value={produtor.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Quantidade e Unidade */}
            <View style={styles.quantidadeGroup}>
              <View style={[styles.inputGroup, { flex: 2 }]}>
                <Text style={styles.label}>Quantidade *</Text>
                <TextInput
                  value={quantidade}
                  onChangeText={setQuantidade}
                  placeholder="Ex: 10"
                  placeholderTextColor={Colors.disabled}
                  keyboardType="numeric"
                  style={styles.input}
                  editable={!!produtoSelecionado}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: Spacing.md }]}>
                <Text style={styles.label}>Unidade</Text>
                <TouchableOpacity 
                  style={styles.unidadeContainer}
                  activeOpacity={0.7}
                >
                  <Text style={styles.unidadeText}>{unidade}</Text>
                  <Icon name="chevron-down" size={24} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Observações */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Observações (opcional)</Text>
              <TextInput
                placeholder="Alguma observação importante..."
                placeholderTextColor={Colors.disabled}
                style={[styles.input, styles.textArea]}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>

            {/* Botão Salvar */}
            <CustomButton
              title="ADICIONAR REGISTRO"
              onPress={handleSalvar}
              variant="primary"
              loading={loading}
              disabled={!produtoSelecionado || !produtorSelecionado || !quantidade}
              style={styles.saveButton}
              icon={<Icon name="check" size={24} color="#FFFFFF" />}
            />
          </View>
        </TabletCard>

        {/* Instruções de uso */}
        <TabletCard elevated={false} style={styles.instructionsCard}>
          <View style={styles.instructionsHeader}>
            <Icon name="lightbulb-outline" size={28} color={Colors.primary} />
            <Text style={styles.instructionsTitle}>💡 Dicas para uso em campo</Text>
          </View>
          
          <View style={styles.instructionsList}>
            <View style={styles.instructionItem}>
              <Icon name="check-circle" size={20} color={Colors.success} />
              <Text style={styles.instructionText}>
                Toque nos campos para inserir dados rapidamente
              </Text>
            </View>
            
            <View style={styles.instructionItem}>
              <Icon name="check-circle" size={20} color={Colors.success} />
              <Text style={styles.instructionText}>
                Use números para quantidade (ex: 5, 10.5)
              </Text>
            </View>
            
            <View style={styles.instructionItem}>
              <Icon name="wifi-off" size={20} color={Colors.warning} />
              <Text style={styles.instructionText}>
                O app funciona 100% offline - os dados serão sincronizados depois
              </Text>
            </View>
          </View>
        </TabletCard>

        {/* Status offline/online */}
        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <Icon name="database" size={20} color={Colors.primary} />
            <Text style={styles.statusText}>Dados salvos localmente</Text>
          </View>
          
          <View style={styles.statusItem}>
            <Icon name="sync" size={20} color={Colors.warning} />
            <Text style={styles.statusText}>Pronto para sincronizar</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.headlineMedium,
    color: Colors.primary,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  subtitle: {
    ...Typography.bodyMedium,
    color: Colors.disabled,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  form: {
    marginTop: Spacing.md,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  label: {
    ...Typography.labelLarge,
    color: Colors.onSurface,
    marginBottom: Spacing.sm,
    fontWeight: '600',
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: Colors.outline,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    overflow: 'hidden',
  },
  picker: {
    height: Spacing.tablet.input.height,
    fontSize: 18,
    color: Colors.onSurface,
  },
  quantidadeGroup: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.outline,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 18,
    color: Colors.onSurface,
    minHeight: Spacing.tablet.input.height,
  },
  textArea: {
    minHeight: 100,
    paddingTop: Spacing.md,
  },
  unidadeContainer: {
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.outline,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: Spacing.tablet.input.height,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  unidadeText: {
    fontSize: 18,
    color: Colors.onSurface,
    fontWeight: '500',
  },
  saveButton: {
    marginTop: Spacing.xl,
  },
  instructionsCard: {
    marginTop: Spacing.xl,
    backgroundColor: '#E8F5E9',
  },
  instructionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  instructionsTitle: {
    ...Typography.titleMedium,
    color: Colors.primaryDark,
    marginLeft: Spacing.sm,
    fontWeight: '600',
  },
  instructionsList: {
    marginLeft: Spacing.sm,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  instructionText: {
    ...Typography.bodyMedium,
    color: '#388E3C',
    marginLeft: Spacing.sm,
    flex: 1,
    lineHeight: 22,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
  },
  statusText: {
    ...Typography.bodySmall,
    color: Colors.primary,
    marginLeft: Spacing.xs,
    fontWeight: '500',
  },
});

export default ColetaScreen;