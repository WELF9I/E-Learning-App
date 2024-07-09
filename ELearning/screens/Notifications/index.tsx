import React, { FC } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { ScreenProps } from '../../types';
import { useTheme } from '../../utils/ThemeContext';
// @ts-ignore
import CategoryCircle from '../../assets/categories/CategoryCircle.png';
// @ts-ignore
import ProfileCircle from '../../assets/categories/ProfileCircle.png';
// @ts-ignore
import TicketCircle from '../../assets/categories/TicketCircle.png';
// @ts-ignore
import WalletCircle from '../../assets/categories/WalletCircle.png';
// @ts-ignore
import BlueWalletCircle from '../../assets/categories/BlueWalletCircle.png';

const notifications = [
  {
    date: 'Today',
    items: [
      { icon: CategoryCircle, title: 'New Category Course.!', description: 'New the 3D Design Course is Available.' },
      { icon: BlueWalletCircle, title: 'New Category Course.!', description: 'New the 3D Design Course is Available.' },
      { icon: TicketCircle, title: "Today's Special Offers", description: 'You have made a Course Payment.' }
    ]
  },
  {
    date: 'Yesterday',
    items: [
      { icon: WalletCircle, title: 'Credit Card Connected.!', description: 'Credit Card has been Linked.!' }
    ]
  },
  {
    date: 'Nov 20, 2022',
    items: [
      { icon: ProfileCircle, title: 'Account Setup Successful.!', description: 'Your Account has been Created.' }
    ]
  }
];

export const Notifications: FC<ScreenProps<'Notifications'>> = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);

  return (
    <ScrollView style={styles.container}>
      {notifications.map((section, index) => (
        <View key={index}>
          <Text style={styles.dateText}>{section.date}</Text>
          {section.items.map((item, idx) => (
            <Card key={idx} style={styles.card}>
              <View style={styles.cardContent}>
                <Image source={item.icon} style={styles.icon} />
                <View style={styles.textContent}>
                  <Title style={styles.title}>{item.title}</Title>
                  <Paragraph style={styles.description}>{item.description}</Paragraph>
                </View>
              </View>
            </Card>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#333' : '#f0f4f7',
      padding: 10,
    },
    dateText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginVertical: 10,
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    card: {
      marginVertical: 5,
      padding: 10,
      backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
      borderRadius: 10,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      width: 45,
      height: 45,
      marginRight: 10,
    },
    textContent: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    description: {
      fontSize: 14,
      color: isDarkMode ? '#bbbbbb' : '#666666',
    },
  });
