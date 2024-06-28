import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {ScreenProps} from '../../types';
import {FC} from 'react';

export const MyCoursesScreen: FC<ScreenProps<'MyCoursesScreen'>> = ({navigation}) =>{
  return (
    <View style={styles.container}>
      <Text>My Courses Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


