import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen/CadastroScreen';
import DashboardScreen from './src/screens/DashboardScreen/DashboardScreen';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import NotificationScreen from './src/screens/NotificationScreen/NotificationScreen';
import ChatScreen from './src/screens/ChatScreen/ChatScreen';
import ChatListScreen from './src/screens/ChatListScreen/ChatListScreen';
import CalendarScreen from './src/screens/CalendarScreen/CalendarScreen';
import MenuScreen from './src/screens/MenuScreen/MenuScreen';
import DoctorReviewScreen from './src/screens/DoctorReviewScreen/DoctorReviewScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Criar Conta' }}/>
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }}/>
        <Stack.Screen name="Notification" component={NotificationScreen} options={{ title: 'Notificações' }}/>
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }}/>
        <Stack.Screen name="ChatList" component={ChatListScreen} options={{ title: 'Mensagens' }}/>
        <Stack.Screen name="Calendar" component={CalendarScreen} options={{ title: 'Minha Agenda' }}/>
        <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="DoctorReview" component={DoctorReviewScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
