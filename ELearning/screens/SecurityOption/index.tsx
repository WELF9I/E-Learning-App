import React, { useState, FC } from 'react';
import { View, Text, Button, StyleSheet, Switch, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// @ts-ignore
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';
import { ScreenProps } from '../../types';
import { CustomButton } from '../../components';
import { useTheme } from '../../utils/ThemeContext';

const pinSchema = z.object({
  oldPin: z.string().min(4, 'PIN must be 4 digits').max(4, 'PIN must be 4 digits').regex(/^\d{4}$/, 'PIN must be 4 digits'),
  newPin: z.string().min(4, 'PIN must be 4 digits').max(4, 'PIN must be 4 digits').regex(/^\d{4}$/, 'PIN must be 4 digits'),
  confirmNewPin: z.string().min(4, 'PIN must be 4 digits').max(4, 'PIN must be 4 digits').regex(/^\d{4}$/, 'PIN must be 4 digits'),
}).refine((data) => data.newPin === data.confirmNewPin, {
  message: 'New PIN and Confirm PIN must match',
  path: ['confirmNewPin'],
});

const passwordSchema = z.object({
  oldPassword: z.string().min(6, 'Password must be at least 6 characters'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmNewPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'New Password and Confirm Password must match',
  path: ['confirmNewPassword'],
});

export const SecurityOption: FC<ScreenProps<'SecurityOption'>> = ({ navigation }) => {
  const [isPinModalVisible, setPinModalVisible] = useState(false);
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [biometricID, setBiometricID] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { control: controlPin, handleSubmit: handleSubmitPin, formState: { errors: errorsPin } } = useForm({
    resolver: zodResolver(pinSchema),
  });

  const { control: controlPassword, handleSubmit: handleSubmitPassword, formState: { errors: errorsPassword } } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const getErrorMessage = (error: any) => {
    if (error) {
      return error.message;
    }
    return '';
  };

  const togglePinModal = () => {
    setPinModalVisible(!isPinModalVisible);
  };

  const togglePasswordModal = () => {
    setPasswordModalVisible(!isPasswordModalVisible);
  };

  const handleChangePin = (data: any) => {
    console.log(data);
    togglePinModal();
  };

  const handleChangePassword = (data: any) => {
    console.log(data);
    togglePasswordModal();
  };

  const handleBiometricIDToggle = (value: boolean) => {
    setBiometricID(value);
    if (value) {
      console.log('Biometric ID enabled');
    } else {
      console.log('Biometric ID disabled');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#f9fafb' }]}>
      <View style={[styles.switchRow,{backgroundColor:isDarkMode?'#D0D0D0':'#FFF'}]}>
        <Text style={[styles.switchText, { color: isDarkMode ? 'black' : '#000' }]}>Remember Me</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#b5d2ff' }}
          thumbColor={rememberMe ? '#0961F5' : '#f4f3f4'}
          value={rememberMe}
          onValueChange={(value) => setRememberMe(value)}
        />
      </View>
      <View style={[styles.switchRow,{backgroundColor:isDarkMode?'#D0D0D0':'#FFF'}]}>
        <Text style={[styles.switchText, { color: isDarkMode ? 'black' : '#000' }]}>Biometric ID</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#b5d2ff' }}
          thumbColor={biometricID ? '#0961F5' : '#f4f3f4'}
          value={biometricID}
          onValueChange={(value) => handleBiometricIDToggle(value)}
        />
      </View>

      <View style={{ marginTop: '80%', marginHorizontal: 7 }}>
        <TouchableOpacity style={styles.button} onPress={togglePinModal}>
          <Text style={[styles.buttonText, { color: isDarkMode ? '#000' : 'black' }]}>Change PIN</Text>
        </TouchableOpacity>
        <CustomButton
          pressEvent={togglePasswordModal}
          icon={<ArrowLeftBlueColor />}
          text="Change Password"
        />
      </View>

      {/* PIN Modal */}
      <Modal isVisible={isPinModalVisible}>
        <View style={[styles.modalContent,{backgroundColor:isDarkMode?'#333':'white'}]}>
          <Text style={[styles.modalHeader, { color: isDarkMode ? '#fff' : '#000' }]}>Change PIN</Text>
          <Controller
            control={controlPin}
            name="oldPin"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: isDarkMode ? '#fff' : '#000' }, errorsPin.oldPin && styles.errorInput]}
                placeholder="Old PIN"
                placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                maxLength={4}
                secureTextEntry
              />
            )}
          />
          {errorsPin.oldPin && <Text style={styles.errorText}>{getErrorMessage(errorsPin.oldPin)}</Text>}

          <Controller
            control={controlPin}
            name="newPin"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: isDarkMode ? '#fff' : '#000' }, errorsPin.newPin && styles.errorInput]}
                placeholder="New PIN"
                placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                maxLength={4}
                secureTextEntry
              />
            )}
          />
          {errorsPin.newPin && <Text style={styles.errorText}>{getErrorMessage(errorsPin.newPin)}</Text>}

          <Controller
            control={controlPin}
            name="confirmNewPin"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: isDarkMode ? '#fff' : '#000' }, errorsPin.confirmNewPin && styles.errorInput]}
                placeholder="Confirm New PIN"
                placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                maxLength={4}
                secureTextEntry
              />
            )}
          />
          {errorsPin.confirmNewPin && <Text style={styles.errorText}>{getErrorMessage(errorsPin.confirmNewPin)}</Text>}

          <View style={styles.buttonGroup}>
            <Button title="Change PIN" onPress={handleSubmitPin(handleChangePin)} />
            <Button title="Cancel" onPress={togglePinModal} color="red" />
          </View>
        </View>
      </Modal>

      {/* Password Modal */}
      <Modal isVisible={isPasswordModalVisible}>
        <View style={[styles.modalContent,{backgroundColor:isDarkMode?'#333':'white'}]}>
          <Text style={[styles.modalHeader, { color: isDarkMode ? '#fff' : '#000' }]}>Change Password</Text>
          <Controller
            control={controlPassword}
            name="oldPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: isDarkMode ? '#fff' : '#000' }, errorsPassword.oldPassword && styles.errorInput]}
                placeholder="Old Password"
                placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errorsPassword.oldPassword && <Text style={styles.errorText}>{getErrorMessage(errorsPassword.oldPassword)}</Text>}

          <Controller
            control={controlPassword}
            name="newPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: isDarkMode ? '#fff' : '#000' }, errorsPassword.newPassword && styles.errorInput]}
                placeholder="New Password"
                placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errorsPassword.newPassword && <Text style={styles.errorText}>{getErrorMessage(errorsPassword.newPassword)}</Text>}

          <Controller
            control={controlPassword}
            name="confirmNewPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: isDarkMode ? '#fff' : '#000' }, errorsPassword.confirmNewPassword && styles.errorInput]}
                placeholder="Confirm New Password"
                placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errorsPassword.confirmNewPassword && <Text style={styles.errorText}>{getErrorMessage(errorsPassword.confirmNewPassword)}</Text>}

          <View style={styles.buttonGroup}>
            <Button title="Change Password" onPress={handleSubmitPassword(handleChangePassword)} />
            <Button title="Cancel" onPress={togglePasswordModal} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
  },
  switchText: {
    fontSize: 16,
  },
  button: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    fontSize: 16,
  },
  errorInput: {
    borderBottomColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});
