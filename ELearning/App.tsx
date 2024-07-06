import React from 'react';
import { ProviderWrapper } from './components';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationNavigator } from './components';
import { ThemeProvider } from './utils/ThemeContext';
import './utils/i18n'; // Ensure i18next is initialized
import { I18nextProvider } from 'react-i18next';
import i18next from './utils/i18n';

function App(): React.JSX.Element {
  return (
    <ProviderWrapper>
      <ThemeProvider>
        <I18nextProvider i18n={i18next}>
          <NavigationContainer>
            <ApplicationNavigator />
          </NavigationContainer>
        </I18nextProvider>
      </ThemeProvider>
    </ProviderWrapper>
  );
}

export default App;
