import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#62a0d2', // Cor de fundo azul clara do login
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40, // Espaço no topo para a barra de status, ajuste conforme necessário
    marginBottom: 5, // Ajustando a margem inferior do cabeçalho
  },
  headerIcon: {
    fontSize: 30,
    color: '#000', // Cor dos ícones do cabeçalho
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', // Fundo branco para a barra de busca
    borderRadius: 25, // Bordas arredondadas
    marginHorizontal: 10,
    paddingHorizontal: 10, // Reduzindo o padding interno para dar mais espaço ao texto
    marginBottom: 30, // Espaço abaixo da barra de busca para separar da imagem
    marginTop: 30, // Aumentando a margem superior para afastar mais do cabeçalho
  },
  searchInput: {
    flex: 1,
    height: 50, // Altura do input de busca
    fontSize: 16,
    paddingHorizontal: 5, // Ajustando o padding horizontal do input
  },
  searchIcon: {
    fontSize: 20,
    color: '#888', // Cor do ícone de busca
  },
  centralImageContainer: {
    alignItems: 'center',
    marginTop: 120, // Aumentando a margem superior para abaixar a imagem e o texto
    marginBottom: 60, // Mantendo a margem inferior
  },
  centralImage: {
    width: 200, // Ajuste o tamanho conforme necessário
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10, // Opcional: bordas arredondadas para a imagem central
    backgroundColor: '#fff', // Fundo branco para a imagem central
    padding: 10, // Espaço interno ao redor da imagem
  },
   médecinsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Cor do texto
    backgroundColor: '#fff', // Fundo branco para o texto
    paddingHorizontal: 5, // Reduzindo o padding horizontal para ajustar à largura do texto
    paddingVertical: 2, // Reduzindo o padding vertical para ajustar à altura do texto
    borderRadius: 10,
    marginTop: 30, // Mantendo a margem superior
    marginBottom: 60, // Mantendo a margem inferior
    textAlign: 'center', // Centraliza o texto
    alignSelf: 'center', // Adiciona para garantir que o contêiner se ajuste ao conteúdo e centralize
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff', // Fundo branco para a barra de navegação inferior
    height: 60, // Altura da barra de navegação
    position: 'absolute', // Fixa na parte inferior
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1, // Linha superior
    borderColor: '#ccc',
  },
  navIcon: {
    fontSize: 25,
    color: '#000', // Cor dos ícones de navegação
  },
  navButton: { // Estilo para o botão de navegação (para posicionar o badge)
    position: 'relative',
    padding: 5, // Espaçamento interno para o clique
  },
  notificationBadge: { // Estilo para o ponto/círculo de notificação
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff3b30', // Cor vermelha para o badge
  },
});

export default styles; 