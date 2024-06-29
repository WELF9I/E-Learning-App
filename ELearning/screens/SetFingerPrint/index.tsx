import React, { useState, FC } from 'react';
import { Alert, Linking, TouchableOpacity } from 'react-native';
import {
  Center,
  Text,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  View,
  VStack,
  Heading,
} from '@gluestack-ui/themed';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
// @ts-ignore
import FingerPrintLogo from '../../assets/svg/fingerPrintLogo.svg';
// @ts-ignore
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';
// @ts-ignore
import Congratulations from '../../assets/svg/congratulations-1.svg';
import { ScreenProps } from '../../types';
import { EventModal } from '../../components';

export const SetFingerPrint: FC<ScreenProps<'SetFingerPrint'>> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [enableFingerprintModalVisible, setEnableFingerprintModalVisible] = useState(false);
  const rnBiometrics = new ReactNativeBiometrics();

  const saveFingerprint = async () => {
    try {
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();

      if (available && biometryType === BiometryTypes.Biometrics) {
        const { publicKey } = await rnBiometrics.createKeys();
        console.log("publicKey",publicKey);

        if (publicKey) {
          const result = await rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' });

          if (result.success) {
            setModalVisible(true);
            console.log("Success");
          } else {
            Alert.alert('Error', 'Failed to authenticate using fingerprint');
          }
        } else {
          Alert.alert('Error', 'Failed to save fingerprint');
        }
      } else {
        setEnableFingerprintModalVisible(true);
      }
    } catch (error: any) {
      Alert.alert('Error', `An error occurred: ${error.message}`);
    }
  };

  const openSettings = () => {
    Linking.openSettings();
  };

  return (
    <View flex={1} m={18} justifyContent="space-around" alignItems="center">
      <VStack space="4xl">
        <Text textAlign="center" lineHeight={'$md'}>
          Add a Fingerprint to Make your Account more Secure
        </Text>
        <Center mt={50}>
          <FingerPrintLogo />
        </Center>
      </VStack>
      <View
        flexDirection="row"
        justifyContent="space-evenly"
        alignItems="center"
        w={'$full'}>

        <TouchableOpacity style={{borderRadius:30,backgroundColor:'gray',width:100,height:50}} onPress={()=>{navigation.navigate('SignIn')}}>
          <Text style={{textAlign:'center',marginTop:12}}>Skip</Text>
        </TouchableOpacity>


        <Button
          rounded={'$full'}
          flexDirection="row"
          alignSelf="center"
          justifyContent="space-between"
          height={55}
          onPress={saveFingerprint}>
          <Text textAlign="center" color="$white" alignSelf="center" mr={'$5'}>
            Continue
          </Text>
          <View
            bg="$white"
            p={10}
            rounded={'$full'}
            w={'$12'}
            alignItems="center">
            <ArrowLeftBlueColor />
          </View>
        </Button>
      </View>

      <EventModal
        icon={<Congratulations />}
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

      {/* Enable Fingerprint Modal */}
      <Modal
        isOpen={enableFingerprintModalVisible}
        onClose={() => setEnableFingerprintModalVisible(false)}>
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            <Text>Enable Fingerprint</Text>
          </ModalHeader>
          <ModalBody>
            <Text>
              Fingerprint authentication is not enabled on your device. Would
              you like to enable it in settings?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onPress={openSettings}>
              <Text>Yes, Open Settings</Text>
            </Button>
            <Button onPress={() => setEnableFingerprintModalVisible(false)}>
              <Text>Cancel</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>
  );
};
