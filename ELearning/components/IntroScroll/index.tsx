import React, {FC, Children, useState, useRef, useCallback} from 'react';
import {ScrollView, Dimensions} from 'react-native';
import {Button, View, Text} from '@gluestack-ui/themed';
// @ts-ignore
import ArrowLeft from '../../assets/svg/arrowLeft.svg';
import {IntroScrollProps} from '../../types';
const {width, height} = Dimensions.get('window');
export const IntroScroll: FC<IntroScrollProps> = ({children, navigation}) => {
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const screens = Children.toArray(children);
  const handlePress = useCallback(() => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
      scrollViewRef.current?.scrollTo({
        x: width * (currentScreen + 1),
        animated: true,
      });
    }
  }, [currentScreen, screens]);

  return (
    <View flex={1} my={40} px={34} h={'100%'}>
      <Button
        bgColor="rgba(255, 255, 255, 0)"
        justifyContent="center"
        p={10}
        paddingHorizontal={0}
        alignSelf="flex-end"
        w={30}
        onPress={() => {
          navigation.navigate('LoginMethod');
        }}
        // px={30}
        // py={30}
      >
        <Text
          justifyContent="center"
          size="sm"
          textAlign="center"
          color="$black">
          Skip
        </Text>
      </Button>
      <ScrollView
        style={{
          flex: 1,
          overflow: 'hidden',
          width: width - 80,
        }}
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        scrollEnabled={false}>
        {screens.map((screen, index) => (
          <View key={`${index}-component`} h={height} w={width}>
            {screen}
          </View>
        ))}
      </ScrollView>
      <View
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row">
        <View
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          p={10}>
          {screens.map((_, index) => (
            <View
              key={`${index}-indicator`}
              bgColor={currentScreen === index ? '$primary400' : '#D5E2F5'}
              m={5}
              borderRadius="$full"
              w={currentScreen === index ? 30 : 10}
              h={10}
            />
          ))}
        </View>
        <Button
          onPress={() => {
            if (currentScreen < screens.length - 1) {
              handlePress();
            } else {
              navigation.navigate('LoginMethod');
            }
          }}
          paddingHorizontal={0}
          width={50}
          px={30}
          py={30}
          bgColor="$primary400"
          borderRadius={'$full'}>
          <ArrowLeft />
        </Button>
      </View>
    </View>
  );
};
