import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import styles from './NotificationScreenStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { api } from '../../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navigation/types'; // Importa a tipagem centralizada

// Define a tipagem para a propriedade navigation
type NotificationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Notification'>;

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'reminder' | 'system';
  read: boolean;
  createdAt: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: '📅 Consultas Agendadas',
    message: 'Ex.: "Consulta com Dra. Mariana Lopes amanhã às 14h."',
    type: 'appointment',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: '🧪 Resultados Prontos',
    message: 'Ex.: "Seu exame de sangue está disponível."',
    type: 'reminder',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: '💬 Mensagens de Médicos',
    message: 'Ex.: "Dr. Pedro enviou uma mensagem sobre sua consulta."',
    type: 'system',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: '✨ Promoções',
    message: 'Ex.: "Desconto em exames laboratoriais."',
    type: 'system',
    read: false,
    createdAt: new Date().toISOString(),
  },
];

const NotificationScreen = () => {
  const navigation = useNavigation<NotificationScreenNavigationProp>();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.error('Token não encontrado');
        return;
      }

      const response = await api.get('/notifications', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setNotifications(response.data);
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setNotifications(mockNotifications);
    setLoading(false);
    // fetchNotifications();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return;

      await api.put(`/notifications/${notificationId}/read`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setNotifications(notifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      ));
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'calendar';
      case 'reminder':
        return 'alarm';
      case 'system':
        return 'information-circle';
      default:
        return 'notifications';
    }
  };

  const renderNotificationItem = ({ item, index }: { item: Notification, index: number }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.read && styles.unreadNotification,
        index === 0 && { marginTop: 48 },
      ]}
      onPress={() => markAsRead(item.id)}
    >
      <Icon
        name={getNotificationIcon(item.type)}
        size={32}
        color={'#007bff'}
        style={styles.notificationIcon}
      />
      <View style={styles.notificationContent}>
        <Text style={[styles.notificationTitle, !item.read && styles.unreadText]}>
          {item.title}
        </Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>
          {new Date(item.createdAt).toLocaleDateString('pt-BR')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Carregando notificações...</Text>
      </View>
    );
  }

  // Placeholder navigation handlers
  const handleMenuPress = () => console.log('Menu pressed');
  const handleSettingsPress = () => console.log('Settings pressed');
  const handleNotificationsPress = () => console.log('Notifications pressed');
  const handleCalendarPress = () => {
    console.log('Navegando para Agenda');
    navigation.navigate('Calendar');
  };
  const handleHomePress = async () => {
    console.log('Tentando navegar para Dashboard');
    try {
      const userDataString = await AsyncStorage.getItem('profileData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        console.log('Navegando para Dashboard com dados do usuário:', userData);
        navigation.navigate('Dashboard', { userData: userData });
      } else {
        console.log('Dados do usuário não encontrados no AsyncStorage, navegando para Dashboard sem dados.');
        navigation.navigate('Dashboard' as any);
      }
    } catch (error) {
      console.error('Erro ao carregar userData do AsyncStorage para navegação:', error);
      navigation.navigate('Dashboard' as any);
    }
  };
  const handleChatPress = () => {
    console.log('Navegando para a lista de Chats');
    navigation.navigate('ChatList');
  };
  const handleProfilePress = () => navigation.navigate('Profile' as any);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuPress}>
          <Icon name="menu" size={30} color="#1F1F1F" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
           <Icon name="notifications" size={20} color="#1F1F1F" />
           <Text style={styles.titleText}>Notificações</Text>
           <Icon name="notifications" size={20} color="#1F1F1F" />
        </View>
        <TouchableOpacity onPress={handleSettingsPress}>
          <Icon name="settings-outline" size={30} color="#1F1F1F" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.notificationsList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007bff']}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="notifications-off" size={50} color="#666" />
            <Text style={styles.emptyText}>Nenhuma notificação</Text>
          </View>
        }
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={handleNotificationsPress}>
          <Icon name="notifications" size={25} color="#007bff" />{/* Highlighted */}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCalendarPress}>
          <Icon name="calendar-outline" size={25} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHomePress}>
          <Icon name="home-outline" size={25} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleChatPress}>
          <Icon name="chatbubbles-outline" size={25} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProfilePress}>
          <Icon name="person-outline" size={25} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotificationScreen; 