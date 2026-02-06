// src/presentation/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColetaScreen } from '../views/ColetaScreen';
import { RegistrosScreen } from '../screens/RegistrosScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
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
  );
};