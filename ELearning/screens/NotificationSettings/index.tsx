import React, { useState, FC } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { ScreenProps } from '../../types';
import { useTheme } from '../../utils/ThemeContext';
import { useTranslation } from 'react-i18next';

export const NotificationSettings: FC<ScreenProps<'NotificationSettings'>> = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const [settings, setSettings] = useState({
    specialOffers: true,
    sound: true,
    vibrate: false,
    generalNotification: true,
    promoDiscount: false,
    paymentOptions: false,
    appUpdate: true,
    newService: false,
    newTips: false,
  });

  const toggleSwitch = (key: string) => {
    //@ts-ignore
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#f9fafb' }]}>
      {Object.keys(settings).map((key) => (
        <View key={t(key)} style={styles.settingRow}>
          <Text style={[styles.settingText, { color: isDarkMode ? '#FFF' : '#202244' }]}>{t(key)}</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#b5d2ff' }}
            //@ts-ignore
            thumbColor={settings[key] ? '#0961F5' : '#f4f3f4'}
            onValueChange={() => toggleSwitch(key)}
            //@ts-ignore
            value={settings[key]}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
    marginVertical: 15,
    marginBottom: 0,
    marginTop: 0,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  settingText: {
    fontSize: 18,
    color: '#202244',
  },
});
