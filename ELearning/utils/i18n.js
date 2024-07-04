import I18n from 'react-native-i18n';
import en from '../locales/en.json';
import ar from '../locales/ar.json';
import fr from '../locales/fr.json';

I18n.fallbacks = true;
I18n.translations = {
  en,
  ar,
  fr,
};

export default I18n;