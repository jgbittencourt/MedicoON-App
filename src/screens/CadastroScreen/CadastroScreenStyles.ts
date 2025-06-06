import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#62a0d2', // Mesma cor de fundo do login
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30, // Mesmo espaço abaixo da logo do login
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Cor do texto
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50, // Mesma altura dos inputs do login
    backgroundColor: '#e0e0e0', // Mesma cor de fundo dos inputs do login
    borderRadius: 5, // Bordas arredondadas
    paddingHorizontal: 15, // Espaço interno
    marginBottom: 15, // Espaço entre os inputs
    fontSize: 16,
  },
  cadastroButton: { // Estilo para o botão de cadastro
    width: '100%',
    height: 50,
    backgroundColor: '#007bff', // Mesma cor de fundo do botão de login
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Espaço acima do botão
  },
  cadastroButtonText: { // Estilo para o texto do botão de cadastro
    color: '#fff', // Cor do texto (branco)
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles; 