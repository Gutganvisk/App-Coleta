import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Alert, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
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

  const validarCampos = () => {
    
  };
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
        quantidade,
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
          <Text style={{color: 'red', fontSize: 20}}>UPDATE FUNCIONOU!</Text>
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
              <Picker.Item key={p.id} label={p.nome} value={p.nome} color={p.id === 0 ? "#999" : "#000"}/>
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
              <Picker.Item key={p.id} label={p.nome} value={p.id} color={p.id === 0 ? "#999" : "#000"}/>
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Keyboard.dismiss();
            handlerAdicionar();
          }}
              disabled={!produtoSelecionado || !feiranteSelecionado || !quantidade}
          activeOpacity={0.5}
          onPressIn={() => {}}
          onPressOut={() => {}}>
            <Text style={styles.buttonText}>Adicionar Registro</Text>
        </TouchableOpacity >
        <StatusBar style="light" />

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
  input: { 
    borderWidth: 1,
    borderColor: '#ccc',
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
    marginBottom: 40,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#bebebe",
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    width: '100%',
  },
  button: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    minWidth: 200,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: 'center',
  },
  bottomSpace: {
    height: 60,
    width: '100%',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#bebebe",
    borderRadius: 5,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
});