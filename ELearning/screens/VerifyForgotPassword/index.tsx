import React, { useState, useEffect, useRef, FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ScreenProps } from '../../types';
import { CustomButton } from '../../components';
// @ts-ignore
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';

export const VerifyForgotPassword: FC<ScreenProps<'VerifyForgotPassword'>> = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const [maskedCode, setMaskedCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(59);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const codeInputs = useRef<TextInput[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev > 0) return prev - 1;
        setIsResendDisabled(false);
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleCodeChange = (index: number, value: string) => {
    if (!isNaN(Number(value)) && value.length === 1) {
      let newCode = [...code];
      let newMaskedCode = [...maskedCode];
      newCode[index] = value;
      newMaskedCode[index] = '*';
      setCode(newCode);
      setMaskedCode(newMaskedCode);

      // Focus on the next input field
      if (index < codeInputs.current.length - 1) {
        codeInputs.current[index + 1].focus();
      }
    }
  };

  const handleVerify = () => {
    if (code.some(digit => digit === '')) {
      Alert.alert('Validation Error', 'Please fill all the code boxes.');
      return;
    }
    Alert.alert('Verify', 'Code verified successfully');
    navigation.navigate('CreateNewPassword');
  };

  const handleResend = () => {
    setTimer(59);
    setIsResendDisabled(true);
    setCode(['', '', '', '']);
    setMaskedCode(['', '', '', '']);
    // Focus on the first input field
    if (codeInputs.current.length > 0) {
      codeInputs.current[0].focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>Code has been sent to (+216) **-***-529</Text>
      <View style={styles.codeInputContainer}>
        {maskedCode.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => codeInputs.current[index] = ref as TextInput}
            style={styles.codeInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleCodeChange(index, value)}
          />
        ))}
      </View>
      <Text
        style={[styles.resendText, isResendDisabled && { color: 'gray' }]}
        onPress={!isResendDisabled ? handleResend : undefined}
      >
        Resend Code in {timer}s
      </Text>
      <CustomButton
        pressEvent={handleVerify}
        icon={<ArrowLeftBlueColor />}
        text="Verify"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
    marginTop: '50%'
  },
  instructionText: {
    marginVertical: 16,
    textAlign: 'center',
    color: "#545454",
    marginBottom: '15%'
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,

  },
  codeInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    backgroundColor: '#FFF'
  },
  resendText: {
    textAlign: 'center',
    color: '#007BFF',
    marginBottom: 50,
  },

});
