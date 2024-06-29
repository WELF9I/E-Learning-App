import React, {FC, useState} from 'react';
import {ScreenProps} from '../../types';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Svg, { Path } from 'react-native-svg';
import { CustomButton } from '../../components';
// @ts-ignore
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';
// @ts-ignore
import Mail from '../../assets/svg/mail.svg';
// @ts-ignore
import Sms from '../../assets/svg/sms.svg';

export const ForgotPassword: FC<ScreenProps<'ForgotPassword'>> = ({navigation}) => {
  const [selectedMethod, setSelectedMethod] = useState('email');

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>
        Select which contact details should we use to reset your password
      </Text>
      <TouchableOpacity 
        style={styles.optionContainer} 
        onPress={() => setSelectedMethod('email')}
      >
        <Mail/>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionTitle}>Via Email</Text>
          <Text style={styles.optionSubtitle}>priscilla.frank26@gmail.com</Text>
        </View>
        <RadioButton
          value="email"
          status={selectedMethod === 'email' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedMethod('email')}
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.optionContainer} 
        onPress={() => setSelectedMethod('sms')}
      >
        <Sms/>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionTitle}>Via SMS</Text>
          <Text style={styles.optionSubtitle}>(+1) 480-894-5529</Text>
        </View>
        <RadioButton
          value="sms"
          status={selectedMethod === 'sms' ? 'checked' : 'unchecked'}
          onPress={() => setSelectedMethod('sms')}
        />
      </TouchableOpacity>
      
      <CustomButton
        pressEvent={() => navigation.navigate('VerifyForgotPassword')}
        icon={<ArrowLeftBlueColor />}
        text="Continue"
      />  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  instructionText: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#6e6e6e',
    marginTop: '85%',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#505050',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#6e6e6e',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  continueButtonText: {
    color: '#fff',
    marginRight: 10,
    fontSize: 16,
  },
});
