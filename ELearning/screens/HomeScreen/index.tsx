import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {FC} from 'react';
import {ScreenProps} from '../../types';

const courses = [
  { id: 1, title: 'Graphic Design Advanced', category: 'Graphic Design', price: '$28', rating: 4.2, students: 7830, image: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Graphic Advertisement', category: 'Graphic Design', price: '$42', rating: 4.5, students: 9123, image: 'https://via.placeholder.com/150' },
  { id: 3, title: 'Graphic Design Advanced', category: 'Graphic Design', price: '$28', rating: 4.2, students: 7830, image: 'https://via.placeholder.com/150' },
  { id: 4, title: 'Graphic Advertisement', category: 'Graphic Design', price: '$42', rating: 4.5, students: 9123, image: 'https://via.placeholder.com/150' },
  { id: 5, title: 'Graphic Design Advanced', category: 'Graphic Design', price: '$28', rating: 4.2, students: 7830, image: 'https://via.placeholder.com/150' },
  { id: 6, title: 'Graphic Advertisement', category: 'Graphic Design', price: '$42', rating: 4.5, students: 9123, image: 'https://via.placeholder.com/150' },
];

const mentors = [
  { id: 1, name: 'Sonja', image: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Jensen', image: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Sonja', image: 'https://via.placeholder.com/50' },
  { id: 4, name: 'Jensen', image: 'https://via.placeholder.com/50' },
  { id: 5, name: 'Sonja', image: 'https://via.placeholder.com/50' },
  { id: 6, name: 'Jensen', image: 'https://via.placeholder.com/50' },
  { id: 7, name: 'Sonja', image: 'https://via.placeholder.com/50' },
  { id: 8, name: 'Jensen', image: 'https://via.placeholder.com/50' },

];

export const HomeScreen:FC<ScreenProps<'HomeScreen'>> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hi, Ronald A. Martin</Text>
          <Text style={styles.subGreeting}>What would you like to learn today? Search below.</Text>
        </View>

        <View style={styles.searchContainer}>
          <Text style={styles.searchPlaceholder}>Search for...</Text>
          <Button icon="magnify" mode="contained" onPress={() => {}}>
            Search
          </Button>
        </View>

        <Card style={styles.specialOffer}>
          <Card.Content>
            <Title>25% OFF*</Title>
            <Paragraph>Get a Discount for Every Course Order only Valid for Today!</Paragraph>
          </Card.Content>
        </Card>

        <View style={styles.categories}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity onPress={() => navigation.navigate('All Categories')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.courseList}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {courses.map((course) => (
              <Card key={course.id} style={styles.courseCard}>
                <Card.Cover source={{ uri: course.image }} />
                <Card.Content>
                  <Title>{course.title}</Title>
                  <Paragraph>{course.category}</Paragraph>
                  <Paragraph>{course.price}</Paragraph>
                  <Paragraph>
                    {course.rating} ⭐ | {course.students} students
                  </Paragraph>
                </Card.Content>
                <Button mode="contained" onPress={() => navigation.navigate('Inbox')}>
                  Go to details
                </Button>
              </Card>
            ))}
          </ScrollView>
        </View>

        <View style={styles.mentors}>
          <Text style={styles.sectionTitle}>Top Mentor</Text>
        </View>

        <View style={styles.mentorList}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mentors.map((mentor) => (
              <Avatar.Image key={mentor.id} size={50} source={{ uri: mentor.image }} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#F5F9FF",
  },
  scrollContainer: {
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  header: {
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subGreeting: {
    fontSize: 16,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#aaa',
  },
  specialOffer: {
    marginBottom: 16,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#007BFF',
  },
  courseList: {
    marginBottom: 16,
  },
  courseCard: {
    width: 200,
    marginRight: 16,
  },
  mentors: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mentorList: {
    flexDirection: 'row',
  },
});

