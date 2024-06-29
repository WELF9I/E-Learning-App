import React, {FC} from 'react';
import {ScreenProps} from '../../types';
import {Button, Text, View} from '@gluestack-ui/themed';
// @ts-ignore
import GoogleLogo from '../../assets/svg/google.svg';
// @ts-ignore
import AppelLogo from '../../assets/svg/apple.svg';
// @ts-ignore
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';
import {RoundedLogoContainer} from '../../components';
import {CustomButton} from '../../components/CustomButton';

export const LoginMethod: FC<ScreenProps<'LoginMethod'>> = ({navigation}) => {
  return (
    <View
      flex={1}
      flexDirection="column"
      justifyContent="flex-end"
      mb={32}
      mx={18}>
      <View justifyContent="center" alignItems="center">
        <Text mb={24} size="3xl" textAlign="center">
          Let’s you in
        </Text>
        <Button
          bgColor='bgColor="rgba(255, 255, 255, 0)"'
          justifyContent="center"
          mb={24}>
          <RoundedLogoContainer>
            <GoogleLogo />
          </RoundedLogoContainer>
          <Text ml={16}>Continue with Google</Text>
        </Button>
        <Button
          bgColor='bgColor="rgba(255, 255, 255, 0)"'
          justifyContent="center"
          mb={24}>
          <RoundedLogoContainer>
            <AppelLogo />
          </RoundedLogoContainer>
          <Text ml={16}>Continue with Apple</Text>
        </Button>
        <Text mt={59} mb={30} textAlign="center">
          ( Or )
        </Text>
        <CustomButton
          pressEvent={() => navigation.navigate('SignIn')}
          icon={<ArrowLeftBlueColor />}
          text="Sign In with Your Account"
        />
        <View justifyContent="center" flexDirection="row" alignItems="center">
          <Text textAlign="center">Don’t have an account?</Text>
          <Button
            bgColor='bgColor="rgba(255, 255, 255, 0)'
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text
              color="$primary700"
              fontSize={'$md'}
              fontWeight={'$semibold'}
              >
              SIGN UP
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};
