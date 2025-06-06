import axios, { Axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
    baseURL: 'https://backend-trabalho-r04i.onrender.com',
    timeout: 30000 // Aumentando o timeout para 30 segundos devido à latência do servidor
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token inválido ou expirado
            await AsyncStorage.removeItem('userToken');
            // Aqui você pode adicionar lógica para redirecionar para a tela de login
        }
        return Promise.reject(error);
    }
);