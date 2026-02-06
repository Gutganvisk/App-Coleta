// src/presentation/screens/RegistrosScreen.tsx
export const RegistrosScreen = () => {
  // Comece com dados mockados
  const mockColetas = [
    { id: '1', produto: 'Alface', quantidade: 10, data: '08:30' },
    { id: '2', produto: 'Tomate', quantidade: 5, data: '09:15' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium">Registros de Hoje</Text>
        <Button mode="contained-tonal" icon="sync">
          Sincronizar
        </Button>
      </View>

      <FlatList
        data={mockColetas}
        renderItem={({ item }) => (
          <Card style={styles.cardItem}>
            <Card.Content>
              <View style={styles.itemRow}>
                <Text variant="titleMedium">{item.produto}</Text>
                <Text variant="bodyLarge">{item.quantidade} kg</Text>
              </View>
              <Text variant="bodySmall" style={styles.time}>
                {item.data}
              </Text>
            </Card.Content>
          </Card>
        )}
      />
    </SafeAreaView>
  );
};