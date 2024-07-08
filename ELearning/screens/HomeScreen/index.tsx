import React, { FC, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image,ImageBackground } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Searchbar } from 'react-native-paper';
import { ScreenProps } from '../../types';
// @ts-ignore
import CustomSearchIcon from '../../assets/categories/search.png';
// @ts-ignore
import NOTIFICATIONS from '../../assets/categories/NOTIFICATIONS.png';
// @ts-ignore
import FilterIcon from '../../assets/categories/FilterIcon.png';
// @ts-ignore
import BgOff from '../../assets/categories/BgOff.jpg';
import { Footer } from '../Footer';

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

const student: User[] = [
  {
    Nom_utl: 'A. Martin',
    pass: 'password123',
    Role: 'Student',
    education: '3D Design Illustration',
    prénom: 'Ronald',
    Img: 'https://cdn-icons-png.flaticon.com/128/16683/16683419.png',
    E_mail: 'ronald.martin@example.com',
    Num: '29051481' 
  }
];

const courses: Course[] = [
  {
    id_cours: 1,
    NomCourse: 'Graphic Design Advanced',
    Bande_annonce_cours: 'https://imgs.search.brave.com/-cFNzgqxn9gTksmxjtwquwyy9QRoUKyuA2Q0DcGi1hM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxRDk3TStjNTlM/LmpwZw',
    Niveau_du_cours: 'Advanced',
    language: 'English',
    duration: '6 weeks',
    topic: 'Graphic Design',
    date_Creations:'2017-06-15',
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
    topic: '3D Design',
    date_Creations: '2023-06-15',
    Date_miseaj: '2024-06-15',
    Information_de_cours: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    courseRequirement: 'None',
    prix: 42,
    reduction: false,
    Nouveau_prix: 42,
    description: 'Master the art of graphic advertisement.',
    Sous_titre: 'Create effective graphic ads',
    Scoremin: 4.3,
    NbEssai_Quiz: 7878
  },
  {
    id_cours: 3,
    NomCourse: 'Web Development',
    Bande_annonce_cours: 'https://imgs.search.brave.com/-cFNzgqxn9gTksmxjtwquwyy9QRoUKyuA2Q0DcGi1hM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxRDk3TStjNTlM/LmpwZw',
    Niveau_du_cours: 'Intermediate',
    language: 'English',
    duration: '4 weeks',
    topic: 'Web Development',
    date_Creations: '2023-06-15',
    Date_miseaj: '2024-06-15',
    Information_de_cours: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    courseRequirement: 'None',
    prix: 42,
    reduction: false,
    Nouveau_prix: 42,
    description: 'Master the art of graphic advertisement.',
    Sous_titre: 'Create effective graphic ads',
    Scoremin: 4.3,
    NbEssai_Quiz: 7878
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
    Certifications: 'Certified Graphic Designer',
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
    Certifications: 'Certified Web Developer',
    bio: 'Specialist in web development and advertisement design.'
  },
];
const prices = ['Paid', 'Free'];

