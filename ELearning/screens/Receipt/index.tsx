import React, { FC, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Share from 'react-native-share';
import RNPrint from 'react-native-print';
import Clipboard from '@react-native-clipboard/clipboard';
import QRCode from 'react-native-qrcode-svg';
import ViewShot, { captureRef } from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import { ScreenProps } from '../../types';
// @ts-ignore
import Facture from '../../assets/svg/Facture.svg';
// @ts-ignore
import Copy from '../../assets/svg/Copy.svg';
// @ts-ignore
import BarOption from '../../assets/svg/BarOption.svg';
// @ts-ignore
import Exit from '../../assets/svg/Exit.svg';
// @ts-ignore
import Download from '../../assets/svg/Download.svg';
// @ts-ignore
import Print from '../../assets/svg/Print.svg';
// @ts-ignore
import ShareIcon from '../../assets/svg/Share.svg';

export const Receipt: FC<ScreenProps<'Receipt'>> = ({ route, navigation }) => {
  const [isListVisible, setIsListVisible] = useState(false);
  const viewShotRef = useRef<View>(null);
  // @ts-ignore
  const { transaction } = route.params;

  const ReceiptRef = useRef<View>(null);

  const handleDownloadPDF = async () => {
    try {
      const uri = await captureRef(ReceiptRef, {
        format: 'png',
        quality: 1,
      });

      await Share.open({
        url: uri,
        title: 'Download Facture',
        message: 'Here is your Facture.',
      });
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  const handleToggleList = () => {
    setIsListVisible(!isListVisible);
  };

  const handleShare = async () => {
    const options = {
      message: `Check out this transaction: ${transaction.title}`,
    };
    try {
      await Share.open(options);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDownloadPrint = async () => {
    const detailsHtml = Object.keys(transaction)
      .filter(key => key !== 'id')
      .map(key => {
        return `
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; width: 80%;">
            <div style="color: red; font-weight: bold; margin-right: 10px;">${key}:</div>
            <div>${transaction[key]}</div>
          </div>`;
      })
      .join('');

    const html = `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            text-align: center;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
          }
          .facture {
            text-align: center;
            margin-bottom: 20px;
          }
          .details {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-top:160px;
          }
          h1 {
            color: black;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Transaction</h1>
          <div class="details">
            ${detailsHtml}
          </div>
        </div>
      </body>
      </html>
    `;
    try {
      await RNPrint.print({ html });
    } catch (error) {
      console.error('Error printing:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
  };

  const details = [
    { label: 'Title', value: transaction.title },
    { label: 'Name', value: transaction.Name },
    { label: 'Email ID', value: transaction.Email },
    { label: 'Course', value: transaction.Course },
    { label: 'Category', value: transaction.category },
    { label: 'TransactionID', value: transaction.transactionId, isCopyable: true },
    { label: 'Price', value: transaction.price },
    { label: 'Date', value: transaction.Date },
    { label: 'Status', value: transaction.status, isStatus: true },
  ];

  const qrCodeValue = JSON.stringify(transaction);

  return (
    <View style={styles.container}>
    <ViewShot ref={ReceiptRef} style={styles.container}>
      <View style={{ alignItems: 'center', marginTop: '24%' }}>
        <Facture />
      </View>
      <View style={{ marginLeft: 130, marginTop: 30 }}>
        <QRCode
          value={qrCodeValue}
          logo={{ uri: '../../assets/LOGO_Telead.png' }}
          logoSize={30}
          logoBackgroundColor='transparent'
        />
      </View>
      <View style={styles.courseDetails}>
        {details.map((detail, index) => (
          <View style={styles.detailRow} key={index}>
            <Text style={styles.detailItem}>{detail.label}:</Text>
            <Text
              style={[
                styles.detailValue,
                detail.isStatus && (detail.value.toUpperCase() === 'PAID' ? styles.statusPaid : styles.statusUnpaid),
              ]}
            >
              {detail.value}
            </Text>
            {detail.isCopyable && (
              <TouchableOpacity onPress={() => copyToClipboard(detail.value)}>
                <Copy style={styles.copyIcon} />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
      </ViewShot>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleToggleList}>
          {isListVisible ? <Exit /> : <BarOption />}
        </TouchableOpacity>
        {isListVisible && (
          <View style={styles.listContainer}>
            <TouchableOpacity onPress={handleShare} style={styles.listItem}>
              <ShareIcon />
              <Text style={styles.listText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDownloadPDF} style={styles.listItem}>
              <Download />
              <Text style={styles.listText}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDownloadPrint} style={styles.listItem}>
              <Print />
              <Text style={styles.listText}>Print</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  courseDetails: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
    marginBottom:35
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  detailItem: {
    fontSize: 14,
    color: '#202244',
    width: 100,
  },
  detailValue: {
    flex: 1,
    color: '#545454',
  },
  copyIcon: {
    marginRight: 130,
  },
  statusPaid: {
    backgroundColor: '#167F71',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 5,
    textAlign: 'center',
  },
  statusUnpaid: {
    backgroundColor: 'red',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 5,
    textAlign: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  listContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: 150,
    position: 'absolute',
    top: 40,
    right: 0,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  listText: {
    fontSize: 16,
    color: '#167F71',
    marginLeft: 10,
  },
});
