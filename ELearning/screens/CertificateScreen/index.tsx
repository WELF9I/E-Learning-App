import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image} from 'react-native';
import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
// @ts-ignore
import CertificateSVG from '../../assets/svg/certificate-back.svg'; 
import { ScreenProps } from '../../types';
import { CustomButton } from '../../components';
// @ts-ignore
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';
// @ts-ignore
import Signature from '../../assets/categories/signature.png';

interface User {
  Nom_utl: string;
  pass: string;
  Role: string;
  education: string;
  prénom: string;
  Img: string;
  E_mail: string;
  Num: string;
}

const student: User[] = [
  {
    Nom_utl: 'A. Martin',
    pass: 'password123',
    Role: 'Student',
    education: '3D Design Illustration',
    prénom: 'Ronald',
    Img: 'https://cdn-icons-png.flaticon.com/128/16683/16683419.png',
    E_mail: 'ronald.martin@example.com',
    Num: '29051481' 
  }
];

export const CertificateScreen: FC<ScreenProps<'CertificateScreen'>> = ({ navigation,route}) => {
  const { course } = route.params;
  const certificateRef = React.useRef<View>(null);
  const [issueDate, setIssueDate] = useState<string>('');
  const [certificateID, setCertificateID] = useState<string>('');

  useEffect(() => {
    const generateCertificateID = () => {
      const randomID = `SK${Math.floor(10000000 + Math.random() * 90000000)}`;
      return randomID;
    };

    const formatDate = (date: Date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    };

    setIssueDate(formatDate(new Date()));
    setCertificateID(generateCertificateID());
  }, []);

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
          <Text style={styles.certificateTitle}>Certificate of Completions</Text>
          <Text style={styles.subText}>This Certifies that</Text>
          <Text style={styles.recipientName}>{` ${student[0].prénom} ${student[0].Nom_utl} `}</Text>
          <Text style={styles.certificateDetails}>
            Has Successfully Completed the Wallace Training Program, Entitled
          </Text>
          <Text style={styles.courseName}>{course.NomCourse}</Text>
          <Text style={styles.issueDate}>Issued on {issueDate}</Text>
          <Text style={styles.certificateID}>ID: {certificateID}</Text>
          <Text style={styles.issuer}>Virginia M. Patterson</Text>
          <Image source={Signature} style={styles.SignatureIcon} />
        </View>
      </View>
      <CustomButton
        pressEvent={handleDownload}
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
    padding: 20,
  },
  certificateTitle: {
    marginTop:50,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  subText: {
    fontSize: 14,
    marginBottom: 15,
    color: '#34495e',
  },
  recipientName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2980b9',
  },
  certificateDetails: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 18,
    color: '#34495e',
    marginTop:20,
  },
  courseName: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#e74c3c',
  },
  issueDate: {
    fontSize: 14,
    marginBottom: 8,
    color: '#34495e',
  },
  certificateID: {
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 16,
    marginTop:10,
    color: '#34495e',
  },
  signature: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  issuer: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
    color: '#34495e',
  },
  issuerDetails: {
    fontSize: 14,
    color: '#34495e',
  },
  SignatureIcon:{
    width:50,
    height:50,
  }
});

