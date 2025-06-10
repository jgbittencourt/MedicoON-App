import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MenuScreenStyles } from './MenuScreenStyles';
import { RootStackParamList } from '../../navigation/types';

const MenuItem = ({ icon, text, onPress }: { icon: string; text: string; onPress: () => void }) => (
  <TouchableOpacity style={MenuScreenStyles.menuButton} onPress={onPress}>
    <Icon name={icon} size={20} color="#000" style={MenuScreenStyles.menuIcon} />
    <Text style={MenuScreenStyles.menuButtonText}>{text}</Text>
  </TouchableOpacity>
);

const MenuScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={MenuScreenStyles.container}>
      <View style={MenuScreenStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={MenuScreenStyles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
          <Text style={MenuScreenStyles.backButtonText}>VOLTAR</Text>
        </TouchableOpacity>
        <View style={MenuScreenStyles.menuHeader}>
          <Icon name="bars" size={24} color="#000" />
          <Text style={MenuScreenStyles.menuTitle}>Menu</Text>
        </View>
        <TouchableOpacity style={MenuScreenStyles.settingsIcon}>
          <Icon name="cog" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={MenuScreenStyles.scrollView}>
        <MenuItem icon="bookmark" text="Avaliações para Médicos" onPress={() => navigation.navigate('DoctorReview')} />
        <MenuItem icon="bookmark" text="Sistema de Avaliação para Hospitais e Clínicas" onPress={() => {}} />
        <MenuItem icon="bookmark" text="Avaliação anônima" onPress={() => {}} />
        <MenuItem icon="bookmark" text="Notificações de feedback" onPress={() => {}} />
        <MenuItem icon="bookmark" text="Convênios" onPress={() => {}} />
        <MenuItem icon="bookmark" text="Favoritos" onPress={() => {}} />
        <MenuItem icon="bookmark" text="Home" onPress={() => navigation.navigate('Dashboard')} />
        <MenuItem icon="bookmark" text="Notificações" onPress={() => navigation.navigate('Notification')} />
        <MenuItem icon="bookmark" text="Minha agenda" onPress={() => navigation.navigate('Calendar')} />
        <MenuItem icon="bookmark" text="Mensagens" onPress={() => navigation.navigate('ChatList')} />
        <MenuItem icon="bookmark" text="Perfil" onPress={() => navigation.navigate('Profile')} />
        <MenuItem icon="bookmark" text="Ajuda/Suporte" onPress={() => {}} />
      </ScrollView>
    </View>
  );
};

export default MenuScreen; 