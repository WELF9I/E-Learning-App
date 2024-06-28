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
  Icon,
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
import {Link} from '@react-navigation/native';
import {CustomButton} from '../../components';
export const SignIn: FC<ScreenProps<'SignIn'>> = ({navigation}) => {
  return (
    <AuthContainer
      title="Let’s Sign In.!"
      subTitle="Login to Your Account to Continue your Courses"
      footer={
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
              ml={'$0.5'}>
              Sign Up
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
              <Icon as={MailIcon} />
            </InputIcon>
          </InputSlot>
          <InputField placeholder="Email" type="text" ml={'$4'} />
        </Input>
        <Input alignItems="center" bgColor="$white" h={'$12'} rounded={'$2xl'}>
          <InputSlot ml={'$2'}>
            <InputIcon>
              <Icon as={LockIcon} />
            </InputIcon>
          </InputSlot>
          <InputField placeholder="Password" type="password" ml={'$4'} />
        </Input>
        <View flexDirection="row" justifyContent="space-between">
          <Checkbox value="agree">
            <CheckboxIndicator mr={'$2'} rounded={'$full'}>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>Remember Me</CheckboxLabel>
          </Checkbox>
          <Link to="/ForgotPassword">
            <Text textAlign="right" color="$primary700">
              Forgot Password?
            </Text>
          </Link>
        </View>
        <CustomButton
          pressEvent={() => navigation.navigate('SignUp')}
          icon={<ArrowLeftBlueColor />}
          text="Sign In"
        />
      </View>
    </AuthContainer>
  );
};
