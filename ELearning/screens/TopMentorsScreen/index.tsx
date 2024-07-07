import React, { FC, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Searchbar, Avatar,Title, Paragraph } from 'react-native-paper';
import { ScreenProps } from '../../types';
// @ts-ignore
import CustomSearchIcon from '../../assets/categories/search.png';

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

export const TopMentorsScreen : FC<ScreenProps<'TopMentorsScreen'>> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mentorsData, setMentorsData] = useState<Former[]>([]);
  const filteredMentors = mentors.filter(mentor =>
    mentor.Nom_utl.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.prénom.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const handleDataMentor=(mentor:Former)=>{
    //@ts-ignore
    navigation.navigate('MentorProfile', { mentor });
  }


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
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
      <View>
            {filteredMentors.map(mentor => (
              <View key={mentor.idF}>
                <TouchableOpacity onPress={() => handleDataMentor(mentor)} style={styles.mentorItem}>
                <Avatar.Image size={55} source={{ uri: mentor.Img }} />
                <View style={{marginLeft:10}}>
                  <Text style={styles.mentorName}>{mentor.Nom_utl} {mentor.prénom}</Text>
                  <Paragraph style={styles.mentorCertification}>{mentor.Certifications}</Paragraph>
                </View>
                </TouchableOpacity>
            </View>
            ))}
          </View>
      </ScrollView>
    </View>
  )
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchbar: {
    flex: 1,
    marginBottom:30,
  },
  searchIcon: {
    width: 35,
    height: 35,
  },
  scrollViewContent: {
    paddingBottom: 16,
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
});