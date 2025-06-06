import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import styles from './LoginScreenStyles'; // Importa os estilos do mesmo diretório
import { api } from '../../../services/api'; // Ajusta o caminho da API
import { useNavigation } from '@react-navigation/native'; // Importa o hook useNavigation
import { StackNavigationProp } from '@react-navigation/stack'; // Importa a tipagem para navegação
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa o AsyncStorage
import { RootStackParamList } from '../../navigation/types'; // Importa a tipagem centralizada

// Define a tipagem da propriedade navigation para LoginScreen
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>(); // Obtém a instância de navegação

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha email e senha.');
      return;
    }

    setIsLoading(true);
    console.log('Tentando fazer login com:', { email, password });
    try {
      console.log('Fazendo requisição para:', api.defaults.baseURL + '/userauth');
      const response = await api.post('/userauth', {
        email: email.trim(),
        password: password
      });
      
      console.log('Resposta do servidor:', response.data);
      
      if (response.data && response.data.token) {
        console.log('Token recebido, salvando no AsyncStorage');
        await AsyncStorage.setItem('userToken', response.data.token);
        
        Alert.alert('Sucesso', 'Login realizado com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('Dashboard', { userData: response.data }) }
        ]);
      } else {
        console.error('Resposta do servidor não contém token:', response.data);
        throw new Error('Resposta inválida do servidor');
      }
    } catch (error: any) {
      console.error('Erro detalhado:', error);
      console.error('Resposta do erro:', error.response?.data);
      console.error('Status do erro:', error.response?.status);
      
      let errorMessage = 'Email ou senha inválidos.';
      
      if (error.response) {
        console.log('Erro na resposta:', error.response.data);
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        console.log('Erro na requisição:', error.request);
        errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.';
      } else {
        console.log('Erro na configuração da requisição:', error.message);
        errorMessage = 'Erro ao configurar a requisição.';
      }
      
      Alert.alert('Erro no Login', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Lógica para login com Google
    console.log('Login com Google');
    Alert.alert('Login com Google', 'Funcionalidade a ser implementada.');
  };

  const handleForgotPassword = () => {
    // Lógica para esqueci minha senha
    console.log('Esqueci minha senha');
    Alert.alert('Esqueci minha senha', 'Funcionalidade a ser implementada.');
  };

  const handleCadastro = () => {
    // Lógica para navegar para a tela de cadastro
    console.log('Navegar para cadastro');
    // Usa navigation.navigate para ir para a tela de Cadastro
    navigation.navigate('Cadastro');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/image/MedicoOn.png')} style={styles.logo} />
      </View>

      <Text style={styles.appName}>MÉDICO ON</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
      />

      {/* Placeholder para login com Google */}
      <TouchableOpacity onPress={handleGoogleLogin} disabled={isLoading}>
        <Text style={styles.googleLoginText}>faça login com google</Text>
      </TouchableOpacity>

      {/* Placeholder para Esqueci minha senha */}
      <TouchableOpacity onPress={handleForgotPassword} disabled={isLoading}>
        <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      {/* Placeholder para Não tem uma conta? cadastre */}
      <View style={styles.cadastroContainer}>
        <Text style={styles.cadastroText}>Não tem uma conta? </Text>
        <TouchableOpacity onPress={handleCadastro} disabled={isLoading}>
          <Text style={styles.cadastroLink}>cadastre</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Log in</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;