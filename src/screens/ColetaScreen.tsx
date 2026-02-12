import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Alert, Keyboard, ScrollView, Pressable } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { Logo } from '../../assets/index';
import { produtos, feirante, adicionarRegistro } from "../data/dataBase";

interface AppProps {
  onAdd?: (registro: {
    produto: string;
    feirante: string;
    quantidade: string;
    data: string;
  }) => void;
}

export default function App({ onAdd }: AppProps) {
  const [feiranteSelecionado, setFeiranteSelecionado] = useState(feirante[0]?.nome || "Selecione o Feirante");
  const [produtoSelecionado, setProdutoSelecionado] = useState<number>(produtos[0]?.id || 0);
  const [quantidade, setQuantidade] = useState("");

  const handlerAdicionar = () => {
    if (feiranteSelecionado === "Selecione o Feirante") {
      Alert.alert("Erro", "Por favor, selecione um feirante.");
      return;
    }
    if (produtoSelecionado === 0) {
      Alert.alert("Erro", "Por favor, selecione um produto.");
      return;
    }
    if (!quantidade || isNaN(Number(quantidade)) || Number(quantidade) <= 0) {
      Alert.alert("Erro", "Por favor, insira uma quantidade válida.");
      return;
    }
      const produtoEncontrado = produtos.find(p=> p.id === produtoSelecionado)

      if (!produtoEncontrado) {
        Alert.alert("Erro", "Produto não encontrado")
        return
      }

      const dataAtual = new Date();
      const dataFormatada = dataAtual.toLocaleDateString('pt-BR');

      const registro = {
        produto: produtoEncontrado.nome,
        feirante: feiranteSelecionado,
        quantidade: quantidade.trim(),
        data: dataFormatada,
      };

      adicionarRegistro(registro)

      if (onAdd) {
        onAdd(registro);
      }

      setQuantidade("")
      
      Alert.alert(
        "Registro adicionado com sucesso!", 
        `Feirante: ${registro.feirante}\n
        Produto: ${registro.produto}\n
        Quantidade: ${registro.quantidade}\n
        Dia: ${registro.data}`,
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancelado"),
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => console.log(registro),
          },
        ]
      );
      console.log("Registro adicionado: ", registro)
      setFeiranteSelecionado("Selecione um feirante...");
      setProdutoSelecionado(0);
      setQuantidade("");
    }

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <View>
          <Image source={Logo} style={styles.logo}/>
          {/* <Text>LOGO AQUI</Text> */}
        </View>
        <View style={styles.formContainer}>
        <Text style={styles.title}>Feirante</Text>
        <View style={styles.pickerContainer}>
          <Picker 
            selectedValue={feiranteSelecionado} 
            onValueChange={setFeiranteSelecionado} 
            style={styles.picker}
            dropdownIconColor="#2E7D32"
          >
            {feirante.map(p => (
              <Picker.Item 
              key={p.id} 
              label={p.nome} 
              value={p.nome} 
              color={p.id === 0 ? "#999" : "#000"}/>
            ))}
          </Picker>
        </View>
        <Text style={styles.title}>Produto</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={produtoSelecionado} 
            onValueChange={setProdutoSelecionado} 
            style={styles.picker}
            dropdownIconColor="#2E7D32"
            >
            {produtos.map(p => (
              <Picker.Item 
              key={p.id} 
              label={p.nome} 
              value={p.id} 
              color={p.id === 0 ? "#999" : "#000"}/>
            ))}
          </Picker>
        </View>
        <Text style={styles.title}>Quantidade</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={quantidade}
          onChangeText={setQuantidade}
          placeholder="Digite a quantidade"
          placeholderTextColor="#999"
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            (!produtoSelecionado || !feiranteSelecionado || !quantidade) && styles.buttonDisabled
          ]}
          onPress={() => {
            Keyboard.dismiss()
            handlerAdicionar
          }}
          disabled={!produtoSelecionado || !feiranteSelecionado || !quantidade}
        >
          {({ pressed }) => (
            <Text style={[
                styles.buttonText,                
                pressed && styles.buttonTextPressed
            ]}>
              Adicionar Registro
            </Text>
          )}
        </Pressable>
        <StatusBar style="auto" />

        <View style={styles.bottomSpace} />

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: { 
    padding: 20,
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  title: { 
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 10,
  },
    pickerContainer: {
    borderWidth: 1,
    borderColor: "#bebebe",
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
    picker: {
    height:50,
    width: '100%',
    borderWidth: 1,
    borderColor: "#bebebe",
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  input: { 
    borderWidth: 1,
    borderColor: '#bebebe',
    padding: 12,
    paddingBottom: 16,
    marginBottom: 40,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    width: '100%',
   },
  logo: {
    height: 180,
    aspectRatio: 3344 / 2077,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
    alignSelf: 'flex-end',
    minWidth: 200,
  },
  buttonPressed: {
  backgroundColor: "#1B5E20",
  transform: [{ scale: 0.98 }],
  },
  buttonTextPressed: {
    color: "#fff",
  },
  buttonDisabled: {
    backgroundColor: "#9E9E9E",
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: 'center',
    fontSize: 16,
  },
  bottomSpace: {
    height: 60,
    width: '100%',
  },
});