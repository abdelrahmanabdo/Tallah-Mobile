import React from 'react';
import { Platform } from 'react-native';
import { CardStyleInterpolators} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

import Intro from '../screens/ChicChat/Intro';
import NewBlog from '../screens/ChicChat/NewBlog';
import BlogItemView from '../screens/ChicChat/BlogItemView';
import ChicChatTab from '../screens/Tabs/ChicChatTab';
import CreateProfile from '../screens/Profile/CreateProfile';
import Profile from '../screens/Profile/Profile';
import Notifications from '../screens/Notifications';
import BodyShapeCalculator from '../screens/Profile/BodyShapeCalculator';

const Stack = Platform.os === 'ios'
  ? createNativeStackNavigator()
  : createStackNavigator();

export function ChicChatNavigator () {

  return (
     <Stack.Navigator
        initialRouteName = {'chicChatTab'}
        screenOptions = {{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
    >
         <Stack.Screen name="chicChatTab" 
                       component={ChicChatTab}
                       />
         <Stack.Screen name="blogView" 
                       component={BlogItemView}
                       />
         <Stack.Screen name="chicChatIntro" 
                       component={Intro}
                       /> 
         <Stack.Screen name="newBlog" 
                       component={NewBlog}
                       /> 

         <Stack.Screen name="createProfile" 
                       component={CreateProfile}
                       /> 
         <Stack.Screen name="profile" 
                       component={Profile}
                       />
         <Stack.Screen name="bodyShapeCalculator" 
                       component={BodyShapeCalculator}
                       /> 
         <Stack.Screen name="notifications" 
                       component={Notifications}
                       />
    </Stack.Navigator>
   );
}