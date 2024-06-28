import React, {FC, PropsWithChildren} from 'react';

import {View} from '@gluestack-ui/themed';

export const SliderIntroItemContainer: FC<PropsWithChildren> = ({children}) => {
  return (
    <View flex={1} justifyContent="center" flexDirection="column">
      {children}
    </View>
  );
};
