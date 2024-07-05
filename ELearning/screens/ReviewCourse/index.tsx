import React, { FC, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, Rating } from 'react-native-elements';
import { ScreenProps } from '../../types';
//@ts-ignore
import IsClickedHeart from '../../assets/categories/IsClickedHeart.png';
// @ts-ignore
import IsNotClickedHeart from '../../assets/categories/IsNotClickedHeart.png';
// @ts-ignore
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';
import { CustomButton } from '../../components';

const reviews = [
  {
    id: '1',
    name: 'Heather S. McMullen',
    text: 'The Course is Very Good dolor sit amet, con sect tur adipiscing elit. Naturales divitias dixit parab les esse..',
    rating: 4.2,
    likes: 760,
    date: '2 Weeks Ago',
  },
  {
    id: '2',
    name: 'Natasha B. Lambert',
    text: 'The Course is Very Good dolor veterm, quo etiam utuntur hi capiamus..',
    rating: 4.8,
    likes: 918,
    date: '2 Weeks Ago',
  },
  {
    id: '3',
    name: 'Marshall A. Lester',
    text: 'The Course is Very Good dolor sit amet, con sect tur adipiscing elit. Naturales divitias dixit parab les esse..',
    rating: 4.6,
    likes: 914,
    date: '2 Weeks Ago',
  },
  {
    id: '4',
    name: 'Frances D. Stanford',
    text: 'The Course is Very Good dolor veterm, quo etiam utuntur hi capiamus..',
    rating: 4.8,
    likes: 0,
    date: '2 Weeks Ago',
  },
];

const levels = [
  'Excellent',
  'Good',
  'Average',
  'Below Average',
];

export const ReviewCourse: FC<ScreenProps<'ReviewCourse'>> = ({ navigation }) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('Excellent');
  const [likeStates, setLikeStates] = useState<{ [key: string]: boolean }>({});
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>(() => {
    const initialLikeCounts = {};
    reviews.forEach(review => {
        //@ts-ignore
      initialLikeCounts[review.id] = review.likes;
    });
    return initialLikeCounts;
  });

  const handlePressLevel = (level: string) => {
    setSelectedLevel(level);
  };

  const handleLikeReview = (id: string) => {
    setLikeStates(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    setLikeCounts(prevCounts => ({
      ...prevCounts,
      [id]: prevCounts[id] + (likeStates[id] ? -1 : 1),
    }));
  };
  //@ts-ignore
  const renderReview = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image 
            style={styles.profileImage} 
            source={{ uri: 'https://imgs.search.brave.com/QNuHtKPVBWNcY-g4Xu-6830byfWvLIFPQvp_H1Jsb1A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wb3J0cmFpdC1z/bWlsaW5nLXlvdW5n/LW1hbl8xMDQ4OTQ0/LTE0MzA1ODQ3Lmpw/Zw' }} />
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.rating}>
          <Rating
            type="star"
            ratingCount={Math.floor(Math.round(item.rating))}
            imageSize={20}
            readonly
            startingValue={item.rating}
          />
        </View>
      </View>
      <Text style={styles.reviewText}>{item.text}</Text>
      <View style={styles.reviewFooter}>
        <View style={styles.likes}>
          <TouchableOpacity onPress={() => handleLikeReview(item.id)}>
            <Image
              source={likeStates[item.id] ? IsClickedHeart : IsNotClickedHeart}
              style={styles.heartIcon}
            />
          </TouchableOpacity>
          <Text style={{marginLeft: 6}}>{likeCounts[item.id]}</Text>
        </View>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.averageRating}>4.8</Text>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={25}
          readonly
          startingValue={4.7}
        />
        <Text style={styles.reviewsCount}>Based on 448 Reviews</Text>
      </View>
      
      {/* Levels */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.levelContainer}>
        {levels.map((level) => (
          <TouchableOpacity
            key={level}
            onPress={() => handlePressLevel(level)}
            style={[styles.levelButton, selectedLevel === level && styles.selectedLevelButton]}
          >
            <Text style={[styles.levelText, selectedLevel === level && styles.selectedLevelText]}>{level}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={reviews}
        renderItem={renderReview}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
      />
       <CustomButton
        pressEvent={()=>{navigation.navigate('WriteReview')}}
        icon={<ArrowLeftBlueColor />}
        text="Write a Review"
      />
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginVertical: 16,
  },
  averageRating: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#202244',
  },
  reviewsCount: {
    fontSize: 16,
    color: '#888',
  },
  levelContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  levelButton: {
    backgroundColor: '#E8F1FF',
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 150,
  },
  selectedLevelButton: {
    backgroundColor: '#167F71',
  },
  levelText: {
    color: 'black',
    textAlign: 'center',
  },
  selectedLevelText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reviewCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#202244'
  },
  rating: {
    marginLeft: 'auto',
  },
  reviewText: {
    fontSize: 14,
    color: '#545454',
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesCount: {
    marginLeft: 4,
    fontSize: 14,
  },
  date: {
    fontSize: 14,
    color: '#202244',
    fontWeight:'bold',
  },
  flatListContent: {
    paddingBottom: 16,
  },
  heartIcon: {
    width: 23,
    height: 23,
  },
});
