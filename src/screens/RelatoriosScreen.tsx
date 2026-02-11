import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function RelatoriosScreen() {
  const navigation = useNavigation();

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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Relatórios</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total de Coletas</Text>
        <Text style={styles.cardValue}>0</Text>
      </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 16,
    color: '#666',
  },
  cardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 10,
  },
});