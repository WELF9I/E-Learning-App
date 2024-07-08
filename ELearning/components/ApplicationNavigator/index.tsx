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
  TopCoursesScreen,
  TransactionsScreen,
  Receipt,
  EditStudentProfile,
  NotificationSettings,
  PaymentOption,
  SecurityOption,
  LanguageSettings,
  Profile,
  Terms,
  Footer,
  HomeScreen,
  CategoriesScreen,
  TopMentorsScreen,
  Notifications,
  OnlineCoursesScreen,
  MyCourses,
  MyCoursesOngoing,
  MyCoursesCompleted,
  ViewCourse,
  Curriculum,
  MyBookmark,
  MentorProfile,
  ReviewCourse,
  WriteReview,
  PaymentMethods,
  Filter,
  CertificateScreen,
  Quizz,
} from '../../screens';
import {Text} from '@gluestack-ui/themed';

const Stack = createStackNavigator<rootStackParamList>();

export const ApplicationNavigator: FC = (): JSX.Element => {
  return (
    <Stack.Navigator>


      {/* <Stack.Group
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
          name="TopCoursesScreen"
          component={TopCoursesScreen}
        />
         </Stack.Group> */}
        
           
        <Stack.Group
        screenOptions={{
          headerShown: true,
        }}>

         <Stack.Screen
          options={{
            headerShown: false,
            headerTitle(props:any) {
              return (
                <Text>
                  {props.children.replace(/([a-z])([A-Z])/g, '$1 $2')}
                </Text>
              );
            },
          }}
          name="HomeScreen"
          component={HomeScreen}
          
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
          name="CategoriesScreen"
          component={CategoriesScreen}
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
          name="TopMentorsScreen"
          component={TopMentorsScreen}
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
          name="Notifications"
          component={Notifications}
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
          name="OnlineCoursesScreen"
          component={OnlineCoursesScreen}
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
          name="ViewCourse"
          component={ViewCourse}
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
          name="MyCourses"
          component={MyCourses}
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
          name="MyCoursesCompleted"
          component={MyCoursesCompleted}
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
          name="MyCoursesOngoing"
          component={MyCoursesOngoing}
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
          name="TransactionsScreen"
          component={TransactionsScreen}
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
          name="Receipt"
          component={Receipt}
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
          name="Profile"
          component={Profile}
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
          name="LanguageSettings"
          component={LanguageSettings}
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
          name="SecurityOption"
          component={SecurityOption}
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
          name="PaymentOption"
          component={PaymentOption}
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
          name="NotificationSettings"
          component={NotificationSettings}
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
          name="EditStudentProfile"
          component={EditStudentProfile}
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
          name="Terms"
          component={Terms}
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
          name="Footer"
          component={Footer}
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
          name="Curriculum"
          component={Curriculum}
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
          name="PaymentMethods"
          component={PaymentMethods}
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
          name="MyBookmark"
          component={MyBookmark}
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
          name="MentorProfile"
          component={MentorProfile}
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
          name="Filter"
          component={Filter}
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
          name="ReviewCourse"
          component={ReviewCourse}
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
          name="WriteReview"
          component={WriteReview}
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
          name="CertificateScreen"
          component={CertificateScreen}
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
          name="Quizz"
          component={Quizz}
        />     

      </Stack.Group>
    </Stack.Navigator>
  );
};
