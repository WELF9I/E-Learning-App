import React from 'react';
import {ProviderWrapper} from './components';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationNavigator} from './components';
import { ThemeProvider } from './utils/ThemeContext';

function App(): React.JSX.Element {
  return (
    <ProviderWrapper>
      <ThemeProvider>
      <NavigationContainer>
        <ApplicationNavigator />
      </NavigationContainer>
    </ThemeProvider>
    </ProviderWrapper>
  );
}

export default App;
