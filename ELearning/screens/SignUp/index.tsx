import React, {FC} from 'react';
import {ScreenProps} from '../../types';
import {AuthContainer} from '../../components';
import {
  Button,
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  LockIcon,
  MailIcon,
  Text,
  View,
} from '@gluestack-ui/themed';
// @ts-ignore
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';

export const SignUp: FC<ScreenProps<'SignUp'>> = ({navigation}) => {
  return (
    <AuthContainer
      title="Getting Started.!"
      subTitle="Create an Account to Continue your allCourses"
      footer={
        <View justifyContent="center" flexDirection="row" alignItems="center">
          <Text textAlign="center">Already have an Account?</Text>
          <Button
            bgColor='bgColor="rgba(255, 255, 255, 0)'
            onPress={() => {
              navigation.navigate('SignIn');
            }}>
            <Text
              color="$primary700"
              fontSize={'$md'}
              fontWeight={'$semibold'}
              ml={'$0.5'}>
              Sign In
            </Text>
          </Button>
        </View>
      }>
      <View gap={25}>
        <Input
          justifyContent="center"
          alignItems="center"
          bgColor="$white"
          rounded={'$2xl'}
          h={'$12'}>
          <InputSlot ml={'$2'}>
            <InputIcon>
              <MailIcon />
            </InputIcon>
          </InputSlot>
          <InputField placeholder="Email" type="text" ml={'$4'} />
        </Input>
        <Input alignItems="center" bgColor="$white" h={'$12'} rounded={'$2xl'}>
          <InputSlot ml={'$2'}>
            <InputIcon>
              <LockIcon />
            </InputIcon>
          </InputSlot>
          <InputField placeholder="Password" type="password" ml={'$4'} />
          <InputIcon />
        </Input>
        <Checkbox value="agree">
          <CheckboxIndicator mr={'$2'} rounded={'$full'}>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel>Agree to Terms & Conditions</CheckboxLabel>
        </Checkbox>
        <Button
          mb={30}
          h={'$16'}
          rounded={'$full'}
          flexDirection="row"
          justifyContent="space-between"
          onPress={() => navigation.navigate('FillProfile')}>
          <Text
            textAlign="center"
            color="$white"
            alignSelf="center"
            flex={1}
            ml={'$5'}>
            Sign Up
          </Text>
          <View
            bg="$white"
            padding={10}
            rounded={'$full'}
            w={'$1/4'}
            alignItems="center">
            <ArrowLeftBlueColor />
          </View>
        </Button>
      </View>
    </AuthContainer>
  );
};
