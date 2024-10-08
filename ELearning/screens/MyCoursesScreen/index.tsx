{/* TODO REST */}

import React, { useState, FC } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { ScreenProps } from '../../types';

const coursesData = [
  {
    id: '1',
    category: 'Graphic Design',
    title: 'Graphic Design Advanced',
    price: 28,
    originalPrice: 42,
    rating: 4.2,
    students: 7830,
  },
  {
    id: '2',
    category: 'Graphic Design',
    title: 'Advertisement Design',
    price: 42,
    originalPrice: 61,
    rating: 3.9,
    students: 12680,
  },
  {
    id: '3',
    category: 'Programming',
    title: 'Graphic Design Advanced',
    price: 37,
    originalPrice: 41,
    rating: 4.2,
    students: 990,
  },
  {
    id: '4',
    category: 'Web Development',
    title: 'Web Developer Concepts',
    price: 56,
    originalPrice: 71,
    rating: 4.9,
    students: 14580,
  },
  {
    id: '5',
    category: 'SEO & Marketing',
    title: 'Digital Marketing Core',
    price: 28,
    originalPrice: 42,
    rating: 4.8,
    students: 8560,
  },
];

const categories = ['All', 'Graphic Design', '3D Design', 'Arts & Crafts', 'Programming', 'Web Development', 'SEO & Marketing'];

export const TopCoursesScreen: FC<ScreenProps<'TopCoursesScreen'>> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  const filteredCourses = selectedCategory === 'All'
    ? coursesData
    : coursesData.filter(course => course.category === selectedCategory);

  const renderItem = ({ item }: { item: typeof coursesData[0] }) => (
    <View style={styles.courseCard}>
      <Text style={styles.courseCategory}>{item.category}</Text>
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.coursePrice}>${item.price} <Text style={styles.originalPrice}>${item.originalPrice}</Text></Text>
      <View style={styles.courseFooter}>
        <Text style={styles.courseRating}>⭐ {item.rating}</Text>
        <Text style={styles.courseStudents}>{item.students} Std</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          {favorites[item.id] ? (
            <Svg height="24" width="24" viewBox="0 0 24 24" fill="green">
              <Path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </Svg>
          ) : (
            <Svg height="24" width="24" viewBox="0 0 24 24" fill="grey">
              <Path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </Svg>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.categories}>
        {categories.map(category => (
          <TouchableOpacity key={category} onPress={() => setSelectedCategory(category)}>
            <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredCourses}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  categories: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryText: {
    marginRight: 15,
    padding: 5,
    color: '#000',
  },
  selectedCategoryText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  courseCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  courseCategory: {
    color: 'orange',
    marginBottom: 5,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  coursePrice: {
    fontSize: 14,
    color: '#000',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  courseRating: {
    fontSize: 12,
    color: '#666',
  },
  courseStudents: {
    fontSize: 12,
    color: '#666',
  },
});
