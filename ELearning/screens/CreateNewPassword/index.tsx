import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {ScreenProps} from '../../types';
import {FC} from 'react';
import { CustomButton } from '../../components';
//@ts-ignore
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';
//@ts-ignore
import Password from '../../assets/svg/password.svg';

//@ts-ignore
import EyeShow from '../../assets/svg/EyeShow.svg';
//@ts-ignore
import EyeHide from '../../assets/svg/EyeHide.svg';

export const CreateNewPassword: FC<ScreenProps<'CreateNewPassword'>> = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>
        Create Your New Password
      </Text>
      <View style={styles.inputContainer}>
        
        <Password/>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={toggleShowPassword}>
        {showPassword ? <EyeHide/> : <EyeShow/>}
        </TouchableOpacity>
      </View>
      
      
      <View style={styles.inputContainer}>
        <Password/>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={toggleShowConfirmPassword}>
            {showConfirmPassword ? <EyeHide/> : <EyeShow/>}
        </TouchableOpacity>
      </View>
      
      <CustomButton
          pressEvent={() => navigation.navigate('CreateNewPin')}
          icon={<ArrowLeftBlueColor />}
          text="Continue"
        />
        
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
    fontWeight:'bold',
    marginTop:'60%'
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
    color:'black'
  },
});
