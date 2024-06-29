/* eslint-disable react/no-unstable-nested-components */
import React, {FC} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {rootStackParamList} from '../../types';
import {
  Landing,
  Intro,
  LoginMethod,
  SignIn,
  SignUp,
  FillProfile,
  CreateNewPin,
  SetFingerPrint,
  ForgotPassword,
  VerifyForgotPassword,
  CreateNewPassword,
} from '../../screens';
import {Text} from '@gluestack-ui/themed';

const Stack = createStackNavigator<rootStackParamList>();

export const ApplicationNavigator: FC = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="LoginMethod" component={LoginMethod} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen
        options={{
          headerTitle(props:any) {
            return (
              <Text>
                {props.children.replace(/([a-z])([A-Z])/g, '$1 $2')}
              </Text>
            );
          },
        }} 
        name="ForgotPassword" 
        component={ForgotPassword} />

       <Stack.Screen
        options={{
          headerTitle(props:any) {
            return (
              <Text>
                {props.children.replace(/([a-z])([A-Z])/g, '$1 $2')}
              </Text>
            );
          },
        }} 
        name="VerifyForgotPassword" 
        component={VerifyForgotPassword} />

    <Stack.Screen
        options={{
          headerTitle(props:any) {
            return (
              <Text>
                {props.children.replace(/([a-z])([A-Z])/g, '$1 $2')}
              </Text>
            );
          },
        }} 
        name="CreateNewPassword" 
        component={CreateNewPassword} />

        </Stack.Group>

      <Stack.Group>
        <Stack.Screen
          options={{
            headerTitle(props:any) {
              return (
                <Text>
                  {props.children.replace(/([a-z])([A-Z])/g, '$1 $2')}
                </Text>
              );
            },
          }}
          name="FillProfile"
          component={FillProfile}
        />
        <Stack.Screen
          options={{
            headerTitle(props:any) {
              return (
                <Text>
                  {props.children.replace(/([a-z])([A-Z])/g, '$1 $2')}
                </Text>
              );
            },
          }}
          name="CreateNewPin"
          component={CreateNewPin}
        />
        <Stack.Screen
          options={{
            headerTitle(props:any) {
              return (
                <Text>
                  {props.children.replace(/([a-z])([A-Z])/g, '$1 $2')}
                </Text>
              );
            },
          }}
          name="SetFingerPrint"
          component={SetFingerPrint}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
