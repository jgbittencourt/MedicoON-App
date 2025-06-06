import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import styles from './CadastroScreenStyles'; // Importa os estilos
import { api } from '../../../services/api'; // Importa a instância da API
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types'; // Importa a tipagem centralizada

type CadastroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cadastro'>;

const CadastroScreen = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState('1'); // Novo estado para level
  const [uf, setUf] = useState(''); // Novo estado para UF

  const handleCadastro = async () => {
    // Lógica de cadastro aqui
    console.log('Attempting registration with:', { nome, email, password, level, uf });
    try {
      // Adapte o endpoint '/register' e a estrutura do body conforme sua API
      const response = await api.post('/user', { // Endpoint corrigido para '/user'
        nome: nome,
        email: email,
        password: password,
        level: parseInt(level), // Converte level para número
        uf: uf.toUpperCase(), // Converte UF para maiúsculas
      });
      console.log('Registration successful:', response.data);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      // Aqui você pode adicionar a lógica de navegação para a tela de login ou outra tela
    } catch (error) {
      console.error('Registration failed:', error);
      Alert.alert('Erro no Cadastro', 'Ocorreu um erro ao cadastrar usuário.'); // Mensagem de erro genérica
    }
  };

  return (
    <View style={styles.container}>
      {/* Container para centralizar a logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/image/MedicoOn.png')} style={styles.logo} />
      </View>

      <Text style={styles.title}>Criar Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        placeholderTextColor="#888" // Adiciona placeholderTextColor
        value={nome}
        onChangeText={setNome}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888" // Adiciona placeholderTextColor
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888" // Adiciona placeholderTextColor
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Campos para Level e UF */}
      <TextInput
        style={styles.input}
        placeholder="UF (Estado)"
        placeholderTextColor="#888"
        value={uf}
        onChangeText={setUf}
        autoCapitalize="characters" // Sugere capitalizar para UF
        maxLength={2} // Limita a 2 caracteres para UF
      />

      {/* Substitui Button por TouchableOpacity para customizar o estilo */}
      <TouchableOpacity style={styles.cadastroButton} onPress={handleCadastro}>
        <Text style={styles.cadastroButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Você pode adicionar um link para voltar para o login aqui */}
    </View>
  );
};

export default CadastroScreen; 