import React, { FC } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ScreenProps } from '../../types';
import { useTheme } from '../../utils/ThemeContext';
import { useTranslation } from 'react-i18next';

export const Terms: FC<ScreenProps<'Terms'>> = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFF' : '#202244' }]}>
          {t('conditionsAttending')}
        </Text>
        <Text style={[styles.sectionText, { color: isDarkMode ? '#FFF' : '#545454' }]}>
          {t('conditionsAttendingText')}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFF' : '#202244' }]}>
          {t('termsUse')}
        </Text>
        <Text style={[styles.sectionText, { color: isDarkMode ? '#FFF' : '#545454' }]}>
          {t('termsUseText')}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#202244',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#545454',
  },
});
