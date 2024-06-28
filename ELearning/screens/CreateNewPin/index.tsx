/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {FC} from 'react';
import {ScreenProps} from '../../types';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import PINCode from '@haskkor/react-native-pincode';
import {TrashIcon} from '@gluestack-ui/themed';

const DeleteButton = ({onPress}: {onPress: () => unknown}) => (
  <TouchableOpacity onPress={onPress} style={styles.customDeleteButton}>
    <TrashIcon color="blue" size="xl" />
  </TouchableOpacity>
);

export const CreateNewPin: FC<ScreenProps<'CreateNewPin'>> = ({navigation}) => {
  const handleFinishProcess = () => {
    navigation.navigate('SetFingerPrint');
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <PINCode
        status={'choose'}
        iconButtonDeleteDisabled={false}
        stylePinCodeButtonCircle={{backgroundColor: 'white'}}
        colorPassword="blue"
        stylePinCodeDeleteButtonText={styles.deleteButtonText}
        stylePinCodeDeleteButtonSize={100}
        getCurrentPinLength={length => console.log(length)}
        buttonDeleteComponent={(props: React.JSX.IntrinsicAttributes & { onPress: () => unknown; }) => <DeleteButton {...props} />} // Custom delete button component
        finishProcess={handleFinishProcess} // Event handler for when the PIN process is finished
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  deleteButtonText: {
    backgroundColor: 'white',
    color: 'blue',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 50,
  },
  customDeleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
  },
});
