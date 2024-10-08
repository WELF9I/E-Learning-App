import React, { FC, useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import { Card, Searchbar, Avatar, Title, Paragraph } from 'react-native-paper';
import Video from 'react-native-video';
import { WebView } from 'react-native-webview';
import { Button, Heading, VStack } from '@gluestack-ui/themed';
import { ScreenProps } from '../../types';
import CustomSearchIcon from '../../assets/categories/search.png';
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';
import CourseCompletedIcon from '../../assets/svg/Course-Completed.svg';
import { Rating } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CustomButton, EventModal } from '../../components';
import { useTheme } from '../../utils/ThemeContext';

interface Course {
  id_cours: number;
  NomCourse: string;
  Bande_annonce_cours: string;
  Niveau_du_cours: string;
  language: string;
  duration: string;
  topic: string;
  date_Creations: Date;
  Date_miseaj: Date;
  Information_de_cours: string;
  courseRequirement: string;
  prix: number;
  reduction: boolean;
  Nouveau_prix: number;
  description: string;
  Sous_titre: string;
  Scoremin: number;
  NbEssai_Quiz: number;
}

interface Section {
  idSec: number;
  sectionTitle: string;
  title: string;
  video: string;
  attachments: string;
  description: string;
  captions: string;
  lectureNote: string;
  locked: boolean;
}

const sections: Section[] = [
  { idSec: 1, sectionTitle: 'Introduction', title: 'Why Using Graphic De..', video: 'https://youtu.be/GQS7wPujL2k?si=lmVm_NnYDE8avnHo', attachments: 'Attachment1.pdf', description: 'Description1', captions: 'Captions1', lectureNote: 'LectureNote1', locked: false },
  { idSec: 2, sectionTitle: '', title: 'Setup Your Graphic De..', video: 'https://drive.google.com/file/d/1ADyGIL1-oS8VG1zmj2EHbWuoqTHiqWA3/view?usp=sharing', attachments: 'Attachment2.pdf', description: 'Description2', captions: 'Captions2', lectureNote: 'LectureNote2', locked: false },
  { idSec: 3, sectionTitle: 'Graphic Design', title: 'Take a Look Graphic De..', video: 'https://youtu.be/TG6XSFeOT3g', attachments: 'Attachment3.pdf', description: 'Description3', captions: 'Captions3', lectureNote: 'LectureNote3', locked: false },
  { idSec: 4, sectionTitle: '', title: 'Working with Graphic De..', video: 'https://youtu.be/QAcu7i5lFvA', attachments: 'Attachment4.pdf', description: 'Description4', captions: 'Captions4', lectureNote: 'LectureNote4', locked: false },
  { idSec: 5, sectionTitle: '', title: 'Working with Frame & Lay..', video: 'https://youtu.be/dPMk6_HTBq8', attachments: 'Attachment5.pdf', description: 'Description5', captions: 'Captions5', lectureNote: 'LectureNote5', locked: false },
  { idSec: 6, sectionTitle: '', title: 'Using Graphic Plugins', video: 'https://youtu.be/mVH3kRz7Tgo', attachments: 'Attachment6.pdf', description: 'Description6', captions: 'Captions6', lectureNote: 'LectureNote6', locked: false },
  { idSec: 7, sectionTitle: "Let's Practice", title: 'Let’s Design a Sign Up Fo..', video: 'https://youtu.be/09n__iJvTeY', attachments: 'Attachment7.pdf', description: 'Description7', captions: 'Captions7', lectureNote: 'LectureNote7', locked: false },
];

