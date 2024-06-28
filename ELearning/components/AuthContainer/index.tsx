import React, {FC} from 'react';
import {View, Text, Center, Button} from '@gluestack-ui/themed';
// @ts-ignore
import Logo from '../../assets/svg/logo.svg';
import {AuthContainerProps} from '../../types';
import {RoundedLogoContainer} from '../RoundedLogoContainer';
// @ts-ignore
import GoogleLogo from '../../assets/svg/google.svg';
// @ts-ignore
import AppelLogo from '../../assets/svg/apple.svg';

export const AuthContainer: FC<AuthContainerProps> = ({
  subTitle,
  title,
  footer,
  children,
}) => {
  return (
    <View flex={1} flexDirection="column" gap={2} mx={'$5'}>
      <Center mt={'$1/6'}>
        <Logo />
      </Center>
      <View my={'$5'}>
        <Text fontWeight={'$semibold'} fontSize={'$2xl'} color="$black">
          {title}
        </Text>
        <Text fontSize={'$sm'} color="$textDark700">
          {subTitle}
        </Text>
      </View>
      {children}
      <Center flex={1} flexDirection="column" gap={'$3'}>
        <Text>Or Continue With</Text>
        <View flexDirection="row">
          <Button
            bgColor='bgColor="rgba(255, 255, 255, 0)"'
            justifyContent="center"
            mb={24}>
            <RoundedLogoContainer>
              <GoogleLogo />
            </RoundedLogoContainer>
          </Button>
          <Button
            bgColor='bgColor="rgba(255, 255, 255, 0)"'
            justifyContent="center"
            mb={24}>
            <RoundedLogoContainer>
              <AppelLogo />
            </RoundedLogoContainer>
          </Button>
        </View>
        {footer}
      </Center>
    </View>
  );
};
