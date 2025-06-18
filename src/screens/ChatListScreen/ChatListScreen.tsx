import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';

type ChatListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatList'>; // Usando 'ChatList'

// Placeholder para um item da lista de conversas
interface ChatItem {
  id: string;
  contactName: string;
  lastMessage: string;
  time: string;
  isOnline?: boolean;
}

const ChatListScreen = () => {
  const navigation = useNavigation<ChatListScreenNavigationProp>();

  // Placeholder data
  const chatData: ChatItem[] = [
    { id: '1', contactName: 'Secretaria Clínica Saúde Viva', lastMessage: 'Seu exame está pronto para retirada.', time: 'hoje', isOnline: true },
    { id: '2', contactName: 'Dr. João Silva - Cardiologista', lastMessage: 'Olá, posso ajudar com alguma dúvida?', time: 'há 2h' },
    { id: '3', contactName: 'Dra. Mariana Lopes - Clínica Geral', lastMessage: 'Consulta confirmada para amanhã às 10h.', time: 'ontem' },
    // Adicionar mais dados mockados aqui
  ];

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate('Chat', { chatId: item.id, contactName: item.contactName } as any)}>
      <View style={styles.avatarPlaceholder} />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Text style={styles.contactName}>{item.contactName}</Text>
            {item.isOnline && item.contactName === 'Secretaria Clínica Saúde Viva' && (
              <View style={styles.onlineIndicatorInline} />
            )}
          </View>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleMenuPress = () => console.log('Menu pressed');
  const handleSettingsPress = () => console.log('Settings pressed');
  const handleSearch = () => console.log('Search pressed');

  // Funções de navegação para a barra inferior
  const handleNotificationsPress = () => navigation.navigate('Notification', undefined);
  const handleCalendarPress = () => navigation.navigate('Calendar', undefined);
  const handleHomePress = () => navigation.navigate('Dashboard', {});
  const handleChatPress = () => {};
  const handleProfilePress = () => navigation.navigate('Profile', {});

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.statusBarSpacer} />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuPress} style={styles.headerIconButton}>
          <Icon name="menu" size={28} color="#1F1F1F" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>Mensagens</Text>
        </View>
        <TouchableOpacity onPress={handleSettingsPress} style={styles.headerIconButton}>
          <Icon name="settings-outline" size={28} color="#1F1F1F" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar conversas..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchIconContainer}>
          <Icon name="search" size={22} color="#1F1F1F" />
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <FlatList
        data={chatData}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatList}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={handleNotificationsPress} style={styles.bottomNavButton}>
          <Icon name="notifications-outline" size={27} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCalendarPress} style={styles.bottomNavButton}>
          <Icon name="calendar-outline" size={27} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHomePress} style={styles.bottomNavButton}>
          <Icon name="home-outline" size={27} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleChatPress} style={styles.bottomNavButtonActive}>
          <Icon name="chatbubbles-outline" size={27} style={styles.navIconActive} />
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
    backgroundColor: '#62a0d2', // Cor de fundo do seu app
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginHorizontal: 18,
    marginBottom: 40,
    marginTop: 50,
    paddingHorizontal: 18,
    height: 45,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 17,
    color: '#222',
  },
  searchIconContainer: {
    paddingLeft: 10,
  },
  chatList: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 70,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    position: 'relative',
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    backgroundColor: '#ccc',
    borderRadius: 24,
    marginRight: 14,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
  },
  chatTime: {
    fontSize: 13,
    color: '#888',
    marginLeft: 8,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  onlineIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#34c759',
    borderWidth: 2,
    borderColor: '#fff',
  },
  onlineIndicatorInline: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#34c759',
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: 2,
    alignSelf: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    marginBottom: 2,
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
    borderBottomColor: '#3b6ea5',
    paddingVertical: 2,
  },
  navIcon: {
    color: '#222',
    opacity: 0.8,
  },
  navIconActive: {
    color: '#222',
    opacity: 1,
  },
});

export default ChatListScreen; 