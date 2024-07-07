import React, { useState, FC } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ScreenProps } from '../../types';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CustomButton, EventModal } from '../../components';
// @ts-ignore
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';
// @ts-ignore
import Password from '../../assets/svg/password.svg';
// @ts-ignore
import EyeShow from '../../assets/svg/EyeShow.svg';
// @ts-ignore
import EyeHide from '../../assets/svg/EyeHide.svg';
// @ts-ignore
import KeyPassCong from '../../assets/svg/KeyPassCong.svg';
import { Heading, VStack, Text } from '@gluestack-ui/themed';

// Define the validation schema
const schema = z.object({
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  confirmPassword: z.string().min(8, { message: 'Confirm Password must be at least 8 characters long' })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'], // set path of error to confirmPassword field
});

export const CreateNewPassword: FC<ScreenProps<'CreateNewPassword'>> = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = (data: any) => {
    console.log(data);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>Create Your New Password</Text>
      <View style={styles.inputContainer}>
        <Password />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              secureTextEntry={!showPassword}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <TouchableOpacity onPress={toggleShowPassword}>
          {showPassword ? <EyeHide /> : <EyeShow />}
        </TouchableOpacity>
      </View>
      
      {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
      
      <View style={styles.inputContainer}>
        <Password />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <TouchableOpacity onPress={toggleShowConfirmPassword}>
          {showConfirmPassword ? <EyeHide /> : <EyeShow />}
        </TouchableOpacity>
      </View>
      {errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword.message}</Text>}
      
      <CustomButton
        pressEvent={handleSubmit(onSubmit)}
        icon={<ArrowLeftBlueColor />}
        text="Continue"
      />
      
      <EventModal
        icon={<KeyPassCong />}
        isVisible={modalVisible}
        redirectFunction={() => {
          setModalVisible(false);
          // navigation.navigate('Home');
        }}>
        <VStack
          space="md"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={'$6'}>
          <Heading>Congratulations</Heading>
          <Text textAlign="center" mx={'$16'}>
            Your Account is Ready to Use. You will be redirected to the Home
            Page in a Few Seconds.
          </Text>
        </VStack>
      </EventModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  instructionText: {
    fontSize: 16,
    color: '#202244',
    marginBottom: 16,
    fontWeight: 'bold',
    marginTop: '60%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  icon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
});
