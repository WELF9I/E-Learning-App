import React from 'react'
import { Text } from 'react-native'
import {ScreenProps} from '../../types';
import {FC} from 'react';

export const InboxScreen: FC<ScreenProps<'InboxScreen'>> = ({navigation}) =>{
  return (
    <Text>Hello</Text>
  )
}
