import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { DoctorReviewScreenStyles } from './DoctorReviewScreenStyles';

const StarRating = ({ rating, onStarPress }: { rating: number; onStarPress: (star: number) => void }) => {
  return (
    <View style={DoctorReviewScreenStyles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => onStarPress(star)}>
          <Icon name={star <= rating ? 'star' : 'star-o'} size={25} color="#FFD700" style={DoctorReviewScreenStyles.star} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const CommentSection = ({ label, comments }: { label: string; comments: string[] }) => (
  <View style={DoctorReviewScreenStyles.commentSection}>
    <Text style={DoctorReviewScreenStyles.commentLabel}>{label}</Text>
    {comments.map((comment, index) => (
      <Text key={index} style={DoctorReviewScreenStyles.commentText}>• {comment}</Text>
    ))}
  </View>
);

const DoctorReviewScreen = () => {
  const navigation = useNavigation();
  const [selectedRating, setSelectedRating] = useState(0);
  const [commentText, setCommentText] = useState('');

  const handleStarPress = (star: number) => {
    setSelectedRating(star);
  };

  return (
    <View style={DoctorReviewScreenStyles.container}>
      <View style={DoctorReviewScreenStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={DoctorReviewScreenStyles.backButton}>
          <Icon name="arrow-left" size={24} color="#000" />
          <Text style={DoctorReviewScreenStyles.backButtonText}>VOLTAR</Text>
        </TouchableOpacity>
        <View style={DoctorReviewScreenStyles.headerMenuButton}>
          <Icon name="bars" size={24} color="#000" />
        </View>
        <Text style={DoctorReviewScreenStyles.headerTitle}>Avaliações para Médicos</Text>
        <TouchableOpacity style={DoctorReviewScreenStyles.headerSettingsButton}>
          <Icon name="cog" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={DoctorReviewScreenStyles.searchContainer}>
        <TextInput
          style={DoctorReviewScreenStyles.searchInput}
          placeholder="Carlos Tavares"
          placeholderTextColor="#888"
        />
        <Icon name="search" size={20} color="#000" style={DoctorReviewScreenStyles.searchIcon} />
      </View>

      <ScrollView style={DoctorReviewScreenStyles.scrollView}>
        <View style={DoctorReviewScreenStyles.doctorInfoContainer}>
          <Image source={require('../../../assets/image/MedicoOn.png')} style={DoctorReviewScreenStyles.doctorImage} />
          <Text style={DoctorReviewScreenStyles.doctorName}>Dr. Carlos Tavares</Text>
          <Text style={DoctorReviewScreenStyles.doctorSpecialty}>Ortopedista</Text>
          <View style={DoctorReviewScreenStyles.overallRatingContainer}>
            <StarRating rating={4.8} onStarPress={() => {}} />
            <Text style={DoctorReviewScreenStyles.overallRatingText}>(4.8/5 com base em 150 avaliações)</Text>
          </View>
        </View>

        <CommentSection
          label="Comentários:"
          comments={[
            "Maria: O Dr. Carlos foi super atencioso e explicou tudo com paciência!",
            "Vagner: Gostei do atendimento, mas demorou um pouco para ser atendido.",
          ]}
        />

        <View style={DoctorReviewScreenStyles.ratingSection}>
          <Text style={DoctorReviewScreenStyles.ratingSectionTitle}>Selecione e deixe seu comentário:</Text>
          <View style={DoctorReviewScreenStyles.ratingOptionsContainer}>
            <View style={DoctorReviewScreenStyles.ratingOption}>
              <StarRating rating={5} onStarPress={handleStarPress} />
              <Text style={DoctorReviewScreenStyles.ratingOptionText}>Excelente!</Text>
              <Icon name="check-circle" size={20} color="green" />
            </View>
            <View style={DoctorReviewScreenStyles.ratingOption}>
              <StarRating rating={4} onStarPress={handleStarPress} />
              <Text style={DoctorReviewScreenStyles.ratingOptionText}>Muito bom</Text>
              <Icon name="check-circle" size={20} color="green" />
            </View>
            <View style={DoctorReviewScreenStyles.ratingOption}>
              <StarRating rating={3} onStarPress={handleStarPress} />
              <Text style={DoctorReviewScreenStyles.ratingOptionText}>Bom</Text>
              <Icon name="check-circle" size={20} color="green" />
            </View>
            <View style={DoctorReviewScreenStyles.ratingOption}>
              <StarRating rating={2} onStarPress={handleStarPress} />
              <Text style={DoctorReviewScreenStyles.ratingOptionText}>Regular</Text>
              <Icon name="check-circle" size={20} color="green" />
            </View>
            <View style={DoctorReviewScreenStyles.ratingOption}>
              <StarRating rating={1} onStarPress={handleStarPress} />
              <Text style={DoctorReviewScreenStyles.ratingOptionText}>Ruim</Text>
              <Icon name="check-circle" size={20} color="green" />
            </View>
          </View>
        </View>

        <View style={DoctorReviewScreenStyles.commentInputContainer}>
          <TouchableOpacity>
            <Icon name="camera" size={24} color="#888" style={DoctorReviewScreenStyles.cameraIcon} />
          </TouchableOpacity>
          <TextInput
            style={DoctorReviewScreenStyles.commentInput}
            placeholder="Conte um pouco sobre sua experiência com este médico..."
            placeholderTextColor="#888"
            multiline
            value={commentText}
            onChangeText={setCommentText}
          />
          <TouchableOpacity>
            <Icon name="paperclip" size={24} color="#888" style={DoctorReviewScreenStyles.attachmentIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default DoctorReviewScreen; 