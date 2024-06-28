import React from 'react';
import {ProviderWrapper} from './components';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationNavigator} from './components';

function App(): React.JSX.Element {
  return (
    <ProviderWrapper>
      <NavigationContainer>
        <ApplicationNavigator />
      </NavigationContainer>
    </ProviderWrapper>
  );
}

export default App;
