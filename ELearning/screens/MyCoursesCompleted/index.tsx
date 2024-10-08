import React, { FC, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Video from 'react-native-video';
import { WebView } from 'react-native-webview';
import { Button } from '@gluestack-ui/themed';
import { ScreenProps } from '../../types';
// @ts-ignore
import CustomSearchIcon from '../../assets/categories/search.png';
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
  { idSec: 3, sectionTitle: 'Graphic Design', title: 'Take a Look Graphic De..', video: '', attachments: 'Attachment3.pdf', description: 'Description3', captions: 'Captions3', lectureNote: 'LectureNote3', locked: false },
  { idSec: 4, sectionTitle: '', title: 'Working with Graphic De..', video: 'https://youtu.be/GQS7wPujL2k?si=lmVm_NnYDE8avnHo', attachments: 'Attachment4.pdf', description: 'Description4', captions: 'Captions4', lectureNote: 'LectureNote4', locked: false },
  { idSec: 5, sectionTitle: '', title: 'Working with Frame & Lay..', video: '', attachments: 'Attachment5.pdf', description: 'Description5', captions: 'Captions5', lectureNote: 'LectureNote5', locked: false },
  { idSec: 6, sectionTitle: '', title: 'Using Graphic Plugins', video: '', attachments: 'Attachment6.pdf', description: 'Description6', captions: 'Captions6', lectureNote: 'LectureNote6', locked: false },
  { idSec: 7, sectionTitle: "Let's Practice", title: 'Let’s Design a Sign Up Fo..', video: '', attachments: 'Attachment7.pdf', description: 'Description7', captions: 'Captions7', lectureNote: 'LectureNote7', locked: false },
];

export const MyCoursesCompleted: FC<ScreenProps<'MyCoursesCompleted'>> = ({ navigation, route }) => {
  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);
  //@ts-ignore  
  const { course } = route.params;
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePlayVideo = (url: string) => {
    setVideoUrl(url);
    setModalVisible(true);
  };

  const handleCertificate = (course: Course) => {
    console.log("course : ", course);
    //@ts-ignore
    navigation.navigate('CertificateScreen', { course });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const startCourseAgain = () => {
    const firstSectionWithVideo = sections.find(section => section.video);
    if (firstSectionWithVideo) {
      handlePlayVideo(firstSectionWithVideo.video);
    }
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
      //@ts-ignore
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
          <Text style={[styles.sectionHeader, isDarkMode && styles.sectionHeaderDark]}>
            Section {item.idSec.toString().padStart(2, '0')} -{' '}
            <Text style={styles.sectionHeaderTitle}>{item.sectionTitle}</Text>
          </Text>
        </View>
      ) : null}
      <View style={[styles.sectionContainer, isDarkMode && styles.sectionContainerDark]}>
        <View style={[styles.indexCircle, isDarkMode && styles.indexCircleDark]}>
          <Text style={[styles.indexText, isDarkMode && styles.indexTextDark]}>{item.idSec.toString().padStart(2, '0')}</Text>
        </View>
        <Text style={[styles.sectionTitle, isDarkMode && styles.sectionTitleDark]}>{item.title}</Text>
        {!item.locked ? (
          <TouchableOpacity onPress={() => handlePlayVideo(item.video)} style={{ marginRight: 10 }}>
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
          style={[styles.searchbar, isDarkMode && styles.searchbarDark]}
          icon={() => <Image source={CustomSearchIcon} style={styles.searchIcon} />}
        />
      </View>
      </View>
      <View style={[styles.container, isDarkMode && styles.containerDark]}>
        <FlatList
          data={filteredSections}
          renderItem={renderItem}
          keyExtractor={(item) => item.idSec.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      <View style={[styles.footerCourse]}>
        <TouchableOpacity onPress={() => { handleCertificate(course) }}>
          <Image
            source={require('../../assets/categories/diploma.png')}
            style={styles.diplomaIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.enrollButton} onPress={startCourseAgain}>
          <Text style={styles.enrollButtonText}>Start Course Again</Text>
        </TouchableOpacity>
      </View>

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

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode?'#FFF':'#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#333',
    color:"white"
  },
  containerFooterDark: {
    backgroundColor: '#333',
    width:'100%',
    margin:'auto',
    justifyContent:'space-between',
    
    
  },
  containerWhite: {
    backgroundColor: '#FFF',
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
  searchbarDark: {
    backgroundColor: '#333',
    color: 'white',
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
  },
  sectionHeaderDark: {
    color: 'white',
  },
  sectionHeaderTitle: {
    color: '#0080ff',
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionContainerDark: {
    backgroundColor: '#1e1e1e',
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
  indexCircleDark: {
    backgroundColor: '#3e3e3e',
  },
  indexText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  indexTextDark: {
    color: 'white',
  },
  sectionTitle: {
    flex: 1,
    fontSize: 16,
  },
  sectionTitleDark: {
    color: 'white',
  },
  diplomaIcon: {
    width: 55,
    height: 55,
  },
  icon: {
    width: 25,
    height: 25,
  },
  enrollButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0080ff',
    padding: 16,
    borderRadius: 25,
    width: 250,
    bottom: 20,
    marginTop: 35,
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  footerCourse:{
      display: 'flex',
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      width: '85%', 
      margin: 'auto',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
