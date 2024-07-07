import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ScreenProps } from '../../types';
// @ts-ignore
import IsClickedHeart from '../../assets/categories/IsClickedHeart.png';
// @ts-ignore
import IsNotClickedHeart from '../../assets/categories/IsNotClickedHeart.png';
// @ts-ignore
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';
import { CustomButton } from '../../components';

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
const initialReviews = [
  {
    id: '1',
    name: 'Heather S. McMullen',
    text: 'The Course is Very Good dolor sit amet, con sect tur adipiscing elit. Naturales divitias dixit parab les esse..',
    rating: 4.2,
    likes: 760,
    date: '2 Weeks Ago',
    image:'https://imgs.search.brave.com/QNuHtKPVBWNcY-g4Xu-6830byfWvLIFPQvp_H1Jsb1A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wb3J0cmFpdC1z/bWlsaW5nLXlvdW5n/LW1hbl8xMDQ4OTQ0/LTE0MzA1ODQ3Lmpw/Zw'
  },
  {
    id: '2',
    name: 'Natasha B. Lambert',
    text: 'The Course is Very Good dolor veterm, quo etiam utuntur hi capiamus..',
    rating: 4.8,
    likes: 918,
    date: '2 Weeks Ago',
    image:'https://imgs.search.brave.com/QNuHtKPVBWNcY-g4Xu-6830byfWvLIFPQvp_H1Jsb1A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wb3J0cmFpdC1z/bWlsaW5nLXlvdW5n/LW1hbl8xMDQ4OTQ0/LTE0MzA1ODQ3Lmpw/Zw'
  },
  {
    id: '3',
    name: 'Marshall A. Lester',
    text: 'The Course is Very Good dolor sit amet, con sect tur adipiscing elit. Naturales divitias dixit parab les esse..',
    rating: 4.6,
    likes: 914,
    date: '2 Weeks Ago',
    image:'https://imgs.search.brave.com/QNuHtKPVBWNcY-g4Xu-6830byfWvLIFPQvp_H1Jsb1A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wb3J0cmFpdC1z/bWlsaW5nLXlvdW5n/LW1hbl8xMDQ4OTQ0/LTE0MzA1ODQ3Lmpw/Zw'
  },
  {
    id: '4',
    name: 'Frances D. Stanford',
    text: 'The Course is Very Good dolor veterm, quo etiam utuntur hi capiamus..',
    rating: 4.8,
    likes: 0,
    date: '2 Weeks Ago',
    image:'https://imgs.search.brave.com/QNuHtKPVBWNcY-g4Xu-6830byfWvLIFPQvp_H1Jsb1A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wb3J0cmFpdC1z/bWlsaW5nLXlvdW5n/LW1hbl8xMDQ4OTQ0/LTE0MzA1ODQ3Lmpw/Zw'
  },
];
export const ViewCourse: FC<ScreenProps<'ViewCourse'>> = ({navigation,route }) => {
  //@ts-ignore
  const { course } = route.params;
  const [isAboutActive, setIsAboutActive] = useState<boolean>(false);
  const [isCurriculumActive, setIsCurriculumActive] = useState<boolean>(true);
  const [likedReviews, setLikedReviews] = useState<{ [key: string]: boolean }>({});
  const [reviews, setReviews] = useState(initialReviews);

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
  const handleEnrollPress = (course: Course) => {
    //@ts-ignore
    navigation.navigate('Curriculum', { course });
  };

  const handleCourseReview=(course:Course)=>{
    //@ts-ignore
    navigation.navigate('ReviewCourse',{course})
  }

  // const handleLikeReview=(id: string)=>{
  //   setLikeReview(!likeReview);
  // }
  const toggleAbout = () => {
    setIsAboutActive(true);
    setIsCurriculumActive(false);
  };
  
  const toggleCurriculum = () => {
    setIsCurriculumActive(true);
    setIsAboutActive(false);
  };

  const Style1 = {
    color: isAboutActive ? 'white' : 'black',
  };
  
  const Style2 = {
    color: isCurriculumActive ? 'white' : 'black',
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
    elevation: 5,
    marginTop:'0.2%',
  };
  const courseContainer1= {
    width:'90%',
    marginLeft:'5%',
    height:'63%',
    backgroundColor: '#fff',
    borderRadius:20,
    padding: 16,
    paddingTop: 32,
    elevation:2,
  };
  const courseContainer2= {
    width:'90%',
    marginLeft:'5%',
    height:'34%',
    backgroundColor: '#fff',
    borderRadius:20,
    padding: 16,
    paddingTop: 32,
    elevation:2,
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{width:'100%',height:190}}>
            <Image source={{ uri: course.Bande_annonce_cours }} style={{width:'100%',height:190,zIndex:-1}}/>
        </View>

      <View style={isCurriculumActive ? courseContainer1 : courseContainer2}>
        <View style={styles.iconContainer}>
            <Image source={require('../../assets/categories/VideoIcon.png')} style={{width:60,height:60}} />
        </View>
       <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:10,}}>
        <Text style={styles.courseCategory}>{course.topic}</Text>
        <Text style={{marginRight:10,color:'black',fontWeight:'bold'}}>⭐{course.Scoremin}</Text>
       </View>
        <Text style={styles.courseTitle}>{course.NomCourse}</Text>
        <View style={styles.courseInfo}>
          <Text style={styles.coursePrice}>${course.prix}</Text>
        </View>
        {/* Buttons */}
        <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={toggleAbout} style={isAboutActive ? ButtonStyle1 : ButtonStyle2}><Text style={textStyle1}>About</Text></TouchableOpacity>
            <TouchableOpacity onPress={toggleCurriculum} style={isCurriculumActive ? ButtonStyle1 : ButtonStyle2}><Text style={textStyle2}>Curriculum</Text></TouchableOpacity>
        </View>
        {/* End Buttons */}
        {isCurriculumActive ? (
        <ScrollView nestedScrollEnabled contentContainerStyle={styles.CourseContentContainer} showsVerticalScrollIndicator={true}>
        <View style={styles.section}>
        {sections.map((item) => (
        <View key={item.idSec} style={styles.section}>
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
              <TouchableOpacity  style={{ marginRight: 10 }}>
                <Image source={require('../../assets/categories/PlayIcon.png')} style={styles.icon} />
              </TouchableOpacity>
            ) : (
              <Image source={require('../../assets/categories/padlock.png')} style={styles.icon} />
            )}
          </View>
        </View>
      ))}
        </View> 

        
        </ScrollView>)
         : (
            <View>
                <Text style={{fontSize:16,marginBottom:15}}>Graphic Design now a popular profession graphic design by off your career about tantas regiones barbarorum pedibus obiit.</Text>
                <Text  style={{fontSize:16,}}>Graphic Design in a popular profession l Cur tantas regiones barbarorum pedibus obiit, maria transmi Et ne nimium beatus est; Addidisti ad extremum etiam.</Text>
            </View>
                
         )}            
      </View>

      {isAboutActive && (
    <ScrollView nestedScrollEnabled contentContainerStyle={styles.CourseContentContainer} showsVerticalScrollIndicator={true}>
    <View style={{width:'90%',margin:'auto',marginBottom:0,marginTop:10,}}>
        <View style={styles.instructorContainer}>
            <Text style={styles.instructorTitle}>Instructor</Text>
            <View style={styles.instructor}>
                <Image source={{uri: 'https://imgs.search.brave.com/QNuHtKPVBWNcY-g4Xu-6830byfWvLIFPQvp_H1Jsb1A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wb3J0cmFpdC1z/bWlsaW5nLXlvdW5n/LW1hbl8xMDQ4OTQ0/LTE0MzA1ODQ3Lmpw/Zw'}} style={styles.instructorImage} />
                <View style={styles.instructorInfo}>
                    <Text style={styles.instructorName}>William S. Cunningham</Text>
                    <Text style={styles.instructorRole}>Graphic Design</Text>
                </View>
            </View>
        </View>
        
        <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>What You'll Get</Text>
            <View style={styles.detailItem}>
                <Image source={require('../../assets/categories/lesson.png')} style={styles.detailIcon} />
                <Text style={styles.detailText}>25 Lessons</Text>
            </View>
            <View style={styles.detailItem}>
                <Image source={require('../../assets/categories/access.png')} style={styles.detailIcon} />
                <Text style={styles.detailText}>Access Mobile, Desktop & TV</Text>
            </View>
            <View style={styles.detailItem}>
                <Image source={require('../../assets/categories/beginner.png')} style={styles.detailIcon} />
                <Text style={styles.detailText}>Beginner Level</Text>
            </View>
            <View style={styles.detailItem}>
                <Image source={require('../../assets/categories/audiobook.png')} style={styles.detailIcon} />
                <Text style={styles.detailText}>Audio Book</Text>
            </View>
            <View style={styles.detailItem}>
                <Image source={require('../../assets/categories/lifetime.png')} style={styles.detailIcon} />
                <Text style={styles.detailText}>Lifetime Access</Text>
            </View>
            <View style={styles.detailItem}>
                <Image source={require('../../assets/categories/quizzes.png')} style={styles.detailIcon} />
                <Text style={styles.detailText}>100 Quizzes</Text>
            </View>
            <View style={styles.detailItem}>
                <Image source={require('../../assets/categories/certification.png')} style={styles.detailIcon} />
                <Text style={styles.detailText}>Certificate of Completion</Text>
            </View>
        </View>
        
        <View style={styles.reviewsContainer}>
            <View style={styles.reviewsHeader}>
                <Text style={styles.reviewsTitle}>Reviews</Text>
                <TouchableOpacity onPress={()=>handleCourseReview(course)}>
                  <Text style={styles.seeAll}>See All ▶</Text>
                </TouchableOpacity>
            </View>

            {/* One review */}
            {reviews.map((review) => (
            <View key={review.id} style={styles.review}>
              <Image source={{ uri: review.image }} style={styles.reviewImage} />
              <View style={styles.reviewInfo}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.reviewName}>{review.name}</Text>
                  <View style={{ width: 80, backgroundColor: '#E8F1FF', alignItems: 'center', borderRadius: 25, height: 30, justifyContent: 'center', borderColor: '#4D81E5' }}>
                    <Text style={styles.reviewRating}>⭐{review.rating}</Text>
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.text}</Text>
                <View style={styles.reviewDetails}>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => handleLikeReview(review.id)}>
                    <Image
                      source={likedReviews[review.id] ? IsClickedHeart : IsNotClickedHeart}
                      style={styles.heartIcon}
                    />
                  </TouchableOpacity>
                  <Text >{review.likes}</Text>
                  </View>
                  <Text style={styles.reviewTime}>{review.date}</Text>
                </View>
              </View>
            </View>
          ))}
            {/* End Review */}

        </View>
    </View>
    
    </ScrollView>)}
       <View style={{marginTop:25}}>
        <CustomButton
          pressEvent={() => handleEnrollPress(course)}
          icon={<ArrowLeftBlueColor />}
          text={`Enroll Course -$${course.prix}`}
        />
        </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F9FF',
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
  CourseContentContainer:{
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: -25, 
    right: 15,
  },
  buttonsContainer: {
    width:'100%',
    backgroundColor:'#E8F1FF',
    marginTop:12,
    marginBottom:20,
    height:45,
    justifyContent:'space-between',
    display:'flex',
    flexDirection:'row',
  },

  courseCategory: {
    color: 'orange',
    fontSize: 15,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    color:'black'
  },
  courseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 4,
    color: '#666',
  },
  coursePrice: {
    color: '#0080ff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  section: {
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'black'
  },
  sectionDuration: {
    color: '#0080ff',
    fontWeight:'bold'
  },
  lessonContainer: {
    marginVertical: 8,
  },
  lesson: {
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  lessonNumber: {
    backgroundColor: '#ddd',
    borderRadius: 20,
    padding: 6,
    width: 32,
    height: 32,
    textAlign: 'center',
    marginRight: 16,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 17,
    color:'black',
  },
  lessonDuration: {
    color: '#666',
  },
  enrollButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0080ff',
    padding: 16,
    borderRadius: 25,
    width:300,
    left:50,
    bottom:20,
    marginTop:35,
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  icon: {
    width: 15,
    height: 15,
  },
  instructorContainer: {
    marginTop: 16,
    
  },
  instructorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color:'black'
  },
  instructor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  instructorInfo: {
    marginLeft: 16,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'black'
  },
  instructorRole: {
    color: '#666',
  },
  detailsContainer: {
    marginTop: 16,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color:'black'
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  detailIcon: {
    width: 20,
    height: 24,
    marginRight: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
  },
  reviewsContainer: {
    marginTop: 16,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'black'
  },
  seeAll: {
    color: '#0080ff',
    fontWeight: 'bold',
  },
  review: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  reviewImage: {
    width: 43,
    height: 43,
    borderRadius: 20,
  },
  reviewInfo: {
    marginLeft: 16,
    flex: 1,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'black'
  },
  reviewComment: {
    color: '#666',
  },
  reviewDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  reviewRating: {
    color: '#0080ff',
    fontWeight: 'bold',
  },
  reviewTime: {
    color: '#666',
    marginRight:140,
  },
  heartIcon:{
    width:23,
    height:23,
  }
});