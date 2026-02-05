import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  
  const [text, onChangeText] = React.useState('Useless text')
  const [number, onChangeNumber] = React.useState('')

  const [count, setCount] = useState(0);
  const sumCount = () => setCount(prevCount => prevCount + 1)

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value='number'
            keyboardType='numeric'
          />
        </View>
        <View style={styles.container}>
          <Text>Count: {count}</Text>
          <TouchableOpacity
            style={styles.sendBtn}
            onPress={sumCount}>
            <Text>ENVIAR</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtn: {
    backgroundColor: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    height: 40,
    padding: 20,
    margin: 12,
  }
});
