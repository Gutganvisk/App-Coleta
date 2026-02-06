// App.tsx - Versão mínima funcional
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColetaScreen } from './src/presentation/screens/ColetaScreen';
import { RegistrosScreen } from './src/presentation/screens/RegistrosScreen';
import { expoDatabase } from './src/infra/data/local/dataBase/DataBase';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        await expoDatabase.open();
        setIsReady(true);
      } catch (error) {
        console.error('Erro na inicialização:', error);
        setIsReady(true); // Continua mesmo com erro
      }
    };
    initialize();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Coleta">
          <Stack.Screen 
            name="Coleta" 
            component={ColetaScreen}
            options={{ title: 'Nova Coleta' }}
          />
          <Stack.Screen 
            name="Registros" 
            component={RegistrosScreen}
            options={{ title: 'Registros do Dia' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}