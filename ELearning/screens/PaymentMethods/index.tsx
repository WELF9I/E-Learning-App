import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { ScreenProps } from '../../types';
import { CustomButton, EventModal } from '../../components';
//@ts-ignore
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';
//@ts-ignore
import PaymentSuccessIcon from '../../assets/svg/PaymentSuccess.svg';
//@ts-ignore
import PaypalIcon from '../../assets/svg/PayPal-icon.svg';
//@ts-ignore
import VisaIcon from '../../assets/svg/Visa-icon.svg';
//@ts-ignore
import GooglePayIcon from '../../assets/svg/GooglePay-icon.svg';
//@ts-ignore
import ApplePayIcon from '../../assets/svg/ApplePay-icon.svg';

import { Heading, VStack } from '@gluestack-ui/themed';
import { useTheme } from '../../utils/ThemeContext';

const PaymentIcons = {
  paypal: <PaypalIcon />,
  'google pay': <GooglePayIcon />,
  'apple pay': <ApplePayIcon />,
  '**** **** **** 3054': <VisaIcon />,
};

const getPaymentIcon = (method: string) => {
  //@ts-ignore
  return PaymentIcons[method.toLowerCase()] || null;
};

export const PaymentMethods: FC<ScreenProps<'PaymentMethods'>> = ({ navigation,route }) => {
  //@ts-ignore
  const course = route.params?.course || { prix: 0 };
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [PaymentList, setPaymentList] = useState(['Paypal', 'Google Pay', 'Apple Pay', '**** **** **** 3054']);
  const [modalVisible, setModalVisible] = useState(false);
  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);

  const onSubmit = (data: any) => {
    console.log(data);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardImage}></View>
        <View>
          <Text style={styles.cardTitle}>{course.topic}</Text>
          <Text style={styles.cardSubtitle}>{course.NomCourse}</Text>
        </View>
      </View>
      <Text style={styles.selectionText}>Select the Payment Methods you Want to Use</Text>
      {PaymentList.map((method, index) => (
        <TouchableOpacity
          key={index}
          style={styles.paymentOption}
          onPress={() => setSelectedMethod(method.toLowerCase())}
        >
          {getPaymentIcon(method)}
          <Text style={styles.paymentText}>{method}</Text>
          <RadioButton
            value={method.toLowerCase()}
            status={selectedMethod === method.toLowerCase() ? 'checked' : 'unchecked'}
            onPress={() => setSelectedMethod(method.toLowerCase())}
          />
        </TouchableOpacity>
      ))}
      <View style={{ marginTop: 50 }}>
        <CustomButton
          pressEvent={() => onSubmit({ selectedMethod })}
          icon={<ArrowLeftBlueColor />}
          text={`Enroll Course -$${course.prix}`}
        />
      </View>

      <EventModal
        icon={<PaymentSuccessIcon />}
        isVisible={modalVisible}
        redirectFunction={() => {
          setModalVisible(false);
          navigation.navigate('HomeScreen');
        }}>
        <VStack
          space="md"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={'$6'}>
          <Heading>Congratulations</Heading>
          <Text style={{ marginLeft: 10, textAlign: 'center' }}>
            Your Payment is Successfully.Purchase a new Course
          </Text>
          <TouchableOpacity onPress={()=>{navigation.navigate('MyCourses')}}>
            <Text style={styles.LinkCourse}>Watch the Course</Text>
          </TouchableOpacity>
        </VStack>
      </EventModal>
    </View>
  );
};

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: isDarkMode?'#333':'#F8F8F8',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: isDarkMode?'#696969':'#FFF',
    borderRadius: 8,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 100,
  },
  cardImage: {
    width: 50,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 8,
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B00',
  },
  cardSubtitle: {
    fontSize: 14,
    color: isDarkMode?'#e7e7e7':'#202244',
    fontWeight: 'bold',
  },
  selectionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    color:isDarkMode?'#FFF':'black'
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: isDarkMode?'#696969':'#FFF',
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDarkMode?'#FFF':'#202244',
  },
  LinkCourse: {
    textDecorationLine: 'underline',
    color: '#167F71',
    fontWeight: 'bold',
  },
});
