import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#62a0d2',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  googleLoginText: {
    color: '#000',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: '#000',
    fontSize: 14,
    marginBottom: 20,
  },
  cadastroContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 30,
  },
  cadastroText: {
    color: '#000',
    fontSize: 16,
  },
  cadastroLink: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButtonDisabled: {
    backgroundColor: '#cccccc',
    opacity: 0.7,
  },
});

export default styles; 