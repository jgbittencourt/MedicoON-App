import React, { useState } from 'react';
import './ProfileScreen.css'; // Importa o arquivo CSS

interface ProfileData {
  nome: string;
  idade: string;
  planoSaude: string;
  historicoConsultas: string;
  cidade: string;
  estado: string;
  tipoSanguineo: string;
}

const ProfileScreen: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Dados de exemplo - substitua com dados reais se necessário
  const [profileData, setProfileData] = useState<ProfileData>({
    nome: 'Lucas Silva Borges',
    idade: '28',
    planoSaude: 'UNIMED',
    historicoConsultas: 'Ver Histórico',
    cidade: 'Barra Mansa',
    estado: 'RJ',
    tipoSanguineo: 'O+',
  });

  const handleMenuClick = () => {
    // Implementar lógica do menu
    console.log('Menu clicado');
  };

  const handleSettingsClick = () => {
    setIsEditing(!isEditing);
    console.log('Modo de edição:', !isEditing);
  };

  const handleChipClick = (label: string) => {
    if (label === 'Histórico de Consultas') {
      // Implementar navegação para histórico de consultas
      console.log('Navegando para histórico de consultas');
    }
  };

  // Função auxiliar para renderizar os chips de informação
  const renderInfoChip = (label: string, value?: string) => (
    <div 
      className="info-chip" 
      onClick={() => handleChipClick(label)}
    >
      <span>{label}{value && `: ${value}`}</span>
    </div>
  );

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="icon-button" onClick={handleMenuClick} title="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="currentColor"/>
          </svg>
        </div>
        <h1 className="profile-title">Meu Perfil</h1>
        <div className="icon-button" onClick={handleSettingsClick} title="Configurações">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.68 19.18 11.36 19.13 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.92 7.63 6.29L5.24 5.33C5.02 5.25 4.77 5.33 4.65 5.55L2.74 8.87C2.62 9.08 2.66 9.34 2.86 9.48L4.89 11.06C4.84 11.36 4.8 11.69 4.8 12C4.8 12.31 4.82 12.64 4.87 12.94L2.84 14.52C2.66 14.66 2.61 14.93 2.72 15.13L4.64 18.45C4.76 18.67 5.01 18.74 5.23 18.67L7.62 17.71C8.12 18.09 8.65 18.41 9.24 18.65L9.6 21.19C9.65 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.36 21.43 14.39 21.19L14.75 18.65C15.34 18.41 15.88 18.09 16.37 17.71L18.76 18.67C18.98 18.75 19.23 18.67 19.35 18.45L21.27 15.13C21.39 14.91 21.34 14.66 21.15 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z" fill="currentColor"/>
          </svg>
        </div>
      </header>

      <div className="profile-avatar">
        <div className="avatar-placeholder">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
          </svg>
        </div>
      </div>

      <h2 className="profile-name">{profileData.nome}</h2>

      <div className="info-section">
        <div className="info-label-container">
          <span className="info-label">Dados Pessoais</span>
        </div>
        <div className="info-chips-container">
          {renderInfoChip('Idade', profileData.idade)}
          {renderInfoChip('Plano de Saúde', profileData.planoSaude)}
          {renderInfoChip('Histórico de Consultas')}
          {renderInfoChip('Cidade', profileData.cidade)}
          {renderInfoChip('Estado', profileData.estado)}
          {renderInfoChip('Tipo Sanguíneo', profileData.tipoSanguineo)}
        </div>
      </div>

      {/* Placeholder para a barra de navegação inferior, se for parte desta tela */}
      {/* <footer className="bottom-nav"></footer> */}
    </div>
  );
};

export default ProfileScreen;

// Adicione os estilos para estas classes CSS em um arquivo ProfileScreen.css
/*
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #a7c7e7; // Cor de fundo similar à imagem
  min-height: 100vh;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
}

.icon-button {
  // Estilos para os botões de ícone (menu e settings)
}

.profile-title {
  font-size: 24px;
  font-weight: bold;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: #cccccc; // Cor de fundo do avatar placeholder
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  overflow: hidden;
}

.avatar-placeholder {
   width: 100%;
   height: 100%;
   background-color: #e0e0e0; // Cor de fundo se não tiver imagem
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 60px;
   color: #ffffff;
}

.profile-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.info-section {
  width: 100%;
  margin-bottom: 20px;
  text-align: center; // Centraliza o label "Informações" e os chips
}

.info-label-container {
    margin-bottom: 10px;
}

.info-label {
  font-size: 18px;
  font-weight: bold;
  background-color: #e0e0e0; // Cor de fundo do label "Informações" similar à imagem
  padding: 5px 15px;
  border-radius: 15px;
  display: inline-block; // Para que o padding e border-radius funcionem
}

.info-chips-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; // Centraliza os chips
  gap: 8px; // Espaço entre os chips
}

.info-chip {
  background-color: #e0e0e0; // Cor de fundo dos chips similar à imagem
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
}

// Estilos para a barra de navegação inferior (se for incluída aqui)
/*
.bottom-nav {
  // Estilos para a barra de navegação
}
*/

