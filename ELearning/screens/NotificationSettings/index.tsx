import React, { useState,FC } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { ScreenProps } from '../../types';

export const NotificationSettings : FC<ScreenProps<'NotificationSettings'>> = ({navigation}) => {
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

  const toggleSwitch = (key:any) => {
    //@ts-ignore
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <View style={styles.container}>
      {Object.keys(settings).map((key) => (
        <View key={key} style={styles.settingRow}>
          <Text style={styles.settingText}>{getSettingLabel(key)}</Text>
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

const getSettingLabel = (key:String) => {
  switch (key) {
    case 'specialOffers':
      return 'Special Offers';
    case 'sound':
      return 'Sound';
    case 'vibrate':
      return 'Vibrate';
    case 'generalNotification':
      return 'General Notification';
    case 'promoDiscount':
      return 'Promo & Discount';
    case 'paymentOptions':
      return 'Payment Options';
    case 'appUpdate':
      return 'App Update';
    case 'newService':
      return 'New Service Available';
    case 'newTips':
      return 'New Tips Available';
    default:
      return '';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
    marginVertical: 15,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  settingText: {
    fontSize: 18,
    color:'#202244'
  },
});

