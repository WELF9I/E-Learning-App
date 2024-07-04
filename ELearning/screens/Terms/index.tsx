import React, { FC } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ScreenProps } from '../../types';
import { useTheme } from '../../utils/ThemeContext';

export const Terms : FC<ScreenProps<'Terms'>> = ({navigation}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <ScrollView style={[styles.container,{ backgroundColor: isDarkMode ? '#333' : '#fff' }]} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle,{color:isDarkMode?'#FFF':'#202244'}]}>Conditions & Attending</Text>
        <Text style={[styles.sectionText,{color:isDarkMode?'#FFF':'#545454'}]}>
          At enim hic etiam dolore. Dulce amarum, leve asperum, prope longe, stare movere, quadratum rotundum. At certe gravius. Nullus est igitur cuiusquam dies natalis. Paulum, cum regem Persem captum adduceret, eodem flumine invectio?

          Quare hoc videndum est, possitne nobis hoc ratio philosophorum dare. Sed finge non solum callidum eum, qui aliquid improbe faciat, verum etiam praepotentem, ut M. Est autem officium, quod ita factum est, ut eius facti probabilis ratio reddi possit.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle,{color:isDarkMode?'#FFF':'#202244'}]}>Terms & Use</Text>
        <Text style={[styles.sectionText,{color:isDarkMode?'#FFF':'#545454'}]}>
          Ut proverbia non nulla veriora sint quam vestra dogmata. Tamen aberramus a proposito, et, ne longius, prorsus, inquam, Piso, si ista mala sunt, placet. Omnes enim iucundum motum, quo sensus hilaretur. Cum id fugiunt, re eadem defendunt, quae Peripatetici, verba. Quibusnam praeteritis? Portenta haec esse dicit, quidem hactenus; Si id dicis, vicimus. Qui ita affectus, beatum esse numquam probabis; Igitur neque stultorum quisquam beatus neque sapientium non beatus.

          Dicam, inquam, et quidem discendi causa magis, quam quo te aut Epicurum reprehensum velim. Dolor ergo, id est summum malum, metuetur semper, etiamsi non ader.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#202244'
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color:'#545454'
  },
});
