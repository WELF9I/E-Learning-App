import React, { FC, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { ScreenProps } from '../../types';
import { useTheme } from '../../utils/ThemeContext';
const generateUniqueId = require('generate-unique-id');

const transactionsData = [
  {
    id: '1',
    transactionId: generateUniqueId({ length: 11, useLetters: false }),
    Name: 'Flouleni Ben Flen',
    Email: 'Fouleni@gmail.com',
    Course: 'About Design',
    title: 'Build Personal Branding',
    category: 'Web Designer',
    price: 55.00,
    Date: '20/03/2023 15:45',
    status: 'Paid',
  },
  {
    id: '2',
    transactionId: generateUniqueId({ length: 11, useLetters: false }),
    Name: 'Flouleni Ben Flen',
    Email: 'Fouleni@gmail.com',
    Course: 'About Design',
    title: 'Mastering Blender 3D',
    category: 'UI/UX Designer',
    price: 55.00,
    Date: '20/03/2023 15:45',
    status: 'Paid',
  },
  {
    id: '3',
    transactionId: generateUniqueId({ length: 11, useLetters: false }),
    Name: 'Flouleni Ben Flen',
    Email: 'Fouleni@gmail.com',
    Course: 'About Web',
    title: 'Full Stack Web Development',
    category: 'Web Development',
    price: 55.00,
    Date: '20/03/2023 15:45',
    status: 'Paid',
  },
  {
    id: '4',
    transactionId: generateUniqueId({ length: 11, useLetters: false }),
    Name: 'Flouleni Ben Flen',
    Email: 'Fouleni@gmail.com',
    Course: 'About Management',
    title: 'Complete UI Designer',
    category: 'HR Management',
    price: 55.00,
    Date: '20/03/2023 15:45',
    status: 'Paid',
  },
  {
    id: '5',
    transactionId: generateUniqueId({ length: 11, useLetters: false }),
    Name: 'Flouleni Ben Flen',
    Email: 'Fouleni@gmail.com',
    Course: 'About Finance',
    title: 'Sharing Work with Team',
    category: 'Finance & Accounting',
    price: 55.00,
    Date: '20/03/2023 15:45',
    status: 'Paid',
  },
];

export const TransactionsScreen: FC<ScreenProps<'TransactionsScreen'>> = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(transactionsData);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = transactionsData.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };
  //@ts-ignore
  const renderItem = ({ item }) => (
    //@ts-ignore
    <TouchableOpacity onPress={() => navigation.navigate('Receipt', { transaction: item })}>
      <View style={[styles.transactionCard, isDarkMode && styles.transactionCardDark]}>
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }} // Placeholder image
          style={styles.courseImage}
        />
        <View style={styles.courseDetails}>
          <Text style={[styles.courseTitle, isDarkMode && styles.courseTitleDark]}>{item.title}</Text>
          <Text style={[styles.courseCategory, isDarkMode && styles.courseCategoryDark]}>{item.category}</Text>
          <View style={styles.statusContainer}>
            <Text style={[styles.status, isDarkMode && styles.statusDark]}>{item.status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      <TextInput
        style={[styles.searchBar, isDarkMode && styles.searchBarDark]}
        placeholder="Search..."
        placeholderTextColor={isDarkMode ? '#ccc' : '#666'}
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
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
  containerDark: {
    backgroundColor: '#121212',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  searchBarDark: {
    borderColor: '#666',
    backgroundColor: '#333',
    color: '#fff',
  },
  transactionCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  transactionCardDark: {
    backgroundColor: '#263238',
    shadowColor: '#fff',
  },
  courseImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
  courseDetails: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#202244',
  },
  courseTitleDark: {
    color: '#CFD8DC',
  },
  courseCategory: {
    fontSize: 14,
    color: '#666',
  },
  courseCategoryDark: {
    color: '#CFD8DC',
  },
  statusContainer: {
    marginTop: 5,
  },
  status: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#167F71',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  statusDark: {
    backgroundColor: '#4CAF50',
  },
});
