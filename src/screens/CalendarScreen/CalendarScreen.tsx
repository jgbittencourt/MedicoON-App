import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';

type CalendarScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Calendar'>;

// Placeholder para um item da agenda
interface AgendaItem {
  id: string;
  icon: string;
  text: string;
}

const CalendarScreen = () => {
  console.log('CalendarScreen component is rendering');
  const navigation = useNavigation<CalendarScreenNavigationProp>();

  // Dados placeholder para a agenda
  const agendaData: AgendaItem[] = [
    { id: '1', icon: 'calendar-outline', text: 'Consulta com Dr. João – 20/02 às 10h' },
    { id: '2', icon: 'medkit-outline', text: 'Lembrete de Medicação: Tomar remédio às 15h' },
    { id: '3', icon: 'document-outline', text: 'Retorno com Dra. Mariana – 28/02' },
    { id: '4', icon: 'add-circle-outline', text: 'Agendamento Rápido: Botão direto para marcar consultas.' },
  ];

  console.log('Agenda data:', agendaData);

  const renderAgendaItem = ({ item, index }: { item: AgendaItem, index: number }) => {
    console.log('Rendering agenda item:', item);
    return (
      <TouchableOpacity
        style={[
          styles.agendaItem,
          index === 0 && { marginTop: 35 }, // Aumentando o espaço acima do primeiro item
        ]}
        activeOpacity={0.9}
      >
        <Icon name={item.icon} size={24} color="#007bff" style={styles.itemIcon} /> {/* Ícone azul */}
        <Text style={styles.itemText}>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  const handleMenuPress = () => console.log('Menu pressed');
  const handleSettingsPress = () => console.log('Settings pressed');

  // Manipuladores de eventos para a barra de navegação inferior
  const handleNotificationsPress = () => {
    console.log('Navegando para Notificações');
    navigation.navigate('Notification', undefined);
  };
  const handleCalendarPress = () => console.log('Calendário (atual)'); // Já está no Calendário
  const handleHomePress = () => {
    console.log('Navegando para Dashboard');
    navigation.navigate('Dashboard', {});
  };
  const handleChatPress = () => {
    console.log('Navegando para a lista de Chats');
    navigation.navigate('ChatList', undefined);
  };
  const handleProfilePress = () => {
    console.log('Navegando para Perfil');
    navigation.navigate('Profile', {});
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.statusBarSpacer} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuPress} style={styles.headerIconButton}>
          <Icon name="menu" size={28} color="#1F1F1F" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>Minha Agenda</Text>
        </View>
        <TouchableOpacity onPress={handleSettingsPress} style={styles.headerIconButton}>
          <Icon name="settings-outline" size={28} color="#1F1F1F" />
        </TouchableOpacity>
      </View>

      {/* Agenda List */}
      <FlatList
        data={agendaData}
        renderItem={({ item, index }) => renderAgendaItem({ item, index })}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.agendaList}
        ListEmptyComponent={<Text>Nenhum item na agenda.</Text>}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={handleNotificationsPress} style={styles.bottomNavButton}>
          <Icon name="notifications-outline" size={27} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCalendarPress} style={styles.bottomNavButtonActive}>
          <Icon name="calendar" size={27} style={styles.navIconActive} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHomePress} style={styles.bottomNavButton}>
          <Icon name="home-outline" size={27} style={styles.navIcon} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#62a0d2',
  },
  statusBarSpacer: {
    height: 35,
    backgroundColor: '#fff0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  headerTitleWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  headerIconButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  agendaList: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 40,
  },
  agendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  itemIcon: {
    marginRight: 15,
    color: '#007bff',
    fontSize: 24,
  },
  itemText: {
    fontSize: 16,
    color: '#1F1F1F',
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 0,
  },
  bottomNavButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 2,
  },
  bottomNavButtonActive: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#007bff',
    paddingVertical: 2,
  },
  navIcon: {
    color: '#222',
    opacity: 0.8,
  },
  navIconActive: {
    color: '#007bff',
    opacity: 1,
  },
});

export default CalendarScreen; 