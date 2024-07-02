import React, {FC, useState} from 'react';
import {ScreenProps} from '../../types';
import {Platform,TouchableOpacity, Alert, Image} from 'react-native';
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  Center,
  EditIcon,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  View,
  VStack,
  Button,
  CalendarDaysIcon,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  Icon,
  SelectBackdrop,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  Text,
  InputSlot,
  InputIcon,
} from '@gluestack-ui/themed';
import {useForm, Controller} from 'react-hook-form';
import { launchImageLibrary } from 'react-native-image-picker';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import DateTimePicker from '@react-native-community/datetimepicker';
import PhoneInput from 'react-native-phone-number-input';
import {EGENDER} from '../../constants';
import {
  ChevronDownIcon,
  SelectPortal,
  SelectContent,
  MailIcon,
} from '@gluestack-ui/themed';
import {CustomButton} from '../../components/CustomButton';
// @ts-ignore
import ArrowLeftBlueColor from '../../assets/svg/arrowLeftBlueColor.svg';

const schema = z.object({
  fullName: z.string().nonempty({message: 'Full name is required'}),
  nickName: z.string().nonempty({message: 'Nick name is required'}),
  birthDay: z.date().refine(date => date <= new Date(), {
    message: 'Birth day must be in the past',
  }),
  email: z.string().email({message: 'Invalid email address'}),
  phoneNumber: z.string().min(8, {message: 'Invalid phone number'}),
  gender: z.nativeEnum(EGENDER),
});

export const EditStudentProfile: FC<ScreenProps<'EditStudentProfile'>> = ({navigation}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  {/*OR with Base64 */}

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response:any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('Image picker error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setAvatarUri(response.assets[0].uri);
      }
    });
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    //@ts-ignore
    control.setValue('birthDay', currentDate);
  };

  const getErrorMessage = (error: any) => {
    if (error) {
      return error.message;
    }
    return '';
  };

  const onSubmit = (data: any) => {
    console.log(data);
    navigation.navigate('CreateNewPin');
  };

  return (
    <View flex={1} m={18}>

      <Center>
        <TouchableOpacity onPress={handleSelectImage}>
          <Avatar size="xl" borderRadius={'$full'}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={{ width: '100%', height: '100%', borderRadius: 100 }} />
            ) : (
              <AvatarFallbackText>J</AvatarFallbackText>
            )}
            <AvatarBadge bg="$green600" borderRadius={'$full'}>
              <View
                borderRadius={'$full'}
                h={'$1/2'}
                alignItems="center"
                justifyContent="center">
                <EditIcon color="$white" mx={'auto'} mt={'$1/2'} />
              </View>
            </AvatarBadge>
          </Avatar>
        </TouchableOpacity>
      </Center>

      <VStack space={'3xl'} mt={10}>
        <FormControl>
          <Controller
            control={control}
            name="fullName"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                rounded={'$lg'}
                bg="$white"
                minHeight={'$12'}
                maxHeight={'$16'}
                borderColor="$white">
                <InputField
                  placeholder="Full name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
          />
          {errors.fullName && (
            <Text style={{color: 'red'}}>{getErrorMessage(errors.fullName)}</Text>
          )}
        </FormControl>
        <FormControl>
          <Controller
            control={control}
            name="nickName"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                rounded={'$lg'}
                bg="$white"
                minHeight={'$12'}
                maxHeight={'$16'}
                borderColor="$white">
                <InputField
                  placeholder="Nick name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
          />
          {errors.nickName && (
            <Text style={{color: 'red'}}>{getErrorMessage(errors.nickName)}</Text>
          )}
        </FormControl>

        <FormControl>
          <Controller
            control={control}
            name="birthDay"
            render={({field: {value, onChange}}) => (
              <>
                <Button
                  onPress={() => setShowDatePicker(true)}
                  bg="$white"
                  rounded={'$lg'}
                  minHeight={'$12'}
                  maxHeight={'$16'}
                  flexDirection="row"
                  justifyContent="flex-start"
                  alignItems="center">
                  <CalendarDaysIcon mr={10} />
                  <FormControlLabel>
                    <FormControlLabelText color="$backgroundLight400">
                    {value ? value.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Date of birth'}
                    </FormControlLabelText>
                  </FormControlLabel>
                 
                </Button>
                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={value || new Date()}
                    mode="date"
                    display="default"
                    onChange={(e, selectedDate) => {
                      setShowDatePicker(false);
                      onChange(selectedDate);
                    }}
                  />
                )}
              </>
            )}
          />
          {errors.birthDay && (
            <Text style={{color: 'red'}}>{getErrorMessage(errors.birthDay)}</Text>
          )}
        </FormControl>
        <FormControl>
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                rounded={'$lg'}
                bg="$white"
                minHeight={'$12'}
                maxHeight={'$16'}
                borderColor="$white">
                <InputSlot ml={'$4.5'}>
                  <InputIcon>
                    <Icon as={MailIcon} />
                  </InputIcon>
                </InputSlot>
                <InputField
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
          />
          {errors.email && (
            <Text style={{color: 'red'}}>{getErrorMessage(errors.email)}</Text>
          )}
        </FormControl>

        <FormControl>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, value } }) => (
              <>
                <PhoneInput
                  defaultCode="TN"
                  textInputStyle={{ height: 40, borderRadius: 15 }}
                  containerStyle={{ borderRadius: 15, width: '100%' }}
                  textContainerStyle={{
                    borderRadius: 15,
                    backgroundColor: 'white',
                    width: '100%',
                  }}
                  onChangeFormattedText={onChange}
                  value={value}
                />
                {errors.phoneNumber && (
                  <Text style={{ color: 'red' }}>{getErrorMessage(errors.phoneNumber)}</Text>
                )}
              </>
            )}
          />
        </FormControl>

        <FormControl>
          <Controller
            control={control}
            name="gender"
            render={({field: {onChange, value}}) => (
              <Select
                bgColor="$white"
                rounded={'$lg'}
                minHeight={'$12'}
                maxHeight={'$16'}
                onValueChange={onChange}
                selectedValue={value}>
                <SelectTrigger
                  variant="outline"
                  size="lg"
                  borderColor="$white"
                  rounded={'$lg'}>
                  <SelectInput placeholder="Select Gender" />
                  <SelectIcon>
                    <Icon as={ChevronDownIcon} />
                  </SelectIcon>
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    {Object.values(EGENDER).map(key => (
                      <SelectItem key={key} label={key} value={key} />
                    ))}
                  </SelectContent>
                </SelectPortal>
              </Select>
            )}
          />
        </FormControl>
        

        <CustomButton
          pressEvent={handleSubmit(onSubmit)}
          icon={<ArrowLeftBlueColor />}
          text="Update"
        />
      </VStack>
    </View>
  );
};
