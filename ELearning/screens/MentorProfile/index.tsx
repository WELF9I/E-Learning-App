import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { Card, Searchbar, Avatar,Title, Paragraph } from 'react-native-paper';
import { ScreenProps } from '../../types';
// @ts-ignore
import IsClickedHeart from '../../assets/categories/IsClickedHeart.png';
// @ts-ignore
import IsNotClickedHeart from '../../assets/categories/IsNotClickedHeart.png';
// @ts-ignore
import BookmarkPressed from '../../assets/categories/BookmarkPressed.png';
// @ts-ignore
import BookmarkNotPressed from '../../assets/categories/BookmarkNotPressed.png';

export const MentorProfile: FC<ScreenProps<'MentorProfile'>> = ({ navigation,route }) => {
  //@ts-ignore
  const {mentor}=route.params;  
  const initialReviews = [
    {
      id: '1',
      name: 'Heather S. McMullen',
      rating: 4.2,
      description: 'The course is Very Good dolor sit amet, con sect tur adipiscing elit. Naturales divitias dixit parab les esse..',
      likes: 760,
      time: '2 Weeks Ago',
      image:'https://imgs.search.brave.com/hhVX_bCBd4rUHz6YG5u-8u_xTyNwULPvjIVsgvlkdnw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQw/ODE0Mzg4L3Bob3Rv/L3RvbS1jcnVpc2Ut/MTk4MS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NlZSUm9G/XzUwWlk2el9ZSzJn/dTlidFJha2JETllC/azJuZWdKTmpKQnhH/TT0'
    },
    {
      id: '2',
      name: 'Natasha B. Lambert',
      rating: 4.8,
      description: 'The course is Very Good dolor vetern, quo etiam utuntur hi capiamus..',
      likes: 918,
      time: '2 Weeks Ago',
      image:'https://imgs.search.brave.com/hhVX_bCBd4rUHz6YG5u-8u_xTyNwULPvjIVsgvlkdnw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQw/ODE0Mzg4L3Bob3Rv/L3RvbS1jcnVpc2Ut/MTk4MS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NlZSUm9G/XzUwWlk2el9ZSzJn/dTlidFJha2JETllC/azJuZWdKTmpKQnhH/TT0'
    },
    {
        id: '3',
        name: 'Heather S. McMullen',
        rating: 4.2,
        description: 'The course is Very Good dolor sit amet, con sect tur adipiscing elit. Naturales divitias dixit parab les esse..',
        likes: 760,
        time: '2 Weeks Ago',
        image:'https://imgs.search.brave.com/hhVX_bCBd4rUHz6YG5u-8u_xTyNwULPvjIVsgvlkdnw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQw/ODE0Mzg4L3Bob3Rv/L3RvbS1jcnVpc2Ut/MTk4MS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NlZSUm9G/XzUwWlk2el9ZSzJn/dTlidFJha2JETllC/azJuZWdKTmpKQnhH/TT0'
      },
  ];
  const courses = [
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
      NomCourse: 'Graphic Advertisement',
      Bande_annonce_cours: 'https://imgs.search.brave.com/-cFNzgqxn9gTksmxjtwquwyy9QRoUKyuA2Q0DcGi1hM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxRDk3TStjNTlM/LmpwZw',
      Niveau_du_cours: 'Intermediate',
      language: 'English',
      duration: '4 weeks',
      topic: 'Graphic Design',
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
  const [reviews, setReviews] = useState(initialReviews);
  const [likedReviews, setLikedReviews] = useState<{ [key: string]: boolean }>({});
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [isRatingsActive, setIsRatingsActive] = useState<boolean>(true);
  const [isCoursesActive, setIsCoursesActive] = useState<boolean>(false);
  const [bookmarkedCourses, setBookmarkedCourses] = useState<number[]>([]);

  const handleLikeReview = (id: string) => {
    setLikedReviews((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));

    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id
          ? {
              ...review,
              likes: likedReviews[id] ? review.likes - 1 : review.likes + 1,
            }
          : review
      )
    );
  };
  const handleFollow=()=>{
    setIsFollowed(!isFollowed);
  }
  const toggleRatings = () => {
    setIsRatingsActive(true);
    setIsCoursesActive(false);
  };
  
  const toggleCourses = () => {
    setIsCoursesActive(true);
    setIsRatingsActive(false);
  };
  const toggleBookmark = (id: number) => {
    setBookmarkedCourses(prev => 
      prev.includes(id) ? prev.filter(courseId => courseId !== id) : [...prev, id]
    );
  };

  const Style1 = {
    color: isRatingsActive ? 'white' : 'black',
  };
  
  const Style2 = {
    color: isCoursesActive ? 'white' : 'black',
  };
  
  const textStyle1= { ...Style1, fontWeight: 'bold', fontSize: 16 };
  const textStyle2= { ...Style2, fontWeight: 'bold', fontSize: 16 };

  const ButtonStyle1={
    textAlign:'center',
    backgroundColor:'#0080ff',
    paddingTop:10,
    alignItems:'center',
    width:'50%',
    height:'96%',
    elevation: 5,
    marginTop:'0.2%',
  };
  
  const ButtonStyle2={
    textAlign:'center',
    backgroundColor:'#F5F9FF',
    paddingTop:10,
    alignItems:'center',
    width:'50%',
    height:'96%',
    marginTop:'0.2%',
    elevation:2,
  };
  const followButton= {
    marginTop: 25,
    textAlign:'center',
    backgroundColor:'#0080ff',
    borderRadius:25,
    height:50,
    width:150,
    alignItems:'center',
    justifyContent:'center',
    elevation:2,
  };
  const followedButton= {
    marginTop: 25,
    textAlign: 'center',
    backgroundColor: '#E8F1FF',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'gray',
    height: 50,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    elevation:2,
  };
  const followButtonText={
    color:'white',
    fontWeight:'bold',
    fontSize:16,
  };
  const followedButtonText={
    color:'gray',
    fontWeight:'bold',
    fontSize:16,
  };

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <Avatar.Image size={80} source={{ uri: 'https://imgs.search.brave.com/Xh-nB_pWrdaG8Kly7rO_mdQxB2Mt9iw8BxzS3D5EBf0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZ3ItYXNzZXRz/LmNvbS9hdXRob3Jz/LzE2Mjk2OTM2NzFw/NS8zMTM3MzIyLmpw/Zw' }} style={styles.avatar} />
        <Text style={styles.name}>{mentor.Nom_utl}</Text>
        <Text style={styles.title}>{mentor.bio}</Text>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>26</Text>
            <Text style={styles.statLabel}>courses</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>15800</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>8750</Text>
            <Text style={styles.statLabel}>Ratings</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleFollow} style={isFollowed ? followedButton : followButton}><Text style={isFollowed ?followedButtonText : followButtonText}>{isFollowed ? 'Followed' : 'Follow'}</Text></TouchableOpacity>
      </View>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          Sed quanta s alias nunc tantum possitne tanta Nec vero sum nescius esse utilitatem in historia non modo voluptatem.
        </Text>
      </View>
      {/* Buttons */}
      <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={toggleRatings} style={isRatingsActive ? ButtonStyle1 : ButtonStyle2}><Text style={textStyle1}>Ratings</Text></TouchableOpacity>
            <TouchableOpacity onPress={toggleCourses} style={isCoursesActive ? ButtonStyle1 : ButtonStyle2}><Text style={textStyle2}>Courses</Text></TouchableOpacity>
        </View>
        {/* End Buttons */}
    </>
  );

  return (
    <>
      {isRatingsActive ? (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          renderItem={({ item }) => (
            <View style={styles.review}>
              <Avatar.Image size={40} source={{ uri: item.image }} style={styles.reviewAvatar} />
              <View style={styles.reviewInfo}>
                <Text style={styles.reviewName}>{item.name}</Text>
                <Text style={styles.reviewDescription}>{item.description}</Text>
                <View style={styles.reviewStats}>
                  <TouchableOpacity onPress={() => handleLikeReview(item.id)}>
                    <Image
                      source={likedReviews[item.id] ? IsClickedHeart : IsNotClickedHeart}
                      style={styles.heartIcon}
                    />
                  </TouchableOpacity>
                  <Text style={styles.likesText}>{item.likes}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
              </View>
              <View style={{ width: 80, backgroundColor: '#E8F1FF', alignItems: 'center', borderRadius: 25, height: 30, justifyContent: 'center', borderColor: '#4D81E5' }}>
                <Text style={styles.reviewRating}>⭐{item.rating}</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id_cours.toString()}
          ListHeaderComponent={renderHeader}
          renderItem={({ item: course }) => (
            <Card key={course.id_cours} style={styles.courseCard}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Card.Cover source={{ uri: course.Bande_annonce_cours }} style={styles.courseImage} />
                <Card.Content style={{ paddingTop: 25, width: '63%' }}>
                  <View style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'row-reverse' }}>
                    <TouchableOpacity onPress={() => toggleBookmark(course.id_cours)} style={{ paddingTop: 10 }}>
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
                    <Paragraph>
                      ⭐{course.Scoremin}
                    </Paragraph>
                  </View>
                </Card.Content>
              </View>
            </Card>
          )}
        />
      )}
    </>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  avatar: {
    marginTop: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  title: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  stats: {
    flexDirection: 'row',
    marginTop: 16,
  },
  stat: {
    alignItems: 'center',
    marginHorizontal: 16,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },

  description: {
    padding: 16,
    backgroundColor: '#e0e0e0',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  review: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  reviewAvatar: {
    marginRight: 16,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  reviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  heartIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  likesText: {
    fontSize: 14,
    color: '#666',
    marginLeft:-90
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  reviewRating: {
    color: '#000',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f5a623',
  },
  buttonsContainer: {
    width:'100%',
    backgroundColor:'#E8F1FF',
    marginBottom:20,
    height:45,
    justifyContent:'space-between',
    display:'flex',
    flexDirection:'row',
  },
  bookmarkIcon: {
    width: 20,
    height: 20,
  },
  courseCard: {
    marginBottom: 16,
    backgroundColor: 'white',
    elevation: 2,
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
    color: '#202244',
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
});

