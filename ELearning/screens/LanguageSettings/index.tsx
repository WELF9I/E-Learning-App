import React, { useState, FC } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenProps } from '../../types';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckIcon } from '@gluestack-ui/themed';
import { useTheme } from '../../utils/ThemeContext';

export const LanguageSettings: FC<ScreenProps<'LanguageSettings'>> = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { isDarkMode, toggleDarkMode } = useTheme();

  const languages = [
    { code: 'en', label: 'English (US)', subCategory: true },
    { code: 'fr', label: 'French', subCategory: true },
    { code: 'ar', label: 'Arabic' },
  ];

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);
  };

  return (
    <View style={[styles.container,{ backgroundColor: isDarkMode ? '#333' : '#fff' }]}>

      <Text style={[styles.subCategory,{color:isDarkMode?'#FFF':'#202244'}]}>SubCategories:</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {languages.filter(lang => lang.subCategory).map(lang => (
          <View key={lang.code} style={[styles.languageRow,{backgroundColor:isDarkMode?'#D0D0D0':'#FFF'}]}>
            <Text style={styles.languageLabel}>{lang.label}</Text>
            <Checkbox
              value={lang.label}
              isChecked={selectedLanguage === lang.code}
              onChange={() => handleLanguageChange(lang.code)}
              
            >
            <CheckboxIndicator mr="$2">
                <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            </Checkbox>
          </View>
        ))}

        <Text style={[styles.subCategory,{color:isDarkMode?'#FFF':'#202244'}]}>All Languages:</Text>
        {languages.map(lang => (
          <View key={lang.code} style={[styles.languageRow,{backgroundColor:isDarkMode?'#D0D0D0':'#FFF'}]}>
            <Text style={styles.languageLabel}>{lang.label}</Text>
            <Checkbox
              value={lang.label}
              isChecked={selectedLanguage === lang.code}
              onChange={() => handleLanguageChange(lang.code)}
            >
                <CheckboxIndicator mr="$2">
                    <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
            </Checkbox>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F8FA',
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
  },
  languageLabel: {
    fontSize: 16,
  },
});

export default LanguageSettings;
