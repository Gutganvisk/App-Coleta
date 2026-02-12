export const produtos = [
  { id: 0, nome: "Selecione o Produto" },
  { id: 1, nome: "Abacaxi" },
  { id: 2, nome: "Abóbora" },
  { id: 3, nome: "Banana" },
  { id: 4, nome: "Batata Doce" },
  { id: 5, nome: "Carne Suína" },
  { id: 6, nome: "Carne Bonvina" },
  { id: 7, nome: "Cebola" },
  { id: 8, nome: "Farinha Amarela" },
  { id: 9, nome: "Farinha de Tapioca" },
  { id: 10, nome: "Fécula" },
  { id: 11, nome: "Goma Regional" },
  { id: 12, nome: "Laranja" },
  { id: 13, nome: "Limão" },
  { id: 14, nome: "Macaxeira" },
  { id: 15, nome: "Mamão" },
  { id: 16, nome: "Peixe" },
  { id: 17, nome: "Pepino" },
  { id: 18, nome: "Pimentão" },
  { id: 19, nome: "Polpa de Açai" },
  { id: 20, nome: "Polpa de Acerola" },
  { id: 21, nome: "Polpa de Cupuaçu" },
  { id: 22, nome: "Polpa de Maracuja" },
];

export const feirante = [
  { id: 0, nome: "Selecione o Feirante" },
  { id: 1, nome: "Alfredo" },
  { id: 2, nome: "Amarildo" },
  { id: 3, nome: "Ariel" },
  { id: 4, nome: "Irmã" },
  { id: 5, nome: "Marcelo" },
  { id: 6, nome: "Naldo" },
  { id: 7, nome: "Piauí" },
  { id: 8, nome: "Tonhão" },
  { id: 9, nome: "Fabiano" },
  { id: 10, nome: "Tica" },
  { id: 11, nome: "Branca" },
  { id: 12, nome: "Fininho" },
  { id: 13, nome: "Nonato" },
  { id: 14, nome: "Francisco" },
  { id: 15, nome: "Feitosa" },
  { id: 16, nome: "Chapéu" },
  { id: 17, nome: "Dga" },
  { id: 18, nome: "Carlos" },
  { id: 19, nome: "Cabeça" },
  { id: 20, nome: "Serrote" },
  { id: 21, nome: "Cicatriz" },
  { id: 22, nome: "Marcia" },
  { id: 23, nome: "Tiago" },
  { id: 24, nome: "Crezilda" },
  { id: 25, nome: "Gaúcho" },
  { id: 26, nome: "Polpa" },
  { id: 27, nome: "Açougue" },
];

export let registros: Array<{
  id: number;
  produto: string;
  feirante: string;
  quantidade: string;
  data: string;
}> = [];

export function adicionarRegistro(registro: Omit<typeof registros[0], 'id'>) {
  const novoRegistro = {
    id: registros.length + 1,
    ...registro
  };
  registros.push(novoRegistro);
  return novoRegistro;
}

export function listarRegistros() {
  return [...registros];
}