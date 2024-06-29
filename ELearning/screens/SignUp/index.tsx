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
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
// @ts-ignore
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';

// Define validation schema
const schema = z.object({
  email: z.string().email({message: 'Invalid email address'}),
  password: z.string().min(6, {message: 'Password must be at least 6 characters long'}),
  agree: z.boolean().refine(value => value === true, {message: 'You must agree to the terms and conditions'}),
});

export const SignUp: FC<ScreenProps<'SignUp'>> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle sign-up logic here
    navigation.navigate('FillProfile');
  };

  const getErrorMessage = (error: any) => {
    if (error) {
      return error.message;
    }
    return '';
  };

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
                    <MailIcon />
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
                    <LockIcon />
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

        <FormControl>
          <Controller
            control={control}
            name="agree"
            render={({field: {onChange, value}}) => (
              <Checkbox
                value={value ? "true" : "false"}
                onChange={onChange}>
                <CheckboxIndicator mr={'$2'} rounded={'$full'}>
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel>Agree to Terms & Conditions</CheckboxLabel>
              </Checkbox>
            )}
          />
          {errors.agree && (
            <Text style={{color: 'red'}}>{getErrorMessage(errors.agree)}</Text>
          )}
        </FormControl>

        <Button
          mb={30}
          h={'$16'}
          rounded={'$full'}
          flexDirection="row"
          justifyContent="space-between"
          onPress={handleSubmit(onSubmit)}>
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
