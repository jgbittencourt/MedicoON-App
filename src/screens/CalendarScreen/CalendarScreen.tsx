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
    navigation.navigate('Notification'); // Navega para Notificações
  };
  const handleCalendarPress = () => console.log('Calendário (atual)'); // Já está no Calendário
  const handleHomePress = () => {
    console.log('Navegando para Dashboard');
    navigation.navigate('Dashboard');
  };
  const handleChatPress = () => {
    console.log('Navegando para a lista de Chats');
    navigation.navigate('ChatList');
  };
  const handleProfilePress = () => {
    console.log('Navegando para Perfil');
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuPress}>
          <Icon name="menu" size={30} color="#1F1F1F" />
        </TouchableOpacity>
        {/* Título simples no centro */}
        <Text style={styles.headerTitle}>Minha Agenda</Text>
        <TouchableOpacity onPress={handleSettingsPress}>
          <Icon name="settings-outline" size={30} color="#1F1F1F" />
        </TouchableOpacity>
      </View>

      {/* Agenda List */}
      <FlatList
        data={agendaData}
        renderItem={({ item, index }) => renderAgendaItem({ item, index })}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.agendaList}
        ListEmptyComponent={<Text>Nenhum item na agenda.</Text>}
      />

       {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={handleNotificationsPress}>
          <Icon name="notifications-outline" size={25} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCalendarPress}> { /* Ícone de calendário, possivelmente destacado */}
          <Icon name="calendar" size={25} color="#007bff" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#62a0d2', // Cor de fundo do seu app
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20, // Espaçamento abaixo do header
    backgroundColor: '#62a0d2', // Cor de fundo do header
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F1F1F',
  },
  agendaList: {
    paddingHorizontal: 15,
    paddingBottom: 80, // Espaço para a barra de navegação
    paddingTop: 10, // Espaço acima da lista
  },
  agendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30, // Aumentando o espaço entre os itens
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemIcon: {
    marginRight: 15,
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
    backgroundColor: '#fff',
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  navIcon: {
    fontSize: 25,
    color: '#000',
  },
});

export default CalendarScreen; 