const ratings = ['4.5 & Up Above', '4.0 & Up Above', '3.5 & Up Above', '3.0 & Up Above'];
export const HomeScreen: FC<ScreenProps<'HomeScreen'>> = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseData, setCourseData] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Former[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [bookmarkedCourses, setBookmarkedCourses] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filters, setFilters] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (selectedCategory === 'All') {
      setCourseData(courses);
    } else {
      const filteredData = courses.filter((course) => course.topic === selectedCategory);
      setCourseData(filteredData);
    }
  }, [selectedCategory]);

  useEffect(() => {
    //@ts-ignore
    if (route.params?.filters) {
      //@ts-ignore
      setFilters(route.params.filters);
      console.log('Applied Filters:', route.params?.filters);

    }
    //@ts-ignore
  }, [route.params?.filters]);

  const handlePressCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSeeAllCategories = () => {
    navigation.navigate('CategoriesScreen');
  };

  const handleSeeAllMentors = () => {
    navigation.navigate('TopMentorsScreen');
  };

  const handleSeeAllCourses = () => {
    navigation.navigate('OnlineCoursesScreen');
  };

  const handleViewNotifications = () => {
    navigation.navigate('Notifications');
  };
  // const handleFilterPressed = () => {
  //   navigation.navigate('MyCourses');
  // };

  const handleFilterPressed = () => {
    //@ts-ignore
    navigation.navigate('Filter', { filters });
  };

  const handleDataMentor=(mentor:Former)=>{
    //@ts-ignore
    navigation.navigate('MentorProfile', { mentor });
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredCourses([]);
      setFilteredMentors([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const filteredCourses = courses.filter((course) =>
      course.NomCourse.toLowerCase().includes(query.toLowerCase())
    );

    const filteredMentors = mentors.filter((mentor) =>
      `${mentor.Nom_utl} ${mentor.prénom}`.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredCourses(filteredCourses);
    setFilteredMentors(filteredMentors);
  };

  const toggleBookmark = (id: number) => {
    setBookmarkedCourses((prev) =>
      prev.includes(id) ? prev.filter((courseId) => courseId !== id) : [...prev, id]
    );
  };

  const FetchCourseData = () => {
    setCourseData(courses);
  };

  useEffect(() => {
    FetchCourseData();
  }, []);

  const handleCoursePress = (course: Course) => {
    //@ts-ignore
    navigation.navigate('ViewCourse', { course });
  };

  const applyFiltersToCourses = (courses: Course[]): Course[] => {
    return courses.filter((course) => {
      const categoryMatch =
        !Object.keys(filters).some((key) => categories.includes(key) && filters[key]) ||
        filters[course.topic];
  
      const priceMatch =
        !Object.keys(filters).some((key) => prices.includes(key) && filters[key]) ||
        (filters['Paid'] && course.prix > 0) ||
        (filters['Free'] && course.prix === 0);
  
      const ratingMatch =
        !Object.keys(filters).some((key) => ratings.includes(key) && filters[key]) ||
        (filters['4.5 & Up Above'] && course.Scoremin >= 4.5) ||
        (filters['4.0 & Up Above'] && course.Scoremin >= 4.0) ||
        (filters['3.5 & Up Above'] && course.Scoremin >= 3.5) ||
        (filters['3.0 & Up Above'] && course.Scoremin >= 3.0);
  
      return categoryMatch && priceMatch && ratingMatch;
    });
  };
  useEffect(() => {
    const filtered = applyFiltersToCourses(courseData);
    setFilteredCourses(filtered);
  }, [courseData, filters]);

  const textStyle1 = {
    color: '#3399ff',
  };
  const textStyle2 = {
    color: 'black',
  };

  const textStyle3 = {
    color: 'white',
    fontWeight: 'bold',
  };
  const textStyle4 = {
    color: 'black',
  };

  const ButtonStyle1 = {
    backgroundColor: '#167F71',
    marginBottom: 10,
    marginLeft: 5,
    padding: 10,
    borderRadius: 20,
    marginRight: 2,
    elevation: 2,
    shadowRadius: 2,
  };

  const ButtonStyle2 = {
    backgroundColor: '#E8F1FF',
    marginBottom: 10,
    marginLeft: 5,
    padding: 10,
    borderRadius: 20,
    marginRight: 2,
    elevation: 2,
    shadowRadius: 2,
  };

  const categories = [
    'All',
    'Graphic Design',
    '3D Design',
    'Web Development',
    'Seo & Marketing',
    'Finance & Accounting',
    'Personal Development',
    'Office Productivity',
    'HR Management',
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.headerText}>
          <Text style={styles.greeting}>Hi, {` ${student[0].prénom} ${student[0].Nom_utl} `}</Text>
            <Text style={styles.subGreeting}>What would you like to learn today?</Text>
            <Text>Search below.</Text>
          </View>
          <TouchableOpacity onPress={handleViewNotifications}>
            <Image source={NOTIFICATIONS} style={styles.notificationsIcon} />
          </TouchableOpacity>
        </View>
  
        <View style={styles.searchFilterContainer}>
          <Searchbar
            placeholder="Search for..."
            onChangeText={handleSearch}
            value={searchQuery}
            icon={() => <Image source={CustomSearchIcon} style={styles.searchIcon} />}
            style={styles.searchbar}
          />
          <TouchableOpacity onPress={handleFilterPressed}>
            <Image source={FilterIcon} style={styles.filterIcon} />
          </TouchableOpacity>
        </View>
  
        <Card style={styles.specialOffer}>
          <ImageBackground source={BgOff} style={styles.backgroundImage}>
            <Card.Content style={styles.specialOfferContent}>
              <Title style={styles.specialOfferSmallTitle}>25% OFF*</Title>
              <Title style={styles.specialOfferBigTitle}>Today's Special</Title>
              <Paragraph style={styles.specialOfferText}>
                Get a Discount for Every Course Order only Valid for Today!
              </Paragraph>
            </Card.Content>
          </ImageBackground>
        </Card>
  
        <View style={styles.CategoriesSeeAll}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity onPress={handleSeeAllCategories}>
            <Text style={styles.sectionLittleTitle}>See All ▶</Text>
          </TouchableOpacity>
        </View>
  
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => handlePressCategory(category)}
              style={selectedCategory === category ? ButtonStyle1 : ButtonStyle2}
            >
              <Text style={selectedCategory === category ? textStyle3 : textStyle4}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
  
        <View style={styles.CategoriesSeeAll}>
          <Text style={styles.sectionTitle}>Online Courses</Text>
          <TouchableOpacity onPress={handleSeeAllCourses}>
            <Text style={styles.sectionLittleTitle}>See All ▶</Text>
          </TouchableOpacity>
        </View>
  
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.slice(1).map((category) => (
            <TouchableOpacity key={category} style={styles.categoryType}>
              <Text style={selectedCategory === category ? textStyle1 : textStyle2}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
  
        {/* Display filtered courses and mentors based on search state */}
        {isSearching ? (
          <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.courseList}>
              {filteredCourses.map((course) => (
                <TouchableOpacity key={course.id_cours} style={styles.courseCard} onPress={() => handleCoursePress(course)}>
                <Card key={course.id_cours} style={styles.courseCard}>
                  <Card.Cover source={{ uri: course.Bande_annonce_cours }} style={styles.courseImage} />
                  <Card.Content>
                    <Paragraph style={styles.courseTopic}>{course.topic}</Paragraph>
                    <Title style={styles.courseTitle}>{course.NomCourse}</Title>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Paragraph style={styles.coursePrice}>${course.prix}</Paragraph>
                      <Paragraph>
                        | ⭐{course.Scoremin}
                      </Paragraph>
                    </View>
                  </Card.Content>             
                </Card>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.courseList}>
              {filteredCourses.map((course) => (
                <Card key={course.id_cours} style={styles.courseCard} onPress={() => handleCoursePress(course)}>
                  <Card.Cover source={{ uri: course.Bande_annonce_cours }} style={styles.courseImage} />
                  <Card.Content>
                    <Paragraph style={styles.courseTopic}>{course.topic}</Paragraph>
                    <Title style={styles.courseTitle}>{course.NomCourse}</Title>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Paragraph style={styles.coursePrice}>${course.prix}</Paragraph>
                      <Paragraph>
                        | ⭐{course.Scoremin}
                      </Paragraph>
                    </View>
                  </Card.Content>
                </Card>
              ))}
            </ScrollView>
        )}
  
        <View style={styles.CategoriesSeeAll}>
          <Text style={styles.sectionTitle}>Top Mentors</Text>
          <TouchableOpacity onPress={handleSeeAllMentors}>
            <Text style={styles.sectionLittleTitle}>See All ▶</Text>
          </TouchableOpacity>
        </View>
  
        {/* Always display top mentors, filtered or not */}
        {isSearching ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mentorList}>
            {filteredMentors.map((mentor) => (
              <View key={mentor.idF} style={styles.mentorItem}>
                <TouchableOpacity onPress={()=> handleDataMentor(mentor)}>
                      <Avatar.Image size={50} source={{ uri: mentor.Img }} />
                      <Text style={styles.mentorName}>
                          {`${mentor.Nom_utl} ${mentor.prénom}`}
                      </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mentorList}>
            {mentors.map((mentor) => (
              <View key={mentor.idF} style={styles.mentorItem}>
                <TouchableOpacity onPress={()=> handleDataMentor(mentor)}>
                  <Avatar.Image size={50} source={{ uri: mentor.Img }} />
                  <Text style={styles.mentorName}>
                      {`${mentor.Nom_utl} ${mentor.prénom}`}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}   
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
};  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9FF",
  },
  scrollContainer: {
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"black",
  },
  subGreeting: {
    fontSize: 16,
    color: '#666',
  },
  notificationsIcon: {
    width: 30,
    height: 30,
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchbar: {
    flex: 1,
    marginRight: 8,
    borderRadius: 25,
    backgroundColor: '#F4F4F4',
  },
  searchIcon: {
    width: 30,
    height: 30,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius:25,   
  },
  specialOffer: {
    elevation: 2,
    margin:'auto',
    width:'90%',
    height:'17.5%',
    overflow: 'hidden',
    backgroundColor:'transparent',
    borderRadius:25,
    marginBottom:20,
  },
  specialOfferContent: {
    padding:20,
    justifyContent: 'center',
    width:'100%',
    height:'100%',
  },
  specialOfferSmallTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  specialOfferBigTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  specialOfferText: {
    fontSize: 16,
    color: '#fff',
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#E8F1FF',
    marginBottom:10,
    marginLeft:5,
    padding: 10,
    borderRadius: 20,
    marginRight: 2,
    elevation: 2,
    shadowRadius: 2,
  },
  categoryType: { 
    marginRight: 4,
    padding: 5,
    borderRadius: 20,
    color:'#A0A4AB',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#202244',  
  },
  sectionLittleTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color:'#3399ff',
  },
  CategoriesSeeAll: {
    display:'flex',
    flexDirection:'row',
    marginBottom: 10,
    justifyContent:'space-between',
  },
  courseList: {
    marginBottom: 20,
    paddingTop:5,
    height:225,
  },
  courseCard: {
    borderRadius:15,
    width: 250,
    height:216,
    marginRight: 16,
    marginLeft:2,
    backgroundColor:'white',
    elevation:2,
  },
  courseImage: {
    height: 125,
    width:'100%',
    justifyContent: 'center',
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color:'#202244',
  },
  courseTopic: {
    fontSize: 12,
    color: '#FF6B00',
    paddingTop:5,
  },
  coursePrice: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#3399ff',
    marginRight:10
  },
  courseButton: {
    marginTop: 10,
  },
  mentorList: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  mentorItem: {
    marginRight: 16,
    alignItems: 'center',
  },
  mentorName: {
    marginTop: 5,
    fontSize: 12,
  },
  filterIcon: {
    width: 34,
    height: 34,
  },
  bookmarkIcon: {
    width: 16,
    height: 16,
  },

});