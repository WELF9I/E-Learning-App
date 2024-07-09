import React, { FC, useState ,useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Searchbar, Avatar,Title, Paragraph } from 'react-native-paper';
import { ProgressBar } from 'react-native-paper';
import { ScreenProps } from '../../types';
// @ts-ignore
import CustomSearchIcon from '../../assets/categories/search.png';
import { Footer } from '../Footer';
import { useTheme } from '../../utils/ThemeContext';

interface Course {
  id_cours: number;
  NomCourse: string;
  Bande_annonce_cours: string;
  Niveau_du_cours: string;
  language: string;
  duration: string;
  topic: string;
  date_Creations: string;
  Date_miseaj: string;
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

interface User {
  Nom_utl: string;
  pass: string;
  Role: string;
  education: string;
  prénom: string;
  Img: string;
  E_mail: string;
  Num: string;
}

interface Former extends User {
  idF: number;
  linkedinLink: string;
  twitterLink: string;
  youtubeLink: string;
  instaLink: string;
  fbLink: string;
  Certifications: string;
  bio: string;
}

const CompletedCourses: Course[] = [
  {
    id_cours: 1,
    NomCourse: 'Design Advanced',
    Bande_annonce_cours: 'https://imgs.search.brave.com/-cFNzgqxn9gTksmxjtwquwyy9QRoUKyuA2Q0DcGi1hM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxRDk3TStjNTlM/LmpwZw',
    Niveau_du_cours: 'Advanced',
    language: 'English',
    duration: '6 weeks',
    topic: 'Graphic Design',
    date_Creations: '2017-06-15',
    Date_miseaj:'2020-06-15',
    Information_de_cours: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    courseRequirement: 'Basic knowledge of design tools',
    prix: 28,
    reduction: true,
    Nouveau_prix: 20,
    description: 'This course covers advanced techniques in graphic design.',
    Sous_titre: 'Learn advanced graphic design skills',
    Scoremin: 4.2,
    NbEssai_Quiz: 7830
  },
  {
    id_cours: 2,
    NomCourse: 'Web Development',
    Bande_annonce_cours: 'https://imgs.search.brave.com/-cFNzgqxn9gTksmxjtwquwyy9QRoUKyuA2Q0DcGi1hM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxRDk3TStjNTlM/LmpwZw',
    Niveau_du_cours: 'Intermediate',
    language: 'English',
    duration: '4 weeks',
    topic: 'Graphic Design',
    date_Creations:'2023-06-15',
    Date_miseaj:  '2024-06-15',
    Information_de_cours: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    courseRequirement: 'None',
    prix: 42,
    reduction: false,
    Nouveau_prix: 42,
    description: 'Master the art of graphic advertisement.',
    Sous_titre: 'Create effective graphic ads',
    Scoremin: 4.1,
    NbEssai_Quiz: 5047
  },
];
const OngoingCourses: Course[] = [
    {
      id_cours: 1,
      NomCourse: 'Design Advanced',
      Bande_annonce_cours: 'https://imgs.search.brave.com/-cFNzgqxn9gTksmxjtwquwyy9QRoUKyuA2Q0DcGi1hM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxRDk3TStjNTlM/LmpwZw',
      Niveau_du_cours: 'Advanced',
      language: 'English',
      duration: '6 weeks',
      topic: 'Graphic Design',
      date_Creations: '2017-06-15',
      Date_miseaj:'2020-06-15',
      Information_de_cours: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      courseRequirement: 'Basic knowledge of design tools',
      prix: 28,
      reduction: true,
      Nouveau_prix: 20,
      description: 'This course covers advanced techniques in graphic design.',
      Sous_titre: 'Learn advanced graphic design skills',
      Scoremin: 4.2,
      NbEssai_Quiz: 7830
    },
    {
      id_cours: 2,
      NomCourse: 'Web Development for Beginners',
      Bande_annonce_cours: 'https://imgs.search.brave.com/-cFNzgqxn9gTksmxjtwquwyy9QRoUKyuA2Q0DcGi1hM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxRDk3TStjNTlM/LmpwZw',
      Niveau_du_cours: 'Intermediate',
      language: 'English',
      duration: '4 weeks',
      topic: 'Web Development',
      date_Creations:'2023-06-15',
      Date_miseaj:  '2024-06-15',
      Information_de_cours: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      courseRequirement: 'None',
      prix: 42,
      reduction: false,
      Nouveau_prix: 42,
      description: 'Master the art of graphic advertisement.',
      Sous_titre: 'Create effective graphic ads',
      Scoremin: 4.1,
      NbEssai_Quiz: 5047
    },
  ];

export const MyCourses: FC<ScreenProps<'MyCourses'>> = ({ navigation,route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const [mentorsData, setMentorsData] = useState<Former[]>([]);
  const [progressValue, setProgressValue] = useState<number>(0);
  const [progressColor, setProgressColor] = useState<string>('#167F71');
  const [bookmarkedCourses, setBookmarkedCourses] = useState<number[]>([]);
  const [isCompletedActive, setIsCompletedActive] = useState<boolean>(false);
  const [isOngoingActive, setIsOngoingActive] = useState<boolean>(true);
  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);

  useEffect(() => {
    let progress = 0.46;
    setProgressValue(progress);
  }, []);
  useEffect(() => {
    const colors = ['#167F71', '#FCCB40', '#FF6B00'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    setProgressColor(colors[randomIndex]);
  }, []);
  const filteredCompletedCourses = CompletedCourses.filter(course =>
    course.NomCourse.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredOngoingCourses = OngoingCourses.filter(course =>
    course.NomCourse.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleOngoingCoursePress = (course: Course) => {
    //@ts-ignore
    navigation.navigate('MyCoursesOngoing', { course });
  };
  const handleCompletedCoursePress = (course: Course) => {
    //@ts-ignore
    navigation.navigate('MyCoursesCompleted', { course });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const handleViewCertificate = (course: Course) => {
    //@ts-ignore
    navigation.navigate('CertificateScreen', { course });
  };
  
  const toggleCompleted = () => {
    setIsCompletedActive(true);
    setIsOngoingActive(false);
  };
  
  const toggleOngoing = () => {
    setIsOngoingActive(true);
    setIsCompletedActive(false);
  };

  const Style1 = {
    color: isCompletedActive ? 'white' : 'black',
  };
  
  const Style2 = {
    color: isOngoingActive ? 'white' : 'black',
  };
  
  const textStyle1= { ...Style1, fontWeight: 'bold', fontSize: 16 };
  const textStyle2= { ...Style2, fontWeight: 'bold', fontSize: 16 };

  const ButtonStyle1={
    alignItems:'center',
    justifyContent:'center',
    borderRadius:25,
    backgroundColor:'#167F71',
    width:150,
    height:45,
    elevation: 5,
  };
  
  const ButtonStyle2={
    alignItems:'center',
    justifyContent:'center',
    borderRadius:25,
    backgroundColor:'#E8E8E8',
    width:150,
    height:45,
    elevation: 5,
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search for ..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchbar}
          icon={() => <Image source={CustomSearchIcon} style={styles.searchIcon} />}
        />
      </View>
      
     {/* Buttons */}
     <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={toggleCompleted} style={isCompletedActive ? ButtonStyle1 : ButtonStyle2}><Text style={textStyle1}>Completed</Text></TouchableOpacity>
        <TouchableOpacity onPress={toggleOngoing} style={isOngoingActive ? ButtonStyle1 : ButtonStyle2}><Text style={textStyle2}>Ongoing</Text></TouchableOpacity>
      </View>
      {/* End Buttons */}

      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        {isCompletedActive && (
          <View style={{paddingTop:15,}}>
            {filteredCompletedCourses.map(course => (
            <TouchableOpacity key={course.id_cours} onPress={() => handleCompletedCoursePress(course)}>
              <Card key={course.id_cours} style={styles.courseCard}>
              <View style={{display:'flex',flexDirection:'row'}}>
              <Card.Cover source={{ uri: course.Bande_annonce_cours }} style={styles.courseImage} />
              <Card.Content style={{paddingTop:25,width:'63%'}}>
              <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>     
                <Paragraph style={styles.courseTopic}>{course.topic}</Paragraph>
                <Image source={require('../../assets/categories/completed.png')} style={styles.CompletedIcon} />
              </View>
                <Title style={styles.courseTitle}>{course.NomCourse}</Title>
                <View style={styles.courseDetails}>
                  <Paragraph style={styles.Rate}>
                    ⭐{course.Scoremin}
                  </Paragraph>
                  <TouchableOpacity onPress={() => handleViewCertificate(course)}>
                    <Text style={styles.certificateText}>VIEW CERTIFICATE</Text>
                  </TouchableOpacity>
                </View>
              </Card.Content>
              </View>
            </Card>
            </TouchableOpacity>
            ))}
          </View>
        )}

        {isOngoingActive && (
          <View style={{paddingTop:15,}}>
          {filteredOngoingCourses.map(course => (
          <TouchableOpacity key={course.id_cours} onPress={() => handleOngoingCoursePress(course)}>
            <Card key={course.id_cours} style={styles.courseCard}>
            <View style={{display:'flex',flexDirection:'row'}}>
            <Card.Cover source={{ uri: course.Bande_annonce_cours }} style={styles.courseImage} />
            <Card.Content style={{paddingTop:25,width:'63%'}}>   
              <Paragraph style={styles.courseTopic}>{course.topic}</Paragraph>
              <Title style={styles.courseTitle}>{course.NomCourse}</Title>
                <Paragraph style={styles.Rate}>
                  ⭐{course.Scoremin}
                </Paragraph>
                <View style={styles.progressBar}>
                <ProgressBar
                    progress={progressValue}
                    theme={{ colors: { primary: progressColor } }}
                    style={{ height: 6, borderRadius: 5 ,width:'90%',marginBottom:10}}
                  />
                </View>
            </Card.Content>
            </View>
          </Card>
          </TouchableOpacity>
          ))}
        </View>
        )}
      </ScrollView>
      <View style={{width:'110%',bottom:0,position:'absolute'}}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
};

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: isDarkMode?'#333':'#f5f5f5',
  },
  progressBar: {
    height: 10,
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchbar: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchIcon: {
    width: 35,
    height: 35,
  },
  filterButton: {
    marginLeft: 8,
  },
  filterIcon: {
    width: 31,
    height: 31,
  },
  buttonsContainer: {
    width:'90%',
    marginTop:12,
    marginLeft:20,
    marginRight:40,
    marginBottom:20,
    height:45,
    justifyContent:'space-between',
    display:'flex',
    flexDirection:'row',
  },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeButton: {
    backgroundColor: '#167F71',
  },
  inactiveButton: {
    backgroundColor: '#E8E8E8',
  },
  scrollViewContent: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  bookmarkIcon: {
    width: 24,
    height: 24,
  },
  courseCard: {
    marginBottom: 25,
    backgroundColor: isDarkMode?'#333':'white',
    width:'99.4%'
  },
  courseImage: {
    height: 150,
    width:160,
  },
  courseTopic: {
    fontSize: 12,
    color: '#FF6B00',
    marginTop:-10,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: isDarkMode?'#FFF':'#202244',
  },
  courseDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coursePrice: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#3399ff',
    marginRight: 10,
  },
  courseOriginalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  mentorItem: {
    marginLeft:15,
    marginBottom:30,
    display:'flex',
    flexDirection:'row',
    alignItems: 'center',
  },
  mentorName: {
    fontWeight:'bold',
    marginTop: 5,
    fontSize: 16,
    color:'#000'
  },
  mentorCertification:{
    color : '#545454'
  },
  certificateText:{
    marginLeft:25,
    color:'#167F71',
    textDecorationLine: 'underline',
  },
  CompletedIcon:{
    width:30,
    height:30,
    position:'absolute',
    right:20,
    top:-37,
  },
  Rate:{
    color:isDarkMode?'#FFF':'black',
  }
});

