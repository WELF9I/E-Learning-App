import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ScreenProps } from '../../types';
// @ts-ignore
import IsClickedHeart from '../../assets/categories/IsClickedHeart.png';
// @ts-ignore
import IsNotClickedHeart from '../../assets/categories/IsNotClickedHeart.png';
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

export const ViewCourse: FC<ScreenProps<'ViewCourse'>> = ({ route, navigation }) => {
    //@ts-ignore
  const { course } = route.params;
  const [isAboutActive, setIsAboutActive] = useState<boolean>(false);
  const [isCurriculumActive, setIsCurriculumActive] = useState<boolean>(true);
  const [likeReview, setLikeReview] = useState<boolean>(false);

  const handleLikeReview=()=>{
    setLikeReview(!likeReview);
  }
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
          <View style={styles.infoItem}>
            <Image source={require('../../assets/categories/CameraIcon.png')} style={styles.icon} />
            <Text style={styles.infoText}>21 Class</Text>
          </View>
          <View style={styles.infoItem}>
            <Image source={require('../../assets/categories/ClockIcon.png')} style={styles.icon} />
            <Text style={styles.infoText}>42 Hours</Text>
          </View>
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
          <Text style={styles.sectionTitle}>Section 01 - <Text style={{color:'#0080ff'}}>Introduction</Text></Text>
          <Text style={styles.sectionDuration}>25 Mins</Text>
        </View>

        <View style={styles.lessonContainer}>
            <View style={styles.lesson}>
                <Text style={styles.lessonNumber}>01</Text>
                <View style={styles.lessonInfo}>
                    <Text style={styles.lessonTitle}>Why Using Graphic De..</Text>
                    <Text style={styles.lessonDuration}>15 Mins</Text>
                </View>
                <TouchableOpacity style={{marginRight:10,}}>
                    <Image source={require('../../assets/categories/PlayIcon.png')} style={{width:25,height:25}} />
                </TouchableOpacity>
            </View>
          <View style={styles.lesson}>
            <Text style={styles.lessonNumber}>02</Text>
            <View style={styles.lessonInfo}>
              <Text style={styles.lessonTitle}>Setup Your Graphic De..</Text>
              <Text style={styles.lessonDuration}>10 Mins</Text>
            </View>
            <TouchableOpacity style={{marginRight:10,}}>
                    <Image source={require('../../assets/categories/PlayIcon.png')} style={{width:25,height:25}} />
                </TouchableOpacity>
          </View>
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
                <TouchableOpacity><Text style={styles.seeAll}>See All ▶</Text></TouchableOpacity>
            </View>

            {/* One review */}
            <View style={styles.review}>
                <Image source={{uri: 'https://via.placeholder.com/40'}} style={styles.reviewImage} />
                <View style={styles.reviewInfo}>
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={styles.reviewName}>William S. Cunningham</Text>
                        <View style={{width:80,backgroundColor:'#E8F1FF',alignItems:'center',borderRadius:25,height:30,justifyContent:'center',borderColor:'#4D81E5',}}><Text style={styles.reviewRating}>⭐4.5</Text></View>
                    </View>
                    <Text style={styles.reviewComment}>The Course is Very Good dolor sit amet, consect tur adipiscing elit. Naturales divitias dixit parab les esse, quod parvo</Text>
                    <View style={styles.reviewDetails}>
                        <View style={{display:'flex',flexDirection:'row'}}>
                        <TouchableOpacity onPress={handleLikeReview}>
                            <Image
                            source={likeReview ? IsClickedHeart : IsNotClickedHeart}
                            style={styles.heartIcon}
                            />
                        </TouchableOpacity>
                            <Text style={{marginLeft:6}}>578</Text>
                        </View>
                        <Text style={styles.reviewTime}>2 Weeks Ago</Text>
                    </View>
                </View>
            </View>
            {/* End Review */}

        </View>
    </View>
    
    </ScrollView>)}
        <TouchableOpacity style={styles.enrollButton}>
          <Text style={styles.enrollButtonText}>Enroll Course - ${course.prix}</Text>
        </TouchableOpacity>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F9FF',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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

