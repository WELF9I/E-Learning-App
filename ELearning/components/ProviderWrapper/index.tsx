/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FC, PropsWithChildren} from 'react';
import {config} from '@gluestack-ui/config';

import {Provider} from 'react-redux';
import {store} from '../../store';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GluestackUIProvider} from '@gluestack-ui/themed';

export const ProviderWrapper: FC<PropsWithChildren> = ({
  children,
}): JSX.Element => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <GluestackUIProvider config={config}>{children}</GluestackUIProvider>
      </SafeAreaView>
    </Provider>
  );
};
