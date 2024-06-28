import {View} from '@gluestack-ui/themed';
import React, {FC, PropsWithChildren} from 'react';

export const RoundedLogoContainer: FC<PropsWithChildren> = ({
  children,
}): JSX.Element => {
  return (
    <View flexDirection="row" bg="$white" padding={10} rounded={'$full'}>
      {children}
    </View>
  );
};
