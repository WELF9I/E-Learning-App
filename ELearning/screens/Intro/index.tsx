import React, {FC} from 'react';

import {ScreenProps} from '../../types';
import {Text, View} from '@gluestack-ui/themed';
import {IntroScroll, SliderIntroItemContainer} from '../../components';
import {introMessage} from '../../constants';

export const Intro: FC<ScreenProps<'Intro'>> = ({navigation, route}) => {
  return (
    <IntroScroll navigation={navigation} route={route}>
      {introMessage.map((item, index) => (
        <SliderIntroItemContainer key={index}>
          <View w={'80%'}>
            <Text size="3xl" textAlign="center">
              {item.title}
            </Text>
            <Text size="sm" textAlign="center">
              {item.description}
            </Text>
          </View>
        </SliderIntroItemContainer>
      ))}
    </IntroScroll>
  );
};
