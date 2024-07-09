import React, { FC, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Searchbar, Avatar,Title, Paragraph } from 'react-native-paper';
import { ScreenProps } from '../../types';
// @ts-ignore
import CustomSearchIcon from '../../assets/categories/search.png';
// @ts-ignore
import BookmarkPressed from '../../assets/categories/BookmarkPressed.png';
// @ts-ignore
import BookmarkNotPressed from '../../assets/categories/BookmarkNotPressed.png';
// @ts-ignore
import FilterIcon from '../../assets/categories/FilterIcon.png';
import {useTheme} from '../../utils/ThemeContext'

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

const courses: Course[] = [
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
    NomCourse: 'Graphic Advertisement',
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
const mentors: Former[] = [
  {
    idF: 1,
    Nom_utl: 'Gonja',
    pass: 'password1',
    Role: 'Former',
    education: 'Masters in Design',
    prénom: 'Sonja',
    Img: 'https://imgs.search.brave.com/QNuHtKPVBWNcY-g4Xu-6830byfWvLIFPQvp_H1Jsb1A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wb3J0cmFpdC1z/bWlsaW5nLXlvdW5n/LW1hbl8xMDQ4OTQ0/LTE0MzA1ODQ3Lmpw/Zw',
    E_mail: 'sonja@example.com',
    Num: '1234567890',
    linkedinLink: 'https://linkedin.com/in/sonja',
    twitterLink: 'https://twitter.com/sonja',
    youtubeLink: 'https://youtube.com/sonja',
    instaLink: 'https://instagram.com/sonja',
    fbLink: 'https://facebook.com/sonja',
    Certifications: '3D Design',
    bio: 'Experienced in advanced graphic design techniques.'
  },
  {
    idF: 2,
    Nom_utl: 'Jensen',
    pass: 'password2',
    Role: 'Former',
    education: 'Bachelors in Computer Science',
    prénom: 'Jensen',
    Img: 'https://imgs.search.brave.com/QNuHtKPVBWNcY-g4Xu-6830byfWvLIFPQvp_H1Jsb1A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wb3J0cmFpdC1z/bWlsaW5nLXlvdW5n/LW1hbl8xMDQ4OTQ0/LTE0MzA1ODQ3Lmpw/Zw',
    E_mail: 'jensen@example.com',
    Num: '0987654321',
    linkedinLink: 'https://linkedin.com/in/jensen',
    twitterLink: 'https://twitter.com/jensen',
    youtubeLink: 'https://youtube.com/jensen',
    instaLink: 'https://instagram.com/jensen',
    fbLink: 'https://facebook.com/jensen',
    Certifications: 'Web Development',
    bio: 'Specialist in web development and advertisement design.'
  },
];

export const OnlineCoursesScreen: FC<ScreenProps<'OnlineCoursesScreen'>> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const [mentorsData, setMentorsData] = useState<Former[]>([]);
  const [bookmarkedCourses, setBookmarkedCourses] = useState<number[]>([]);
  const [isCoursesActive, setIsCoursesActive] = useState<boolean>(true);
  const [isMentorsActive, setIsMentorsActive] = useState<boolean>(false);
  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);

  const handleCoursePress = (course: Course) => {
    //@ts-ignore
    navigation.navigate('ViewCourse', { course });
  };
  const filteredCourses = courses.filter(course =>
    course.NomCourse.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMentors = mentors.filter(mentor =>
    mentor.Nom_utl.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.prénom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleBookmark = (id: number) => {
    setBookmarkedCourses(prev => 
      prev.includes(id) ? prev.filter(courseId => courseId !== id) : [...prev, id]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleDataMentor=(mentor:Former)=>{
    //@ts-ignore
    navigation.navigate('MentorProfile', { mentor });
  }

  const toggleCourses = () => {
    setIsCoursesActive(true);
    setIsMentorsActive(false);
  };
  
  const toggleMentors = () => {
    setIsMentorsActive(true);
    setIsCoursesActive(false);
  };

  const Style1 = {
    color: isCoursesActive ? 'white' : 'black',
  };
  
  const Style2 = {
    color: isMentorsActive ? 'white' : 'black',
  };
  
  const textStyle1= { ...Style1, fontWeight: 'bold', fontSize: 16 };
  const textStyle2= { ...Style2, fontWeight: 'bold', fontSize: 16 };

  const ButtonStyle1={
    textAlign:'center',
    borderRadius:25,
    backgroundColor:'#167F71',
    paddingTop:10,
    paddingLeft:45,
    width:150,
    height:45,
    elevation: 5,
  };
  
  const ButtonStyle2={
    textAlign:'center',
    borderRadius:25,
    backgroundColor:'#E8E8E8',
    paddingTop:10,
    paddingLeft:45,
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
        <TouchableOpacity onPress={toggleCourses} style={isCoursesActive ? ButtonStyle1 : ButtonStyle2}><Text style={textStyle1}>Courses</Text></TouchableOpacity>
        <TouchableOpacity onPress={toggleMentors} style={isMentorsActive ? ButtonStyle1 : ButtonStyle2}><Text style={textStyle2}>Mentors</Text></TouchableOpacity>
      </View>
      {/* End Buttons */}

      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        {isCoursesActive && (
          <View>
            {filteredCourses.map(course => (
              <TouchableOpacity key={course.id_cours} onPress={() => handleCoursePress(course)}>
              <Card key={course.id_cours} style={styles.courseCard}>
              <View style={{display:'flex',flexDirection:'row'}}>
              <Card.Cover source={{ uri: course.Bande_annonce_cours }} style={styles.courseImage} />
              <Card.Content style={{paddingTop:25,width:'63%'}}>
                <View style={{justifyContent:'space-between',display:'flex',flexDirection:'row-reverse'}}>
                  <TouchableOpacity onPress={() => toggleBookmark(course.id_cours)} style={{paddingTop:10}}>
                    <Image
                      source={bookmarkedCourses.includes(course.id_cours) ? BookmarkPressed : BookmarkNotPressed}
                      style={styles.bookmarkIcon}
                    />
                  </TouchableOpacity>
                  <Paragraph style={styles.courseTopic}>{course.topic}</Paragraph>
                </View>
                <Title style={styles.courseTitle}>{course.NomCourse}</Title>
                <View style={styles.courseDetails}>
                  <Text style={styles.coursePrice}>${course.prix}</Text>
                  <Text style={styles.courseOriginalPrice}>${course.Nouveau_prix}</Text>
                  <Paragraph style={styles.Rate}>
                    ⭐{course.Scoremin}
                  </Paragraph>
                </View>
              </Card.Content>
              </View>
            </Card>
            </TouchableOpacity>
            ))}
          </View>
        )}

        {isMentorsActive && (
          <View>
            {filteredMentors.map(mentor => (
              <View key={mentor.idF} >
                <TouchableOpacity style={styles.mentorItem} onPress={()=> handleDataMentor(mentor)}>
                <Avatar.Image size={55} source={{ uri: mentor.Img }} />
                  <View style={{marginLeft:10}}>
                    <Text style={styles.mentorName}>{mentor.Nom_utl} {mentor.prénom}</Text>
                    <Paragraph style={styles.mentorCertification}>{mentor.Certifications}</Paragraph>
                  </View>
                </TouchableOpacity>
            </View>
            ))}
          </View>
        )}
      </ScrollView>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchbar: {
    flex: 1,
    backgroundColor: isDarkMode?'#FFF':'#FFF',
  },
  searchIcon: {
    width: 35,
    height: 35,
  },
  buttonsContainer: {
    width:'90%',
    marginTop:12,
    marginLeft:20,
    marginRight:40,
    marginBottom:50,
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
    marginBottom: 16,
    backgroundColor: isDarkMode?'#333':'white',
    elevation: 2,
    width:'99.4%'
  },
  courseImage: {
    height: 150,
    width:140,
  },
  courseTopic: {
    fontSize: 12,
    color: '#FF6B00',
    paddingTop: 5,
  },
  courseTitle: {
    fontSize: 14.5,
    fontWeight: 'bold',
    color: isDarkMode?'#FFF':'#202244',
    marginVertical: 5,
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
    color:isDarkMode?'#FFF':'#000'
  },
  mentorCertification:{
    color : isDarkMode?'#fbfef8':'#545454'
  },
  Rate:{
    color:isDarkMode?'#FFF':'black',
  }
});