export const MyCoursesOngoing: FC<ScreenProps<'MyCoursesOngoing'>> = ({ navigation, route }) => {
  const course = route.params;
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEventVisible, setModalEventVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastWatchedVideoIndex, setLastWatchedVideoIndex] = useState<number | null>(null);
  const { isDarkMode } = useTheme(); // Assuming useTheme() provides isDarkMode

  useEffect(() => {
    const loadLastWatchedVideo = async () => {
      const lastWatched = await AsyncStorage.getItem(`lastWatched_${course.id_cours}`);
      if (lastWatched !== null) {
        setLastWatchedVideoIndex(parseInt(lastWatched, 10));
      }
    };
    loadLastWatchedVideo();
  }, [course.id_cours]);

  const handlePlayVideo = async (url: string, index: number) => {
    setVideoUrl(url);
    setModalVisible(true);
    await AsyncStorage.setItem(`lastWatched_${course.id_cours}`, index.toString());
    setLastWatchedVideoIndex(index);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const onContinueCourse = () => {
    if (lastWatchedVideoIndex !== null && lastWatchedVideoIndex < sections.length - 1) {
      const nextVideoIndex = lastWatchedVideoIndex + 1;
      const nextVideo = sections[nextVideoIndex];
      handlePlayVideo(nextVideo.video, nextVideoIndex);
    } else {
      setModalEventVisible(true);
    }
  };

  const handleWriteReview = (course: Course) => {
    navigation.navigate('WriteReview', { course });
  };

  const renderVideoPlayer = () => {
    if (videoUrl && videoUrl.includes('youtu')) {
      const videoId = videoUrl.split('/').slice(-1)[0].split('?')[0];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return (
        <WebView
          source={{ uri: embedUrl }}
          allowsFullscreenVideo={true}
          allowsInlineMediaPlayback={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          style={styles.video}
        />
      );
    } else if (videoUrl && videoUrl.includes('drive.google.com')) {
      const parts = videoUrl.split('/');
      const file = parts[parts.length - 2];
      const fileId = file.split('?')[0];
      const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
      return (
        <WebView
          source={{ uri: embedUrl }}
          allowsFullscreenVideo={true}
          allowsInlineMediaPlayback={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          style={styles.video}
        />
      );
    } else {
      return <Video source={{ uri: videoUrl }} style={styles.video} controls fullscreen resizeMode="contain" />;
    }
  };

  const filteredSections = sections.filter(
    (section) =>
      section.sectionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: Section }) => (
    <View>
      {item.sectionTitle ? (
        <View style={styles.sectionHeaderContainer}>
          <Text style={[styles.sectionHeader, isDarkMode && styles.darkText]}>
            Section {item.idSec.toString().padStart(2, '0')} -{' '}
            <Text style={[styles.sectionHeaderTitle, isDarkMode && styles.darkText]}>{item.sectionTitle}</Text>
          </Text>
        </View>
      ) : null}
      <View style={[styles.sectionContainer, isDarkMode && styles.darkSection]}>
        <View style={styles.indexCircle}>
          <Text style={styles.indexText}>{item.idSec.toString().padStart(2, '0')}</Text>
        </View>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>{item.title}</Text>
        {!item.locked ? (
          <TouchableOpacity onPress={() => handlePlayVideo(item.video, item.idSec)} style={{ marginRight: 10 }}>
            <Image source={require('../../assets/categories/PlayIcon.png')} style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <Image source={require('../../assets/categories/padlock.png')} style={styles.icon} />
        )}
      </View>
    </View>
  );

  return (
    <>
    <View style={[isDarkMode &&styles.containerDark]}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search for ..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={[styles.searchbar, isDarkMode && styles.darkSearchbar]}
          icon={() => <Image source={CustomSearchIcon} style={styles.searchIcon} />}
        />
      </View>
      </View>

      <View style={[styles.container, isDarkMode && styles.darkContainer]}>
        <FlatList
          data={filteredSections}
          renderItem={renderItem}
          keyExtractor={(item) => item.idSec.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <CustomButton
          pressEvent={onContinueCourse}
          icon={<ArrowLeftBlueColor />}
          text="Continue Course"
        />
      </View>

      <EventModal
        icon={<CourseCompletedIcon />}
        isVisible={modalEventVisible}
        redirectFunction={() => {
          setModalEventVisible(false);
        }}>
        <VStack
          space="md"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={'$6'}>
          
          <Heading>Course Completed</Heading>
          <Text style={{ marginLeft: 10, textAlign: 'center' }}>
            Course Completed. Please Write a Review
          </Text>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={25}
            readonly
            startingValue={4}
          />
          <CustomButton
            pressEvent={() => handleWriteReview(course)}
            icon={<ArrowLeftBlueColor />}
            text="Write a Review"
          />
          
        </VStack>
      </EventModal>

      {videoUrl && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
          supportedOrientations={['portrait', 'landscape']}
        >
          <View style={styles.modalContainer}>
            {renderVideoPlayer()}
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#333',
    color:"white"
  },
  containerWhite: {
    backgroundColor: '#FFF',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  searchbar: {
    flex: 1,
    backgroundColor: 'white',
  },
  darkSearchbar: {
    backgroundColor: '#333', 
  },
  searchIcon: {
    width: 35,
    height: 35,
  },
  listContainer: {
    padding: 16,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Light mode text color
  },
  darkText: {
    color: '#fff', // Dark mode text color
  },
  sectionHeaderTitle: {
    color: '#0080ff',
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', // Light mode background
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  darkSection: {
    backgroundColor: '#1e1e1e', // Dark mode background
  },
  indexCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F1FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  indexText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionTitle: {
    flex: 1,
    fontSize: 16,
    color: '#000', // Light mode text color
  },
  icon: {
    width: 25,
    height: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Modal background
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
