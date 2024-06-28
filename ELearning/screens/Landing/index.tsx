import {Center} from '@gluestack-ui/themed';
import React, {FC, useEffect} from 'react';
// @ts-ignore
import LandingLogo from '../../assets/svg/landingLogo.svg';
import {ScreenProps} from '../../types';

export const Landing: FC<ScreenProps<'Landing'>> = ({
  navigation,
}): JSX.Element => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Intro');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <Center bgColor="$primary400" flex={1}>
      <LandingLogo />
    </Center>
  );
};
