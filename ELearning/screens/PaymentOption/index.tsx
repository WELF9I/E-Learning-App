import React, { useState, FC } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScreenProps } from '../../types';
import { CustomButton } from '../../components';
import { useTheme } from '../../utils/ThemeContext';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';
//@ts-ignore
import Card from '../../assets/svg/CARD.svg';

const cardSchema = z.object({
  cardName: z.string().min(1, 'CardNameError').regex(/^[a-zA-Z ]+$/, 'CardNameError'),
  cardNumber: z.string().min(16, 'CardNumberError').regex(/^\d{16}$/, 'CardNumberError'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'ExpiryDateError'),
  cvv: z.string().min(3, 'CVVError').max(3, 'CVVError').regex(/^\d{3}$/, 'CVVError'),
});

export const PaymentOption: FC<ScreenProps<'PaymentOption'>> = ({ navigation }) => {
  const { t } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const { isDarkMode } = useTheme();
  const [cards, setCards] = useState([
    { id: '1', cardNumber: '**** **** **** 3054', status: t('Connected') },
  ]);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(cardSchema),
  });

  const getErrorMessage = (error: any) => {
    if (error) {
      return t(error.message);
    }
    return '';
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddCard = (data: any) => {
    const maskedCardNumber = `**** **** **** ${data.cardNumber.slice(-4)}`;
    const newCard = { id: (cards.length + 1).toString(), cardNumber: maskedCardNumber, status: t('Connected') };
    setCards([...cards, newCard]);
    toggleModal();
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#f9fafb' }]}>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardRow}>
            <Text style={styles.cardText}>{item.cardNumber}</Text>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        )}
      />
      <CustomButton
        pressEvent={toggleModal}
        icon={<ArrowLeftBlueColor />}
        text={t('AddNewCard')}
      />
      <Modal isVisible={isModalVisible}>
        <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#333' : '#f9fafb' }]}>
          <Text style={[styles.modalHeader, { backgroundColor: isDarkMode ? '#333' : '#f9fafb', color: isDarkMode ? 'white' : '#202244' }]}>
            {t('AddNewCard')}
          </Text>
          <Card />

          <Controller
            control={control}
            name="cardName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.cardName && styles.errorInput]}
                placeholder={t('CardName')}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.cardName && <Text style={styles.errorText}>{getErrorMessage(errors.cardName)}</Text>}

          <Controller
            control={control}
            name="cardNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.cardNumber && styles.errorInput]}
                placeholder={t('CardNumber')}
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                maxLength={16}
              />
            )}
          />
          {errors.cardNumber && <Text style={styles.errorText}>{getErrorMessage(errors.cardNumber)}</Text>}

          <View style={styles.row}>
            <Controller
              control={control}
              name="expiryDate"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, styles.smallInput, errors.expiryDate && styles.errorInput]}
                  placeholder={t('ExpiryDate')}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  maxLength={5}
                />
              )}
            />
            <Controller
              control={control}
              name="cvv"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, styles.smallInput, errors.cvv && styles.errorInput]}
                  placeholder={t('CVV')}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  maxLength={3}
                />
              )}
            />
          </View>
          {errors.expiryDate && <Text style={styles.errorText}>{getErrorMessage(errors.expiryDate)}</Text>}
          {errors.cvv && <Text style={styles.errorText}>{getErrorMessage(errors.cvv)}</Text>}

          <View style={styles.buttonGroup}>
            <Button title={t('AddCard')} onPress={handleSubmit(handleAddCard)} />
            <Button title={t('Cancel')} onPress={toggleModal} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: '#f0f0f0',
    marginTop: 3,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
    marginBottom: 25,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    padding: 16,
  },
  cardText: {
    fontSize: 18,
  },
  statusText: {
    fontSize: 16,
    color: 'green',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 12,
    margin: 7,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
  },
  modalHeader: {
    fontSize: 20,
    color: '#202244',
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 20,
  },
  input: {
    marginBottom: 16,
    fontSize: 18,
    width: '100%',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  smallInput: {
    width: '48%',
  },
  errorInput: {
    backgroundColor: '#ffe6e6',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
