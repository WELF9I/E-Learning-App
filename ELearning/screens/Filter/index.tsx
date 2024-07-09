import React, { FC, useState, useEffect } from 'react';
import { ScreenProps } from '../../types';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomButton } from '../../components';
import { useTheme } from '../../utils/ThemeContext';
//@ts-ignore
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';

const categories = [
  'Graphic Design',
  '3D Design',
  'Web Development',
  'SEO & Marketing',
  'Finance & Accounting',
  'Personal Development',
  'Office Productivity',
  'HR Management'
];

const prices = ['Paid', 'Free'];

const ratings = ['4.5 & Up Above', '4.0 & Up Above', '3.5 & Up Above', '3.0 & Up Above'];

export const Filter: FC<ScreenProps<'Filter'>> = ({ navigation, route }) => {
  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const loadCheckedItems = async () => {
      try {
        const savedCheckedItems = await AsyncStorage.getItem('checkedItems');
        if (savedCheckedItems !== null) {
          setCheckedItems(JSON.parse(savedCheckedItems));
        }
      } catch (error) {
        console.error('Failed to load checked items:', error);
      }
    };

    loadCheckedItems();
  }, []);

  const toggleCheckbox = (item: string) => {
    const updatedCheckedItems = {
      ...checkedItems,
      [item]: !checkedItems[item],
    };
    setCheckedItems(updatedCheckedItems);

    AsyncStorage.setItem('checkedItems', JSON.stringify(updatedCheckedItems))
      .catch((error) => {
        console.error('Failed to save checked items:', error);
      });
  };

  const clearAll = () => {
    const clearedCheckedItems = {};
    setCheckedItems(clearedCheckedItems);

    AsyncStorage.setItem('checkedItems', JSON.stringify(clearedCheckedItems))
      .catch((error) => {
        console.error('Failed to clear checked items:', error);
      });
  };

  const applyFilters = () => {
    //@ts-ignore
    navigation.navigate('HomeScreen', { filters: checkedItems });
  };

  const renderCheckboxGroup = (title: string, items: string[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item) => (
        <TouchableOpacity key={item} style={styles.checkboxContainer} onPress={() => toggleCheckbox(item)}>
          <CheckBox value={!!checkedItems[item]} onValueChange={() => toggleCheckbox(item)} />
          <Text style={styles.label}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={clearAll}>
        <Text style={styles.clearText}>Clear</Text>
      </TouchableOpacity>
      {renderCheckboxGroup('SubCategories:', categories)}
      {renderCheckboxGroup('Price:', prices)}
      {renderCheckboxGroup('Rating:', ratings)}
      <CustomButton
          pressEvent={applyFilters}
          icon={<ArrowLeftBlueColor />}
          text="Apply Filters"
        />
    </ScrollView>
  );
};

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: isDarkMode ? '#333' : '#f0f4f7',
    },
    section: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    label: {
      marginLeft: 8,
      fontSize: 16,
      color: isDarkMode ? '#bbbbbb' : '#000000',
    },
    clearText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#5DA3FA' : '#167F71',
      marginBottom: 16,
      textAlign: 'right',
    },
  });
