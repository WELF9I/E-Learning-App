import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
// @ts-ignore
import CertificateSVG from '../../assets/svg/certificate-back.svg'; // Adjust the path to your SVG file
import { ScreenProps } from '../../types';
import { CustomButton } from '../../components';
//@ts-ignore
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';

export const CertificateScreen: FC<ScreenProps<'CertificateScreen'>> = ({ navigation }) => {
  const certificateRef = React.useRef<View>(null);

  const handleDownload = async () => {
    try {
      const uri = await captureRef(certificateRef, {
        format: 'png',
        quality: 1,
      });

      await Share.open({
        url: uri,
        title: 'Download Certificate',
        message: 'Here is your certificate.',
      });
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.certificateContainer} ref={certificateRef}>
        <CertificateSVG width="140%" height="500" />
        <View style={styles.overlay}>
          <Text style={styles.certificateText}>Certificate of Completions</Text>
          <Text style={{marginBottom:5}}>This certificate thot</Text>
          <Text style={styles.certificateName}>Calvin E. McGinnis</Text>
          <Text style={styles.certificateDetails}>
            Has Successfully Completed the Wallace Training Program, Entitled.
          </Text>
          <Text style={styles.courseName}>3D Design Illustration Course</Text>
          <Text style={styles.issueDate}>Issued on November 24, 2022</Text>
          <Text style={styles.certificateID}>ID: SK24568086</Text>
          <Text style={styles.signature}>Calvin E. McGinnis</Text>
          <Text style={styles.issuer}>Virginia M. Patterson</Text>
          <Text style={styles.issuerDetails}>Issued on November 24, 2022</Text>
        </View>
      </View>
      <CustomButton
        pressEvent={()=>handleDownload()}
        icon={<ArrowLeftBlueColor />}
        text="Download Certificate"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  certificateContainer: {
    backgroundColor: 'white',
    padding: 36,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  certificateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    marginTop:25
  },
  certificateName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
    marginTop:15
  },
  certificateDetails: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
    color: 'black',
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  issueDate: {
    fontSize: 14,
    marginBottom: 8,
    color: 'black',
  },
  certificateID: {
    fontSize: 14,
    marginBottom: 16,
    color: 'black',
  },
  signature: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
    fontFamily:'Mishella'
  },
  issuer: {
    fontSize: 14,
    marginBottom: 8,
    color: 'black',
  },
  issuerDetails: {
    fontSize: 14,
    marginBottom: 8,
    color: 'black',
  },
});

