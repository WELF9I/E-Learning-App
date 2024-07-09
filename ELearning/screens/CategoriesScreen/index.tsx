import React, { FC, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';
//@ts-ignore
import Icon3DDesign from '../../assets/categories/ICON3D-Design.png';
//@ts-ignore
import IconGraphicDesign from '../../assets/categories/ICONGraphicDesign.png';
//@ts-ignore
import IconWebDevelopment from '../../assets/categories/ICONWebDevelopment.png';
//@ts-ignore
import IconSeoMarketing from '../../assets/categories/ICONSeoMarketing.png';
//@ts-ignore
import IconFinanceAccounting from '../../assets/categories/ICONFinanceAccounting.png';
//@ts-ignore
import IconHRManagement from '../../assets/categories/ICONHRManagement.png';
//@ts-ignore
import IconPersonalDevelopment from '../../assets/categories/ICONPersonalDevelopment.png';
//@ts-ignore
import IconOfficeProductivity from '../../assets/categories/ICONOfficeProductivity.png';
//@ts-ignore
import CustomSearchIcon from '../../assets/categories/search.png'; // Custom search icon

import { ScreenProps } from '../../types';
import { useTheme } from '../../utils/ThemeContext';

const categories = [
  { id: 1, name: '3D Design', icon: Icon3DDesign },
  { id: 2, name: 'Graphic Design', icon: IconGraphicDesign },
  { id: 3, name: 'Web Development', icon: IconWebDevelopment },
  { id: 4, name: 'SEO & Marketing', icon: IconSeoMarketing },
  { id: 5, name: 'Finance & Accounting', icon: IconFinanceAccounting },
  { id: 6, name: 'Personal Development', icon: IconPersonalDevelopment },
  { id: 7, name: 'Office Productivity', icon: IconOfficeProductivity },
  { id: 8, name: 'HR Management', icon: IconHRManagement },
];

export const CategoriesScreen: FC<ScreenProps<'CategoriesScreen'>> = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        icon={() => <Image source={CustomSearchIcon} style={styles.searchIcon} />}
        style={styles.searchbar}
      />
      <ScrollView contentContainerStyle={styles.categoriesContainer} showsVerticalScrollIndicator={false}>
        {filteredCategories.map(category => (
          <View key={category.id} style={styles.categoryItem}>
            <Image source={category.icon} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDarkMode ? '#121212' : '#F5F5F5',
    },
    searchbar: {
      backgroundColor:'#FFF',
      elevation: 15, 
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      borderRadius: 10,
      marginBottom: 35,
    },
    searchIcon: {
      width: 30,
      height: 30,
    },
    categoriesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    categoryItem: {
      width: '48%',
      padding: 20,
      marginBottom: 16,
      backgroundColor: isDarkMode ? '#333' : '#FFF',
      borderRadius: 10,
      alignItems: 'center',
    },
    categoryIcon: {
      width: 40,
      height: 40,
      marginBottom: 10,
    },
    categoryText: {
      fontSize: 16,
      marginTop: 8,
      color: isDarkMode ? '#FFF' : '#000',
    },
  });
