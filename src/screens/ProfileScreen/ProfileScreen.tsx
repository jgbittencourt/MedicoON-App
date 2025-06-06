import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, TextInput, AlertButton, ActivityIndicator } from 'react-native';
import styles from './ProfileScreenStyles'; // Importa os estilos
import Icon from 'react-native-vector-icons/Ionicons'; // Importa um conjunto de ícones (ex: Ionicons)
import { useNavigation, useRoute, RouteProp, useIsFocused } from '@react-navigation/native'; // Importar useIsFocused
import { StackNavigationProp } from '@react-navigation/stack'; // Importa a tipagem para navegação
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context'; // Importa SafeAreaView
import { RootStackParamList } from '../../navigation/types'; // Importa a tipagem centralizada

// Define a tipagem para a propriedade navigation e route
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

interface ProfileData {
  nome: string;
  idade: string;
  planoSaude: string;
  historicoConsultas: string; // Pode ser removido/adaptado se o histórico for outra tela
  cidade: string;
  estado: string;
  tipoSanguineo: string;
}

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const route = useRoute<ProfileScreenRouteProp>();
  const isFocused = useIsFocused(); // Hook para saber se a tela está focada

  const [profileImageUri, setProfileImageUri] = useState<string | null>(null); // Estado para a URI da imagem de perfil
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar o modo de edição
  const [editableProfileData, setEditableProfileData] = useState<ProfileData | null>(null); // Estado para os dados do perfil que podem ser editados
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento
  const [error, setError] = useState<string | null>(null); // Estado para erros

  // --- Funções Placeholder para Interação com o Backend ---

  // Função para buscar os dados do perfil do backend
  const fetchProfileData = async (): Promise<ProfileData> => {
    console.log('Simulando busca de dados do backend...');
    return new Promise((resolve) => {
      setTimeout(() => {
        const fetchedData: ProfileData = {
          nome: 'Usuário Carregado',
          idade: '30',
          planoSaude: 'Amil',
          historicoConsultas: 'Ver Histórico',
          cidade: 'São Paulo',
          estado: 'SP',
          tipoSanguineo: 'A+',
        };
        console.log('Dados simulados buscados:', fetchedData);
        resolve(fetchedData);
      }, 1000);
    });
  };

  // Função para enviar os dados do perfil atualizados para o backend
  const updateProfileData = async (data: ProfileData) => {
    // >>> SUBSTITUA ESTA LÓGICA PELA CHAMADA REAL À SUA API PARA SALVAR DADOS DO USUÁRIO <<<
    console.log('Simulando salvamento de dados no backend:', data);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('Simulando salvamento bem-sucedido.');
        resolve();
      }, 1000); // Simula um atraso de rede
    });
  };

  // Função para carregar dados do AsyncStorage
  const loadProfileData = async () => {
    console.log('Carregando dados do perfil...');
    setLoading(true);
    setError(null);
    try {
      // Tenta carregar dados do AsyncStorage
      const savedData = await AsyncStorage.getItem('profileData');
      const savedImage = await AsyncStorage.getItem('profileImage');
      
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        console.log('Dados carregados do AsyncStorage:', parsedData);
        setEditableProfileData(parsedData);
      } else {
        // Se não houver dados salvos, usa os dados mockados
        const mockData = await fetchProfileData();
        console.log('Usando dados mockados:', mockData);
        setEditableProfileData(mockData);
        // Salva os dados mockados no AsyncStorage
        await AsyncStorage.setItem('profileData', JSON.stringify(mockData));
      }

      if (savedImage) {
        setProfileImageUri(savedImage);
      }
    } catch (err) {
      console.error('Erro ao carregar dados do perfil:', err);
      setError('Não foi possível carregar os dados do perfil.');
      Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
    } finally {
      setLoading(false);
    }
  };

  // Função para salvar dados no AsyncStorage
  const saveProfileData = async (data: ProfileData) => {
    try {
      await AsyncStorage.setItem('profileData', JSON.stringify(data));
      console.log('Dados salvos com sucesso:', data);
    } catch (err) {
      console.error('Erro ao salvar dados:', err);
      throw err;
    }
  };

  // Função para salvar imagem no Cloudinary e AsyncStorage
  const saveProfileImage = async (uri: string | null) => {
    try {
      if (uri) {
        // Salvar a URI da imagem diretamente no AsyncStorage
        await AsyncStorage.setItem('profileImage', uri);
        setProfileImageUri(uri);
      } else {
        // Se estiver removendo a imagem
        await AsyncStorage.removeItem('profileImage');
        setProfileImageUri(null);
      }
    } catch (err) {
      console.error('Erro ao salvar imagem:', err);
      Alert.alert('Erro', 'Não foi possível salvar a imagem. Tente novamente.');
      throw err;
    }
  };

  // --- Efeito para carregar dados quando a tela é focada ---

  useEffect(() => {
    if (isFocused) {
      loadProfileData();
    }
  }, [isFocused]);

  // --- Funções de Manipulação de Imagem ---

  // Função para lidar com a seleção/captura de imagem
  const handleImagePicker = () => {
    console.log('Estado profileImageUri ao abrir alerta:', profileImageUri);

    const options: AlertButton[] = [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Escolher da Galeria',
        onPress: () => pickImage(),
      },
      {
        text: 'Tirar Foto',
        onPress: () => takePhoto(),
      },
    ];

    if (profileImageUri) {
      options.push({
        text: 'Remover Foto',
        onPress: () => removePhoto(),
        style: 'destructive',
      });
    }

    Alert.alert(
      'Foto de Perfil',
      'Escolha uma opção:',
      options,
      { cancelable: true }
    );
  };

  // Função para escolher imagem da galeria
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão Necessária',
        'Por favor, conceda permissão para acessar a galeria.'
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8, // Reduzindo um pouco a qualidade para otimizar o upload
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newImageUri = result.assets[0].uri;
      try {
        await saveProfileImage(newImageUri);
      } catch (err) {
        console.error('Erro ao processar imagem:', err);
      }
    }
  };

  // Função para tirar foto com a câmera
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão Necessária',
        'Por favor, conceda permissão para acessar a câmera.'
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8, // Reduzindo um pouco a qualidade para otimizar o upload
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newImageUri = result.assets[0].uri;
      try {
        await saveProfileImage(newImageUri);
      } catch (err) {
        console.error('Erro ao processar foto:', err);
      }
    }
  };

  // Função para remover foto
  const removePhoto = async () => {
    try {
      await saveProfileImage(null);
    } catch (err) {
      console.error('Erro ao remover foto:', err);
    }
  };

  // --- Funções de Manipulação de Dados Editáveis ---

  // Função para lidar com a mudança de texto nos inputs
  const handleInputChange = (field: keyof ProfileData, value: string) => {
    // Garante que editableProfileData não seja null antes de atualizar
    if (editableProfileData) {
      setEditableProfileData({
        ...editableProfileData,
        [field]: value,
      });
    }
  };

  // Função para alternar o modo de edição e salvar
  const handleSettingsPress = async () => {
    if (isEditing) {
      if (editableProfileData) {
        setLoading(true);
        setError(null);
        try {
          await saveProfileData(editableProfileData);
          console.log('Perfil salvo com sucesso!');
          Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        } catch (err) {
          console.error('Erro ao salvar perfil:', err);
          setError('Não foi possível salvar as alterações do perfil.');
          Alert.alert('Erro', 'Não foi possível salvar as alterações.');
        } finally {
          setLoading(false);
        }
      }
    }
    setIsEditing(!isEditing);
  };

  // --- Funções de Renderização ---

  // Função auxiliar para renderizar um campo de informação (Text ou TextInput)
  const renderInfoField = (label: string, field: keyof ProfileData) => {
     // Não renderiza nada se os dados ainda não foram carregados
    if (!editableProfileData) return null;

    return (
      <TouchableOpacity 
        style={styles.infoBox} 
        disabled={!isEditing} // Desabilita toque no modo de visualização
        // onPress={() => handleInfoChipPress(label)} // Removido o clique no chip para navegação direta
      >
        <Text style={styles.infoBoxLabel}>{label}:</Text>{/* Rótulo separado para melhor control*/}
        {isEditing ? (
          <TextInput
            style={styles.infoBoxInput}
            value={editableProfileData[field] as string}
            onChangeText={(text) => handleInputChange(field, text)}
            placeholder={`ex: ${label}`}
            placeholderTextColor="#888"
          />
        ) : (
          <Text style={styles.infoBoxValue}>{editableProfileData[field]}</Text>
        )}
      </TouchableOpacity>
    );
  };

  // Função auxiliar para renderizar o campo de histórico de consultas (sempre Text)
  const renderHistoricoChip = () => (
     <TouchableOpacity 
      style={styles.infoBox} 
      onPress={() => handleInfoChipPress('Histórico de consultas')}
    >
      <Text style={styles.infoBoxValue}>{editableProfileData?.historicoConsultas || 'Carregando...'}</Text>{/* Histórico sempre como texto clicável, usando estilo de valor */}
    </TouchableOpacity>
  );

  // --- Funções de Navegação e Outros Handlers ---

  const handleInfoChipPress = (label: string) => {
    console.log(`${label} pressionado`);
    // Implementar lógica específica para cada chip, se necessário
    if (label === 'Histórico de consultas') {
      // Implementar navegação para histórico de consultas
       Alert.alert('Navegação', 'Implementar navegação para histórico de consultas.');
    }
  };

  const handleMenuPress = () => {
    console.log('Menu pressionado');
    // Implementar lógica do menu (ex: abrir drawer navigation)
     Alert.alert('Menu', 'Implementar lógica do menu.');
  };

  // Manipuladores de eventos para a barra de navegação inferior
  const handleNotificationsPress = () => {
    console.log('Navegando para Notificações');
    navigation.navigate('Notification'); // Navega para a tela de Notificação
  };
  const handleCalendarPress = () => {
    console.log('Navegando para Agenda');
    navigation.navigate('Calendar'); // Navega para a tela de Agenda
  };
  const handleHomePress = () => {
    console.log('Navegando para Dashboard');
    // Navega para o Dashboard passando os dados do perfil
    navigation.navigate('Dashboard', { 
      userData: editableProfileData 
    });
  };
  const handleChatPress = () => {
    console.log('Navegando para a lista de Chats');
    navigation.navigate('ChatList'); // Navega para a tela de lista de chats
  };
  const handleProfilePress = () => console.log('Já está no perfil');

  // --- Renderização Principal ---

  // Mostra indicador de loading ou erro enquanto os dados não são carregados
  if (loading && !editableProfileData) {
    return (
      <View style={styles.loadingContainer}> { /* Você precisará adicionar este estilo */}
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  if (error) {
    return (
       <View style={styles.errorContainer}> { /* Você precisará adicionar este estilo */}
        <Text style={styles.errorText}>{error}</Text>{ /* Você precisará adicionar este estilo */}
        {/* Opcional: Adicionar botão para tentar carregar novamente */}
        {/* <TouchableOpacity onPress={loadProfileData}><Text>Tentar Novamente</Text></TouchableOpacity> */}
      </View>
    );
  }

  // Renderiza a tela somente quando os dados estiverem carregados
  if (!editableProfileData) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleMenuPress}>
            <Icon name="menu" size={30} color="#1F1F1F" />
          </TouchableOpacity>
          <View style={styles.profileTitleContainer}>
            <Text style={styles.profileTitleText}>Perfil</Text>
          </View>
          <TouchableOpacity onPress={handleSettingsPress}>
            {loading ? (
              <ActivityIndicator size="small" color="#1F1F1F" />
            ) : (
              <Icon 
                name={isEditing ? "checkmark-circle-outline" : "settings-outline"}
                size={30} 
                color="#1F1F1F"
              />
            )}
          </TouchableOpacity>
        </View>

        {/* Imagem de perfil */}
        <TouchableOpacity style={styles.profileImageContainer} onPress={handleImagePicker}>
          {profileImageUri ? (
            <Image source={{ uri: profileImageUri }} style={styles.profileImage} />
          ) : (
            <View style={styles.avatarPlaceholderContainer}>
              <Icon name="person-circle-outline" size={100} color="#757575" />
            </View>
          )}
        </TouchableOpacity>

        {/* Nome do usuário */}
        <View style={styles.nameContainer}>
          {isEditing ? (
            <TextInput
              style={styles.nameInput}
              value={editableProfileData.nome}
              onChangeText={(text) => handleInputChange('nome', text)}
              placeholder="Digite seu nome"
              placeholderTextColor="#888"
            />
          ) : (
            <Text style={styles.nameText}>{editableProfileData.nome}</Text>
          )}
        </View>

        {/* Título Informações */}
        <View style={styles.infoTitleContainer}>
          <Text style={styles.infoTitleText}>Informações:</Text>
        </View>

        {/* Caixas de informações */}
        <View style={styles.infoBoxesContainer}>
          {renderInfoField('Idade', 'idade')}
          {renderInfoField('Plano de Saúde', 'planoSaude')}
          {renderHistoricoChip()}
          {renderInfoField('Cidade', 'cidade')}
          {renderInfoField('Estado', 'estado')}
          {renderInfoField('Tipo Sanguíneo', 'tipoSanguineo')}
        </View>

        {/* Barra de navegação inferior */}
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={handleNotificationsPress}>
            <Icon name="notifications-outline" size={25} color={styles.navIcon.color} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCalendarPress}>
            <Icon name="calendar-outline" size={25} color={styles.navIcon.color} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleHomePress}>
            <Icon name="home-outline" size={25} color={styles.navIcon.color} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChatPress}>
            <Icon name="chatbubbles-outline" size={25} color={styles.navIcon.color} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfilePress}>
            <Icon name="person-circle-outline" size={25} color={styles.navIcon.color} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen; 