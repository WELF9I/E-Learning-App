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
//@ts-ignore
import QuizzIcon from '../../assets/categories/quizz.png';
//@ts-ignore
import QuizzLightIcon from '../../assets/categories/quizzWhite.png';

import { useTheme } from '../../utils/ThemeContext';

interface User {
  Nom_utl: string;
  pass: string;
  Role: string;
  education: string;
  prénom: string;
  Img: string;
  E_mail: string;
  Num: string;
}

const student: User[] = [
  {
    Nom_utl: 'A. Martin',
    pass: 'password123',
    Role: 'Student',
    education: '3D Design Illustration',
    prénom: 'Ronald',
    Img: 'https://cdn-icons-png.flaticon.com/128/16683/16683419.png',
    E_mail: 'ronald.martin@example.com',
    Num: '29051481' 
  }
];

export const Footer: FC<ScreenProps<'Footer'>> = ({ navigation }) => {
  const { isDarkMode } = useTheme();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: isDarkMode ? '#484848' : 'white', paddingVertical: 10}}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        {isDarkMode ? <HomeLightIcon/> : <HomeIcon/>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyCourses')}>
        {isDarkMode ? <CoursesLightIcon/> : <CousesIcon />}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Quizz')}>
        {isDarkMode ? <QuizzLightIcon/> : <QuizzIcon />}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TransactionsScreen')}>
        {isDarkMode ? <PaymentLightIcon /> : <PaymentIcon/>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile',{ student })}>
        {isDarkMode ? <ProfileLightIcon /> : <ProfileIcon/>}
      </TouchableOpacity>
    </View>
  );
};
