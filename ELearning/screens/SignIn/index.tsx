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
  FormControl,
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
import {TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
// @ts-ignore
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';
import {CustomButton} from '../../components';

// Define validation schema
const schema = z.object({
  email: z.string().email({message: 'Invalid email address'}),
  password: z.string().min(6, {message: 'Password must be at least 6 characters long'}),
});

export const SignIn: FC<ScreenProps<'SignIn'>> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle sign-in logic here
    navigation.navigate('SignUp');
  };

  const getErrorMessage = (error: any) => {
    if (error) {
      return error.message;
    }
    return '';
  };

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
        <FormControl>
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, onBlur, value}}) => (
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
                <InputField
                  placeholder="Email"
                  type="text"
                  ml={'$4'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
          />
          {errors.email && (
            <Text style={{color: 'red'}}>{getErrorMessage(errors.email)}</Text>
          )}
        </FormControl>

        <FormControl>
          <Controller
            control={control}
            name="password"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                alignItems="center"
                bgColor="$white"
                h={'$12'}
                rounded={'$2xl'}>
                <InputSlot ml={'$2'}>
                  <InputIcon>
                    <Icon as={LockIcon} />
                  </InputIcon>
                </InputSlot>
                <InputField
                  placeholder="Password"
                  type="password"
                  ml={'$4'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
          />
          {errors.password && (
            <Text style={{color: 'red'}}>{getErrorMessage(errors.password)}</Text>
          )}
        </FormControl>

        <View flexDirection="row" justifyContent="space-between">
          <Checkbox value="agree">
            <CheckboxIndicator mr={'$2'} rounded={'$full'}>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>Remember Me</CheckboxLabel>
          </Checkbox>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text textAlign="right" color="$primary700">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          pressEvent={handleSubmit(onSubmit)}
          icon={<ArrowLeftBlueColor />}
          text="Sign In"
        />
      </View>
    </AuthContainer>
  );
};
