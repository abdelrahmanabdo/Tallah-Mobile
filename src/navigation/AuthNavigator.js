import React from 'react';
import { Platform } from 'react-native';
import { CardStyleInterpolators} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Auth/login';
import Registeration from '../screens/Auth/registration';
import ForgotPassword from '../screens/Auth/forget-password';
import OTP from '../screens/Auth/otp';
import UpdatePassword from '../screens/Auth/update-password';
import CreateProfile from '../screens/Profile/CreateProfile';
import BodyShapeCalculator from '../screens/Profile/BodyShapeCalculator';
import Profile from '../screens/Profile/Profile';

const Stack = Platform.os === 'ios'
  ? createNativeStackNavigator()
  : createStackNavigator();

export function AuthNavigator () {

  return (
     <Stack.Navigator
        initialRouteName = {'login'}
        screenOptions = {{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
    >
         <Stack.Screen name="login" 
                       component={Login}
                       />
         <Stack.Screen name="registration" 
                       component={Registeration}
                       /> 
         <Stack.Screen name="forgotPassword" 
                       component={ForgotPassword}
                        />
         <Stack.Screen name="otp" 
                       component={OTP}
                       /> 
         <Stack.Screen name="updatePassword" 
                       component={UpdatePassword}
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
    </Stack.Navigator>
   );
}