import React, { FC, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as ImagePicker from 'react-native-image-picker';
import { ScreenProps } from '../../types';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import UploadFileIcon from '../../assets/svg/Upload-Files.svg';
//@ts-ignore
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';
import { CustomButton } from '../../components';
import { useTheme } from '../../utils/ThemeContext';

export const WriteReview: FC<ScreenProps<'WriteReview'>> = ({ navigation,route }) => {
  //@ts-ignore
  const { course } = route.params;
  const { t } = useTranslation();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        review: yup.string().max(250, t('maxCharacters')),
      })
    ),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    //@ts-ignore
    navigation.navigate('ReviewCourse',{course});
    // Handle review submission logic here
  };

  const pickImage = () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response.assets?.[0]?.uri;
        if (uri) setImageUri(uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.productInfo}>
          <View style={styles.imagePlaceholder}></View>
          <View>
            <Text style={styles.productTitle}>{course.NomCourse}</Text>
            <Text style={styles.productDescription}>{course.topic}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.label}>{t('addPhoto')}</Text>
      <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
        ) : (
          <View style={styles.uploadContent}>
            <UploadFileIcon width={40} height={40} />
            <Text style={styles.uploadText}>{t('clickToUpload')}</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>{t('writeReview')}</Text>
      <Controller
        control={control}
        name="review"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.review && styles.errorInput]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={t('reviewPlaceholder')}
            multiline
            maxLength={250}
          />
        )}
      />
      {errors.review && <Text style={styles.errorText}>{errors.review.message}</Text>}

      <CustomButton
        pressEvent={handleSubmit(onSubmit)}
        icon={<ArrowLeftBlueColor />}
        text={t('submitReview')}
      />
    </View>
  );
};

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: isDarkMode?'#333':'#F0F4F8',
  },
  card: {
    backgroundColor: isDarkMode?'#9c9c9c':'#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 25,
    marginBottom: 20,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#000',
    borderRadius: 10,
    marginRight: 10,
  },
  productTitle: {
    color: isDarkMode?'#006604':'orange',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDescription: {
    color: '#000',
    fontSize: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: isDarkMode?'#FFF':'#202244',
  },
  imageUpload: {
    height: 100,
    borderColor: isDarkMode?'#9c9c9c':'#fff',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: isDarkMode?'#9c9c9c':'#fff',
  },
  uploadContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    marginTop: 10,
    color: '#000',
    fontSize: 14,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  input: {
    height: 120,
    borderColor: isDarkMode?'#9c9c9c':'#fff',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    backgroundColor: isDarkMode?'#9c9c9c':'#fff',
    marginBottom: 20,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
