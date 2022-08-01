import React from 'react';
import { Platform } from 'react-native';
import { CardStyleInterpolators} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

import ClosetItemView from '../screens/Closet/ClosetItemView';
import Gift from '../screens/Closet/Gift';
import Favourites from '../screens/Favourites';
import Calendars from '../screens/Calendar';
import AddCalendars from '../screens/Calendar/add';
import OutfitItemSelector from '../screens/Calendar/add/outfit-item';
import OutfitItemView from '../screens/Closet/OutfitItemView';
import ClosetTab from '../screens/Tabs/ClosetTab';
import AddTab from '../screens/Tabs/AddTab';
import Calendar from '../screens/Calendar';

const Stack = Platform.os === 'ios'
  ? createNativeStackNavigator()
  : createStackNavigator();

export function ClosetNavigator () {

  return (
     <Stack.Navigator
        initialRouteName = {'closet'}
        screenOptions = {{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
    >
         <Stack.Screen name="closet" 
                       component={ClosetTab}
                       />
         <Stack.Screen name="closetItemView" 
                       component={ClosetItemView}
                       />
         <Stack.Screen name="add" 
                       component={AddTab}
                       />
         <Stack.Screen name="Schedule" 
                       component={Calendar}
                       />
         <Stack.Screen name="outfitItemView" 
                       component={OutfitItemView}
                       />
         <Stack.Screen name="gift" 
                       component={Gift}
                       />                          
         <Stack.Screen name="favourites" 
                       component={Favourites}
                       />   
         <Stack.Screen name="calendar" 
                       component={Calendars}
                       />
         <Stack.Screen name="addCalendar" 
                       component={AddCalendars}
         />
         <Stack.Screen name="outfitItemSelector" 
                       component={OutfitItemSelector}
                       />
    </Stack.Navigator>
   );
}