import React, { FC, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { WebView } from 'react-native-webview';
import { Button } from '@gluestack-ui/themed';
import { ScreenProps } from '../../types';
import { CustomButton } from '../../components';
// @ts-ignore
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';
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
  { idSec: 3, sectionTitle: 'Graphic Design', title: 'Take a Look Graphic De..', video: '', attachments: 'Attachment3.pdf', description: 'Description3', captions: 'Captions3', lectureNote: 'LectureNote3', locked: true },
  { idSec: 4, sectionTitle: '', title: 'Working with Graphic De..', video: '', attachments: 'Attachment4.pdf', description: 'Description4', captions: 'Captions4', lectureNote: 'LectureNote4', locked: true },
  { idSec: 5, sectionTitle: '', title: 'Working with Frame & Lay..', video: '', attachments: 'Attachment5.pdf', description: 'Description5', captions: 'Captions5', lectureNote: 'LectureNote5', locked: true },
  { idSec: 6, sectionTitle: '', title: 'Using Graphic Plugins', video: '', attachments: 'Attachment6.pdf', description: 'Description6', captions: 'Captions6', lectureNote: 'LectureNote6', locked: true },
  { idSec: 7, sectionTitle: "Let's Practice", title: 'Let’s Design a Sign Up Fo..', video: '', attachments: 'Attachment7.pdf', description: 'Description7', captions: 'Captions7', lectureNote: 'LectureNote7', locked: true },
];

export const Curriculum:FC<ScreenProps<'Curriculum'>> = ({navigation,route }) => {
  //@ts-ignore
  const course = route.params?.course || { prix: 0 };
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);

  const handlePlayVideo = (url: string) => {
    setVideoUrl(url);
    setModalVisible(true);
  };

  const handleEnrollPress = (course: Course) => {
    //@ts-ignore
    navigation.navigate('PaymentMethods', { course });
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
    }else if (videoUrl && videoUrl.includes('drive.google.com')) {
      // Google Drive video link (example: https://drive.google.com/file/d/VIDEO_ID/view)
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
  
  
  const renderItem = ({ item }: { item: Section }) => (
    <View>
      {item.sectionTitle ? (
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionHeader}>
            Section {item.idSec.toString().padStart(2, '0')} -{' '}
            <Text style={styles.sectionHeaderTitle}>{item.sectionTitle}</Text>
          </Text>
        </View>
      ) : null}
      <View style={styles.sectionContainer}>
        <View style={styles.indexCircle}>
          <Text style={styles.indexText}>{item.idSec.toString().padStart(2, '0')}</Text>
        </View>
        <Text style={styles.sectionTitle}>{item.title}</Text>
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
      <View style={styles.container}>
        <FlatList
          data={sections}
          renderItem={renderItem}
          keyExtractor={(item) => item.idSec.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </View>
      
     <View style={{marginTop:5}}>
      <CustomButton
          pressEvent={() => handleEnrollPress(course)}
          icon={<ArrowLeftBlueColor />}
          text={`Enroll Course -$${course.prix}`}
        />
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
            <Button title="Close" onPress={() => setModalVisible(false)} />
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
    backgroundColor: isDarkMode?'#333':'#f5f5f5',
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
    color:isDarkMode?'#FFF':'black'
  },
  sectionHeaderTitle: {
    color: '#0080ff',
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDarkMode?'#9c9c9c':'#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
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
    color:'black'
  },
  icon: {
    width: 25,
    height: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

