import React from 'react';
import { Platform } from 'react-native';
import { CardStyleInterpolators} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { TabNavigator } from './TabNavigator';
import OnBoarding from '../screens/Onboarding';
import { AuthNavigator } from './AuthNavigator';
import BlogItemView from '../screens/ChicChat/BlogItemView';
import Chat from '../screens/Chat';
import CreateQuotation from '../screens/Quotation/create';
import QuotationPlaceOrder from '../screens/Quotation/create/place-order';
import TAndC from '../screens/TAndC';
import Messages from '../screens/Messages';

const Stack = Platform.os === 'ios'
  ? createNativeStackNavigator()
  : createStackNavigator();

export function AppNavigator () {
  const isFirstTime = useSelector((state) => state.user.isFirstTime);

  return (
     <Stack.Navigator
        initialRouteName = {
          !isFirstTime ? 'Home' : 'Onboarding'
        }
        screenOptions = {{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
    >
        <Stack.Screen name="Onboarding" 
                      component={OnBoarding}
                      />
        <Stack.Screen name="Home" 
                      component={TabNavigator}
                      />
        <Stack.Screen name="Auth"
                      component={AuthNavigator}
                      />
        <Stack.Screen name="BlogPage"
                      component={BlogItemView}
                      />
         <Stack.Screen name="messages" 
                       component={Messages}
                       />
         <Stack.Screen name="chat" 
                       component={Chat}
                       />
         <Stack.Screen name="createQuotation" 
                       component={CreateQuotation}
                        />
         <Stack.Screen name="quotationPlaceOrder" 
                       component={QuotationPlaceOrder}
                        />
         <Stack.Screen name="TAndC"
                       component={TAndC}
                       />   
    </Stack.Navigator>
  );
}