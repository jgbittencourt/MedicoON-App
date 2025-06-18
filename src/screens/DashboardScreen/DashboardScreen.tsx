import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import styles from './DashboardScreenStyles'; // Importa os estilos
import Icon from 'react-native-vector-icons/Ionicons'; // Importa um conjunto de ícones (ex: Ionicons)
import { useNavigation, useRoute, RouteProp, useIsFocused } from '@react-navigation/native'; // Importa useRoute, RouteProp e useIsFocused
import { StackNavigationProp } from '@react-navigation/stack'; // Importa a tipagem para navegação
import { RootStackParamList } from '../../navigation/types'; // Importa a tipagem centralizada
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

// Define a tipagem para a propriedade navigation e route
type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;
type DashboardScreenRouteProp = RouteProp<RootStackParamList, 'Dashboard'>;

const DashboardScreen = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>(); // Obtém a instância de navegação
  const route = useRoute<DashboardScreenRouteProp>(); // Obtém os parâmetros da rota
  
  // Adicionando estado para controlar a visibilidade do badge de notificação
  const [hasNewNotifications, setHasNewNotifications] = useState(true);
  const [currentUserData, setCurrentUserData] = useState<any>(null); // Inicializar com null, vamos carregar no efeito

  const isFocused = useIsFocused(); // Hook para saber se a tela está focada

  // Efeito para carregar userData ao focar na tela, se ainda não estiver carregado
  useEffect(() => {
    console.log('Dashboard useEffect disparado. isFocused:', isFocused);
    const loadUserData = async () => {
      if (!currentUserData) { // Apenas carrega se userData ainda não estiver no estado
        console.log('currentUserData não no estado, tentando carregar do AsyncStorage');
        try {
          const userDataString = await AsyncStorage.getItem('profileData');
          console.log('Leitura do AsyncStorage (profileData):', userDataString ? 'Dados encontrados' : 'Nenhum dado');
          if (userDataString) {
            const userData = JSON.parse(userDataString);
            console.log('userData carregado e parseado do AsyncStorage:', userData);
            setCurrentUserData(userData); // Atualiza o estado
          } else {
            console.log('userData não encontrado no AsyncStorage.');
          }
        } catch (error) {
          console.error('Erro ao carregar userData do AsyncStorage:', error);
        }
      } else {
        console.log('currentUserData já no estado:', currentUserData);
      }
    };

    if (isFocused) { // Executa a lógica de carregamento quando a tela for focada
       console.log('Dashboard está focado, executando loadUserData');
       loadUserData();
    } else {
      console.log('Dashboard não está focado');
    }

  }, [isFocused]); // Rodar efeito quando o estado de foco da tela mudar

  // Acessa userData do estado
  const userData = currentUserData; 

  console.log('Dashboard renderizando. userData:', userData ? 'Disponível' : 'Indisponível');

  // Funções de navegação
  const handleProfilePress = () => {
    console.log('Navegando para Perfil');
    navigation.navigate('Profile', { userData });
  };

  const handleNotificationsPress = () => {
    console.log('Navegando para Notificações');
    navigation.navigate('Notification');
  };
  const handleCalendarPress = () => {
    console.log('Navegando para Agenda');
    navigation.navigate('Calendar'); // Navega para a tela de Agenda
  };
  const handleHomePress = () => console.log('Já está no Dashboard');
  const handleChatPress = () => {
    console.log('Navegando para a lista de Chats');
    navigation.navigate('ChatList'); // Navega para a tela de lista de chats
  };
  const handleMenuPress = () => {
    console.log('Navegando para o Menu');
    navigation.navigate('Menu');
  };
  const handleSettingsPress = () => console.log('Configurações');
  const handleSearchPress = () => console.log('Buscar');

  // Renderiza a tela somente quando os dados estiverem carregados
  if (!userData) {
    console.log('userData não disponível, renderizando nulo ou indicador de loading');
    // Você pode renderizar um loading indicator aqui ao invés de null
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="#0000ff" /></View>;
  }

  return (
    <View style={styles.container}> {/* Envolve o contêiner principal com SafeAreaView */}
      {/* Cabeçalho */}
      <View style={styles.statusBarSpacer} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuPress} style={styles.headerIconButton}>
          <Icon name="menu" size={28} color="#1F1F1F" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>Home</Text>
        </View>
        <TouchableOpacity onPress={handleSettingsPress} style={styles.headerIconButton}>
          <Icon name="settings-outline" size={28} color="#1F1F1F" />
        </TouchableOpacity>
      </View>

      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Busque por médicos,clínicas ou especialidades"
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={handleSearchPress} style={styles.searchIconContainer}>
          <Icon name="search" size={22} color="#1F1F1F" />
        </TouchableOpacity>
      </View>

      {/* Imagem central */}
      <View style={styles.centralImageContainer}>
         <Image source={require('../../../assets/image/Capturar.png')} style={styles.centralImage} />
      </View>

      {/* Texto abaixo da imagem */}
      <Text style={styles.médecinsText}>Os médicos mais próximos de você!</Text>

      {/* Barra de navegação inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={handleNotificationsPress} style={styles.bottomNavButton}>
          <View style={{ alignItems: 'center' }}>
            <Icon name="notifications-outline" size={27} style={styles.navIcon} />
            {hasNewNotifications && <View style={styles.notificationBadge} />}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCalendarPress} style={styles.bottomNavButton}>
          <Icon name="calendar-outline" size={27} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHomePress} style={styles.bottomNavButtonActive}>
          <Icon name="home-outline" size={27} style={styles.navIconActive} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleChatPress} style={styles.bottomNavButton}>
          <Icon name="chatbubbles-outline" size={27} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProfilePress} style={styles.bottomNavButton}>
          <Icon name="person-outline" size={27} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardScreen; 