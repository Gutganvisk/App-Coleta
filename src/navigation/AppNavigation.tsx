import 'react-native-gesture-handler';
import React from "react";
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';


import ColetaScreen from "../screens/ColetaScreen";
import RelatoriosScreen from '../screens/RelatoriosScreen';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawer {...props} />} 

                screenOptions={{
                    drawerStyle: {
                        backgroundColor: '#fff',
                        width: 280,
                    },
                    drawerLabelStyle: {
                        fontSize: 16,
                        marginLeft: 15,
                    },
                    drawerActiveTintColor: '#2E7D32',
                    drawerInactiveTintColor: '#666',
                    headerStyle: {
                        backgroundColor: '#2E7D32',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        },
                    }}
                >
            <Drawer.Screen
            name="Coleta"
            component={ColetaScreen}
            options={{
                    drawerIcon: ({ color, size }) => (
                      <MaterialIcons name="note-add" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                    name="Relatórios"
                    component={RelatoriosScreen}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <MaterialIcons name="storage" color={color} size={size} />
                        ),
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        
    }
  })