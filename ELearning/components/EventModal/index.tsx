import {ModalBody, Spinner, View} from '@gluestack-ui/themed';
import {Modal, ModalContent, ModalHeader} from '@gluestack-ui/themed';
import React, {FC, useEffect} from 'react';
import {IEventModalProps} from '../types';
import { StyleSheet } from 'react-native';

export const EventModal: FC<IEventModalProps> = ({
  icon,
  isVisible,
  children,
  redirectFunction,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => redirectFunction(), 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, redirectFunction]);

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.overlayContainer}>
      <View style={styles.modalBackground} />
      <Modal isOpen={isVisible} width={'$full'} height={'$1/2'} mt={'$1/2'}>
        <View flex={1} justifyContent="center" alignItems="center">
          <ModalContent>
            <ModalHeader flexDirection="column">
              {icon}
              {children}
            </ModalHeader>
            <ModalBody>{isVisible && <Spinner />}</ModalBody>
          </ModalContent>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#607cbe',
    opacity:0.8
  },
});

export default EventModal;
