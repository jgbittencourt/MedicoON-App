import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';

// Definir tipos de mensagem
interface TextMessage {
  id: string;
  text: string;
  sender: 'me' | 'other';
  type: 'text';
  createdAt: string; // Adicionar timestamp
}

interface ImageMessage {
  id: string;
  imageUrl: string;
  sender: 'me' | 'other';
  type: 'image';
  createdAt: string;
}

interface AudioMessage {
  id: string;
  audioUrl: string;
  duration: number; // Duração em segundos
  sender: 'me' | 'other';
  type: 'audio';
  createdAt: string;
}

type Message = TextMessage | ImageMessage | AudioMessage;

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Olá! Como posso ajudar?', sender: 'other', type: 'text', createdAt: new Date().toISOString() },
    { id: '2', text: 'Olá! Preciso agendar uma consulta.', sender: 'me', type: 'text', createdAt: new Date().toISOString() },
    { id: '3', text: 'Ok, qual especialidade você procura?', sender: 'other', type: 'text', createdAt: new Date().toISOString() },
  ]);
  const [recording, setRecording] = useState<Audio.Recording | null>(null); // Estado para gravação de áudio
  const [isRecording, setIsRecording] = useState(false); // Estado para indicar se está gravando
  const [loading, setLoading] = useState(false); // Estado para indicar carregamento (ex: upload de imagem)

  // Solicitar permissões de mídia e áudio ao montar a tela
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Desculpe, precisamos de permissão da galeria para isso funcionar!');
        }
        const { status: audioStatus } = await Audio.requestPermissionsAsync();
        if (audioStatus !== 'granted') {
          alert('Desculpe, precisamos de permissão do microfone para gravar áudio!');
        }
      }
    })();
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: TextMessage = {
        id: Math.random().toString(), // ID temporário
        text: message.trim(),
        sender: 'me', // Supondo que estamos enviando
        type: 'text',
        createdAt: new Date().toISOString(),
      };
      setMessages(previousMessages => [newMessage, ...previousMessages]); // Adicionar no início para manter a ordem invertida
      setMessage('');
      // >>> Implementar lógica para enviar a mensagem de texto real para o backend aqui <<<
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUrl = result.assets[0].uri;
      const newMessage: ImageMessage = {
        id: Math.random().toString(), // ID temporário
        imageUrl: imageUrl,
        sender: 'me',
        type: 'image',
        createdAt: new Date().toISOString(),
      };
      setMessages(previousMessages => [newMessage, ...previousMessages]); // Adicionar no início
      // >>> Implementar lógica para upload e envio da imagem real para o backend aqui <<<
      console.log('Imagem selecionada:', imageUrl);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUrl = result.assets[0].uri;
        const newMessage: ImageMessage = {
        id: Math.random().toString(), // ID temporário
        imageUrl: imageUrl,
        sender: 'me',
        type: 'image',
        createdAt: new Date().toISOString(),
      };
      setMessages(previousMessages => [newMessage, ...previousMessages]); // Adicionar no início
      // >>> Implementar lógica para upload e envio da imagem real para o backend aqui <<<
      console.log('Foto tirada:', imageUrl);
    }
  };

  const startRecording = async () => {
    try {
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording..');
    setIsRecording(false);
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();

      if (uri) {
        try {
          const soundObject = await Audio.Sound.createAsync({ uri: uri as string });
          const status = soundObject.sound ? await soundObject.sound.getStatusAsync() : null;
          const durationMillis = status && status.isLoaded ? status.durationMillis || 0 : 0;
          const duration = Math.round(durationMillis / 1000);

          const newMessage: AudioMessage = {
            id: Math.random().toString(),
            audioUrl: uri as string,
            duration: duration,
            sender: 'me',
            type: 'audio',
            createdAt: new Date().toISOString(),
          };
          setMessages(previousMessages => [newMessage, ...previousMessages]);
          // >>> Implementar lógica para upload e envio do áudio real para o backend aqui <<<
          console.log('Recording stopped and stored at', uri);
        } catch (error) {
          console.error('Erro ao criar objeto de som ou obter status:', error);
        }
      } else {
        console.error('URI de gravação inválida ou nula.');
      }
    }
    setRecording(null);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    // >>> Implementar renderização diferente para cada tipo de mensagem <<<
    if (item.type === 'text') {
      return (
        <View style={[styles.messageBubble, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      );
    } else if (item.type === 'image') {
      return (
         <View style={[styles.messageBubble, item.sender === 'me' ? styles.myMessage : styles.otherMessage, styles.imageMessage]}> {/* Novo estilo para imagem */}
          {/* Envolver o conteúdo da imagem em uma View */}
          <View>
             {/* <Image source={{ uri: item.imageUrl }} style={styles.chatImage} /> */}
             <Text>Imagem: {item.imageUrl}</Text> {/* Placeholder */}
          </View>
        </View>
      );
    } else if (item.type === 'audio') {
      return (
        <View style={[styles.messageBubble, item.sender === 'me' ? styles.myMessage : styles.otherMessage, styles.audioMessage]}> {/* Novo estilo para áudio */}
           <Icon name="play-circle" size={24} color={item.sender === 'me' ? '#000' : '#000'} /> {/* Ícone de play */}
          <Text style={styles.audioDuration}>{item.duration}s</Text> {/* Duração do áudio */}
          {/* Implementar controle de reprodução real aqui */}
        </View>
      );
    }
    return null; // Para tipos de mensagem desconhecidos
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      {/* Header do Chat (Placeholder) */}
      <View style={styles.header}>
        {/* Adicionar botão de voltar, avatar do contato, nome do contato */}
        <Text style={styles.headerTitle}>Nome do Médico/Paciente</Text>
      </View>

      {/* Lista de Mensagens */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => item.id || index.toString()} // Usar index como fallback
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContentContainer}
        inverted
      />

      {/* Área de Input de Mensagem */}
      <View style={styles.inputContainer}>
        {message.trim() === '' && !isRecording && (
          <> {/* Fragmento para múltiplos elementos */}
            <TouchableOpacity onPress={pickImage} style={styles.attachButton}> {/* Botão para anexar imagem */}
               <Icon name="attach" size={24} color="#666" />
            </TouchableOpacity>
             <TouchableOpacity onPress={takePhoto} style={styles.attachButton}> {/* Botão para tirar foto */}
               <Icon name="camera" size={24} color="#666" />
            </TouchableOpacity>
          </>
        )}
        
        <TextInput
          style={[styles.messageInput, (message.trim() === '' && !isRecording) && {marginRight: 5}]} // Ajustar margem
          placeholder={isRecording ? 'Gravando áudio...' : 'Digite sua mensagem...'}
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
          multiline
          editable={!isRecording} // Desabilitar input enquanto grava
        />
        
        {message.trim() !== '' ? ( // Se houver texto, mostrar botão de enviar
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Icon name="send" size={24} color="#fff" />
          </TouchableOpacity>
        ) : isRecording ? ( // Se estiver gravando, mostrar botão de parar gravação
           <TouchableOpacity onPress={stopRecording} style={styles.sendButton}> {/* Usar o mesmo estilo do botão de enviar */}
            <Icon name="square" size={24} color="#fff" /> {/* Ícone de parar */}
          </TouchableOpacity>
        ) : (
           <TouchableOpacity onPress={startRecording} style={styles.sendButton}> {/* Se não houver texto e não estiver gravando, mostrar botão de microfone */}
             <Icon name="mic" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5ddd5',
  },
  header: {
    height: 60,
    backgroundColor: '#075e54',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 0 : 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messagesContentContainer: {
    paddingVertical: 10,
  },
  messageBubble: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  imageMessage: { // Novo estilo para mensagens de imagem
    padding: 0, // Remover padding extra para a imagem
  },
  chatImage: { // Estilo para a imagem dentro da bolha
    width: 200, // Tamanho da imagem (ajuste conforme necessário)
    height: 150,
    borderRadius: 8,
  },
  audioMessage: { // Novo estilo para mensagens de áudio
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioDuration: { // Estilo para a duração do áudio
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end', // Alinhar na parte inferior quando o input crescer
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
  },
  attachButton: { // Estilo para os botões de anexo
    paddingHorizontal: 5,
    paddingVertical: 5, // Adicionar padding vertical para facilitar o clique
    marginBottom: 5, // Alinhar com a base do input quando não multiline
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100,
    // Remover marginRight condicional daqui para simplificar
  },
  sendButton: {
    backgroundColor: '#075e54',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5, // Alinhar com a base do input
  },
});

export default ChatScreen; 