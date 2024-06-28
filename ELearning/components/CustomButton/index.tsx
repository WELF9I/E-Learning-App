import React, {FC} from 'react';
import {Text, View} from '@gluestack-ui/themed';
import {Button} from '@gluestack-ui/themed';
import {ICustomButtonProps} from '../types';

export const CustomButton: FC<ICustomButtonProps> = ({
  icon,
  pressEvent,
  text,
  children,
}) => {
  return (
    <Button
      mb={30}
      h={'$16'}
      rounded={'$full'}
      flexDirection="row"
      justifyContent="space-between"
      onPress={() => pressEvent()}>
      <Text
        textAlign="center"
        color="$white"
        alignSelf="center"
        flex={1}
        ml={'$5'}>
        {text}
      </Text>
      <View
        bg="$white"
        padding={10}
        rounded={'$full'}
        w={'$1/4'}
        alignItems="center">
        {icon}
      </View>
      {children}
    </Button>
  );
};
