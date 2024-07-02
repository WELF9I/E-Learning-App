import React, { useState,FC } from 'react';
import { ScreenProps } from '../../types';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
// Import SVG icons
//@ts-ignore
import EditProfileIcon from '../../assets/svg/edit-profile-icon.svg';
//@ts-ignore
import DarkModeIcon from '../../assets/svg/dark-mode-icon.svg';
//@ts-ignore
import NotificationIcon from '../../assets/svg/notification-icon.svg';
//@ts-ignore
import SecurityIcon from '../../assets/svg/security-icon.svg';
//@ts-ignore
import TermsIcon from '../../assets/svg/terms&condition-icon.svg';
//@ts-ignore
import PaymentIcon from '../../assets/svg/payment-icon.svg';
//@ts-ignore
import TraductionIcon from '../../assets/svg/traduction-icon.svg';
//@ts-ignore
import ArrowRight from '../../assets/svg/arrowRight.svg';
import { Avatar, AvatarFallbackText, Center, Image } from '@gluestack-ui/themed';

export const Profile: FC<ScreenProps<'Profile'>> = ({ navigation }) => {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  {/* Replace with image in the DataBase */}

  const menuItems = [
    { title: 'Edit Profile', icon: <EditProfileIcon />, onPress: () => navigation.navigate('EditStudentProfile') },
    { title: 'Payment Option', icon: <PaymentIcon />, onPress: () => navigation.navigate('PaymentOption') },
    { title: 'Notifications', icon: <NotificationIcon />, onPress: () => navigation.navigate('NotificationSettings') },
    { title: 'Security', icon: <SecurityIcon />, onPress: () => navigation.navigate('SecurityOption') },
    { title: 'Language', icon: <TraductionIcon />, onPress: () => navigation.navigate('LanguageSettings') },
    { title: 'Dark Mode', icon: <DarkModeIcon />, onPress: () => navigation.navigate('LanguageSettings') },
    { title: 'Terms & Conditions', icon: <TermsIcon />, onPress: () => navigation.navigate('Terms') },
  ];

  return (
    <ScrollView style={styles.container}>
      <Center>
  
          <Avatar size="xl" borderRadius={'$full'}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={{ width: '100%', height: '100%', borderRadius: 100 }} />
            ) : (
              <AvatarFallbackText>J</AvatarFallbackText>
            )}
          </Avatar>
        </Center>
      <Text style={styles.name}>James S. Hernandez</Text>
      <Text style={styles.email}>hernandex.redial@gmail.ac.in</Text>

      {menuItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
          <View style={styles.menuItemContent}>
            {item.icon}
            <Text style={styles.menuText}>{item.title}</Text>
          </View>
          <ArrowRight width={24} height={24} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color:'#202244',
    marginTop:10
  },
  email: {
    fontSize: 14,
    color: '#545454',
    marginBottom: 50,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    fontWeight:'bold',
    color:'#202244',
    marginLeft:12
  },
});

