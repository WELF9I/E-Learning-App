import React, { FC } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ScreenProps } from '../../types';
//@ts-ignore
import CousesIcon from '../../assets/svg/Courses.svg';
//@ts-ignore
import HomeIcon from '../../assets/svg/Home.svg';
//@ts-ignore
import ProfileIcon from '../../assets/svg/Profile.svg';
//@ts-ignore
import PaymentIcon from '../../assets/svg/Payment.svg';
//@ts-ignore
import HomeLightIcon from '../../assets/svg/HomeLight.svg';
//@ts-ignore
import ProfileLightIcon from '../../assets/svg/ProfileLight.svg';
//@ts-ignore
import PaymentLightIcon from '../../assets/svg/PaymentLight.svg';
//@ts-ignore
import CoursesLightIcon from '../../assets/svg/CoursesLight.svg';

import { useTheme } from '../../utils/ThemeContext';

export const Footer: FC<ScreenProps<'Footer'>> = ({ navigation }) => {
  const { isDarkMode } = useTheme();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: isDarkMode ? '#484848' : 'white', paddingVertical: 10}}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        {isDarkMode?<HomeLightIcon/>:<HomeIcon/>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyCourses')}>
        {isDarkMode?<CoursesLightIcon/>:<CousesIcon />}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TransactionsScreen')}>
        {isDarkMode?<PaymentLightIcon />:<PaymentIcon/>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        {isDarkMode?<ProfileLightIcon />:<ProfileIcon/>}
      </TouchableOpacity>
    </View>
  );
};
