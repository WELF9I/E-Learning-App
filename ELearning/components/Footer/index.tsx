import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';

interface FooterProps {
  navigationState: any;
  setNavigationState: (state: any) => void;
}

const HomeRoute = () => <View />;
const CoursesRoute = () => <View />;
const InboxRoute = () => <View />;
const TransactionsRoute = () => <View />;
const ProfileRoute = () => <View />;

export const Footer: React.FC<FooterProps> = ({ navigationState, setNavigationState }) => {
  return (
    <BottomNavigation
      navigationState={navigationState}
      onIndexChange={(index) => setNavigationState({ ...navigationState, index })}
      renderScene={BottomNavigation.SceneMap({
        home: HomeRoute,
        courses: CoursesRoute,
        inbox: InboxRoute,
        transactions: TransactionsRoute,
        profile: ProfileRoute,
      })}
      style={styles.footer}
    />
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});


