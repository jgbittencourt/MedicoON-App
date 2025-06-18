import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#62a0d2', // Cor de fundo do Dashboard
    alignItems: 'center',
    // Removendo padding para garantir que a cor de fundo cubra toda a tela
    // paddingTop: 40, // Espaço para a barra de status, se necessário - ajustado para ser handled pela SafeAreaView, se usada
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10, // Ajuste para espaço no topo, considerando a status bar
    marginBottom: 25, // Aumenta o espaço abaixo do cabeçalho
  },
  headerIcon: {
    color: '#1F1F1F', // Cor dos ícones do cabeçalho
  },
  profileTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  profileTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F1F1F',
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75, // Metade da largura/altura para formar um círculo
    backgroundColor: '#E0E0E0', // Cor de fundo do placeholder
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Aumenta o espaço abaixo da imagem
    overflow: 'hidden',
    alignSelf: 'center', // Adiciona para garantir a centralização horizontal
    // Sem borda visível clara na imagem
    // borderWidth: 2,
    // borderColor: '#fff',
  },
  avatarPlaceholderContainer: {
    width: 150,
    height: 150,
    borderRadius: 75, // Metade da largura/altura para formar um círculo
    backgroundColor: '#E0E0E0', // Cor de fundo do placeholder
    justifyContent: 'center',
    alignItems: 'center',
    // Sem marginBottom aqui, pois o profileImageContainer já tem
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ajusta a imagem para cobrir o contêiner
  },
  avatarPlaceholderIcon: {
    color: '#757575', // Cor do ícone placeholder
  },
  nameContainer: {
    backgroundColor: '#E0E0E0', // Cor de fundo do nome similar à imagem
    paddingHorizontal: 5, // Reduzindo ainda mais o padding horizontal para ajustar à largura do nome
    paddingVertical: 2, // Reduzindo ainda mais o padding vertical para ajustar à altura do nome
    borderRadius: 5, // Borda levemente arredondada
    marginBottom: 70, // Aumenta o espaço abaixo do nome
    alignItems: 'center', // Centraliza o conteúdo (Text ou TextInput)
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignSelf: 'center', // Adiciona para garantir que o contêiner se ajuste ao conteúdo e centralize
  },
  nameText: {
    fontSize: 20, // Levemente maior para combinar com a imagem
    fontWeight: 'bold',
    color: '#1F1F1F', // Cor do texto do nome
  },
  nameInput: {
    fontSize: 20, // Tamanho da fonte igual ao Text
    fontWeight: 'bold',
    color: '#1F1F1F', // Cor do texto igual ao Text
    textAlign: 'center', // Centraliza o texto no input
    width: '60%', // Reduzindo a largura do input de nome
    // padding: 0, // Remover padding padrão do TextInput se necessário
  },
  infoTitleContainer: {
    marginBottom: 40, // Aumentado para 40 conforme solicitado
    alignSelf: 'center', // Centraliza o label "Informações:"
  },
  infoTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F1F1F', // Cor do texto "Informações:"
    backgroundColor: '#E0E0E0', // Cor de fundo do label "Informações:" similar à imagem
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    overflow: 'hidden', // Garante que o borderRadius seja aplicado
  },
  infoBoxesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 15, 
    paddingHorizontal: 0, 
    marginBottom: 80, // Espaço para a barra de navegação inferior
    columnGap: 10, // Espaço horizontal entre os chips
    rowGap: 20, // Espaço vertical entre as linhas
  },
  infoBox: {
    backgroundColor: '#E0E0E0', // Cor de fundo dos chips similar à imagem
    paddingVertical: 8,
    borderRadius: 15, // Borda mais arredondada para os chips
    // Recalculando a largura para acomodar 3 por linha com marginHorizontal de 15 e columnGap de 10
    // (Largura total - margens do container - espaço total dos columnGaps) / número de itens
    width: (screenWidth - 15 * 2 - 10 * 2) / 3, 
    alignItems: 'center', // Centraliza o conteúdo horizontalmente no chip
    justifyContent: 'center', // Centraliza o conteúdo verticalmente no chip
    paddingHorizontal: 5, // Adiciona padding interno horizontal no BOX
  },
  infoBoxLabel: {
    fontSize: 12, // Tamanho da fonte menor para o rótulo
    color: '#555', // Cor do rótulo
    marginBottom: 2, // Espaço entre o rótulo e o valor/input
  },
  infoBoxValue: {
    fontSize: 14,
    color: '#1F1F1F', // Cor do texto nos chips
    textAlign: 'center', // Garante que o texto esteja centralizado
  },
  infoBoxInput: {
    fontSize: 14, // Tamanho da fonte igual ao Text
    color: '#1F1F1F', // Cor do texto igual ao Text
    textAlign: 'center', // Centraliza o texto no input
    width: '100%',
    paddingVertical: 0, // Remover padding vertical padrão do TextInput
    paddingHorizontal: 0, // Remover padding horizontal padrão do TextInput
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#62a0d2', // Cor de fundo do Dashboard
    paddingVertical: 10,
    width: '100%',
    position: 'absolute', // Fixa na parte inferior
    bottom: 0,
    // Sem borda superior visível clara na imagem
    // borderTopWidth: 1,
    // borderTopColor: '#90b0cf',
  },
  navIcon: {
    color: '#1F1F1F', // Cor dos ícones da barra de navegação inativos
  },
  navIconActive: {
    color: '#007bff', // Cor azul brilhante para o ícone ativo (perfil)
  },
  // Estilos para loading e erro
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#62a0d2', // Mesma cor de fundo
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#62a0d2', // Mesma cor de fundo
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  statusBarSpacer: {
    height: 35,
    backgroundColor: '#fff0',
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
  navIconActive: {
    color: '#222',
    opacity: 1,
  },
});

export default styles; 