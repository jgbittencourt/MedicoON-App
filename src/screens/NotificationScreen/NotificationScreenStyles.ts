import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#62a0d2', // Cor de fundo similar às outras telas
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 15,
    backgroundColor: '#62a0d2', // Cor de fundo do header
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', // Fundo branco
    borderRadius: 20, // Bordas arredondadas
    paddingHorizontal: 12,
    paddingVertical: 6,
    // Ajuste para centralizar melhor, permitindo espaço para os ícones laterais
    flexGrow: 0, 
    flexShrink: 1, 
    flexBasis: 'auto',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F1F1F',
    marginHorizontal: 5,
  },
  notificationsList: {
    paddingHorizontal: 10,
    paddingBottom: 30,
    paddingTop: 10,
  },
  notificationItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
  unreadNotification: {
    backgroundColor: '#f0f8ff',
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  notificationIcon: {
    fontSize: 20,
    color: '#1F1F1F',
    marginRight: 10,
    marginTop: 2,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F1F1F',
    marginBottom: 4,
  },
  unreadText: {
    color: '#007bff',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff', // Fundo branco para a barra de navegação inferior
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#62a0d2', // Cor de fundo da tela de loading
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff', // Cor do texto de loading
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