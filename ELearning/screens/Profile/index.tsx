import React, { useState, FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
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
import TraductionIcon from '../../assets/svg/Traduction.svg';
//@ts-ignore
import ArrowRight from '../../assets/svg/arrowRight.svg';
//@ts-ignore
import LogoutIcon from '../../assets/svg/LogOut.svg';
//@ts-ignore
import ArrowRightLight from '../../assets/svg/arrowRightLight.svg'; 
//@ts-ignore
import EditProfileLight from '../../assets/svg/Edit-profile-light.svg';
//@ts-ignore
import TermsLight from '../../assets/svg/TermsLight.svg';
//@ts-ignore
import LogoutLight from '../../assets/svg/Logout-light.svg';
//@ts-ignore
import DarkModeSwitcher from '../../assets/svg/Switch-mode-light.svg';
//@ts-ignore
import LanguageLight from '../../assets/svg/Language-option.svg';
//@ts-ignore
import SecurityLight from '../../assets/svg/Security-option.svg';
//@ts-ignore
import NotificationLight from '../../assets/svg/Notification-option-light.svg';
//@ts-ignore
import PaymentLight from '../../assets/svg/Payment-option-light.svg';
//@ts-ignore
import BookMark from '../../assets/svg/open-book.svg';

import { Avatar, AvatarFallbackText, Center, Image } from '@gluestack-ui/themed';
import { Footer } from '../Footer'; 
import { useTheme } from '../../utils/ThemeContext';
import { ScreenProps } from '../../types';
import { useTranslation } from 'react-i18next';

export const Profile: FC<ScreenProps<'Profile'>> = ({ navigation }) => {
  const { t } = useTranslation();
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [userName,setUserName]=useState('Ronald A. Martin');
  const [userEmail,setUserEmail]=useState('RonaldMartin@gmail.ac.in');
  const { isDarkMode, toggleDarkMode } = useTheme();

  const getIcon = (name: string) => {
    switch (name) {
      case t('EditProfile'):
        return isDarkMode ? <EditProfileLight /> : <EditProfileIcon />;
      case t('BookMark'):
        return isDarkMode?<BookMark fill="#FFF"/>:<BookMark/>;
      case t('PaymentOption'):
        return isDarkMode ? <PaymentLight /> : <PaymentIcon />;
      case t('Notifications'):
        return isDarkMode ? <NotificationLight /> : <NotificationIcon />;
      case t('Security'):
        return isDarkMode ? <SecurityLight /> : <SecurityIcon />;
      case t('Language'):
        return isDarkMode ? <LanguageLight /> : <TraductionIcon />;
      case t('DarkMode'):
      case t('LightMode'):
        return isDarkMode ? <DarkModeSwitcher /> : <DarkModeIcon />;
      case t('TermsConditions'):
        return isDarkMode ? <TermsLight /> : <TermsIcon />;
      case t('Logout'):
        return isDarkMode ? <LogoutLight /> : <LogoutIcon />;
      default:
        return null;
    }
  };

  const menuItems = [
    { title: t('EditProfile'), onPress: () => navigation.navigate('EditStudentProfile') },
    { title: t('BookMark'), onPress: () => navigation.navigate('MyBookmark') },
    { title: t('PaymentOption'), onPress: () => navigation.navigate('PaymentOption') },
    { title: t('Notifications'), onPress: () => navigation.navigate('NotificationSettings') },
    { title: t('Security'), onPress: () => navigation.navigate('SecurityOption') },
    { title: t('Language'), onPress: () => navigation.navigate('LanguageSettings') },
    //@ts-ignore
    { title: isDarkMode ? t('DarkMode') : t('LightMode'), onPress: () => toggleDarkMode() },
    { title: t('TermsConditions'), onPress: () => navigation.navigate('Terms') },
    { title: t('Logout'), onPress: () => navigation.navigate('SignIn') },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#F7F8FA' }]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <Center>
          <Avatar size="xl" borderRadius={'$full'}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={{ width: '100%', height: '100%', borderRadius: 100 }} />
            ) : (
              <AvatarFallbackText>{userName.charAt(0)}</AvatarFallbackText>
            )}
          </Avatar>
        </Center>
        <Text style={[styles.name, { color: isDarkMode ? '#fff' : '#202244' }]}>{userName}</Text>
        <Text style={[styles.email, { color: isDarkMode ? '#ccc' : '#545454' }]}>{userEmail}</Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
            <View style={styles.menuItemContent}>
              {getIcon(item.title)}
              <Text style={[styles.menuText, { color: isDarkMode ? '#fff' : '#202244' }]}>{item.title}</Text>
            </View>
            {isDarkMode ? <ArrowRightLight /> : <ArrowRight />}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    marginTop: 10,
  },
  email: {
    fontSize: 14,
    marginBottom: 50,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});
