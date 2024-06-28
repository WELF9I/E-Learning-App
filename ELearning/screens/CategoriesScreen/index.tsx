import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Icon3DDesign from '../../assets/categories/ICON3D-Design.svg';
import IconGraphicDesign from '../../assets/categories/ICONGraphicDesign.svg';
import IconWebDevelopment from '../../assets/categories/ICONWebDevelopment.svg';
import IconSeoMarketing from '../../assets/categories/ICONSeoMarketing.svg';
import IconFinanceAccounting from '../../assets/categories/ICONFinanceAccounting.svg';
import IconHRManagement from '../../assets/categories/ICONHRManagement.svg';
import IconPersonalDevelopment from '../../assets/categories/ICONPersonalDevelopment.svg';
import IconOfficeProductivity from '../../assets/categories/ICONOfficeProductivity.svg';
import {ScreenProps} from '../../types';
import {FC} from 'react';



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
const [searchQuery, setSearchQuery] = React.useState('');

export const CategoriesScreen: FC<ScreenProps<'CategoriesScreen'>> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        />
      </View>
      <ScrollView contentContainerStyle={styles.categoriesContainer} showsVerticalScrollIndicator={false}>
        {categories.map(category => (
          <View key={category.id} style={styles.categoryItem}>
            <Image source={category.icon} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    fontSize: 16,
    color: '#007BFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 10,
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
    backgroundColor: '#FFF',
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
  },
});


