export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Dashboard: { userData?: any };
  Profile: { userData?: any };
  Notification: undefined;
  Calendar: undefined; // Adicionar rota Calendar, se existir
  Chat: { chatId: string; contactName: string }; // Definindo parâmetros esperados para a tela de Chat individual
  ChatList: undefined; // Adicionando a rota para a lista de chats
  // Adicione outras rotas aqui se necessário
}; 