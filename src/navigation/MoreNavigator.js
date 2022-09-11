import React from 'react';
import { CardStyleInterpolators} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import ClosetItemView from '../screens/Closet/ClosetItemView';
import Gift from '../screens/Closet/Gift';
import Favourites from '../screens/Favourites';
import Notifications from '../screens/Notifications';
import Messages from '../screens/Messages';
import Calendars from '../screens/Calendar';
import AddCalendars from '../screens/Calendar/add';
import OutfitItemSelector from '../screens/Calendar/add/outfit-item';
import About from '../screens/About';
import Settings from '../screens/Settings';
import TAndC from '../screens/TAndC';
import Support from '../screens/Support';
import WelcomeIntro from '../screens/Stylist/Request/WelcomeIntro';
import PhoneConfirmation from '../screens/Stylist/Request/PhoneConfirmation';
import StylistRequestSteps from '../screens/Stylist/Request/StylistRequestSteps';
import Chat from '../screens/Chat';
import Session from '../screens/Chat/Session';
import Outfits from '../screens/Closet/Outfits';
import OutfitItemView from '../screens/Closet/OutfitItemView';
import ClosetTab from '../screens/Tabs/ClosetTab';
import Calendar from '../screens/Calendar';
import StylistTab from '../screens/Tabs/StylistTab';
import ProjectDetails from '../screens/Stylist/Projects/ProjectDetails';
import MoreTab from '../screens/Tabs/MoreTab';
import CreateProfile from '../screens/Profile/CreateProfile';
import Profile from '../screens/Profile/Profile';
import BodyShapeCalculator from '../screens/Profile/BodyShapeCalculator';

const Stack = Platform.os === 'ios'
  ? createNativeStackNavigator()
  : createStackNavigator();

export function MoreNavigator () {

  return (
     <Stack.Navigator
        initialRouteName = {'moreTab'}
        screenOptions = {{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
    >
         <Stack.Screen name="moreTab" 
                       component={MoreTab}
                       />
         <Stack.Screen name="Schedule" 
                       component={Calendar}
                       />
         <Stack.Screen name="outfits" 
                       component={Outfits}
                       />  
         <Stack.Screen name="outfitItemView" 
                       component={OutfitItemView}
                       />
         <Stack.Screen name="outfitItemSelector" 
                       component={OutfitItemSelector}
                       />
         <Stack.Screen name="closet" 
                       component={ClosetTab}
                       />
         <Stack.Screen name="closetItemView" 
                       component={ClosetItemView}
                       />
         <Stack.Screen name="projectDetails" 
                       component={ProjectDetails}
                       />
         <Stack.Screen name="gift" 
                       component={Gift}
                       />                          
         <Stack.Screen name="favourites" 
                       component={Favourites}
                       />   
         <Stack.Screen name="notifications" 
                       component={Notifications}
                       />
         <Stack.Screen name="messages" 
                       component={Messages}
                       />   
         <Stack.Screen name="chat" 
                       component={Chat}
                       /> 
         <Stack.Screen name="Session" 
                       component={Session}
                       />    
         <Stack.Screen name="calendar" 
                       component={Calendars}
                       />
         <Stack.Screen name="addCalendar" 
                       component={AddCalendars}
         />
         <Stack.Screen name="settings" 
                       component={Settings}
                       />
         <Stack.Screen name="about" 
                       component={About}
                       />     
         <Stack.Screen name="TAndC" 
                       component={TAndC}
                       />     
         <Stack.Screen name="support" 
                       component={Support}
                       />   
         <Stack.Screen name="stylistRequestIntro" 
                       component={WelcomeIntro}
                       />     
         <Stack.Screen name="phoneConfirmation" 
                       component={PhoneConfirmation}
                       />                                                                                                   
         <Stack.Screen name="stylistRequestSteps" 
                       component={StylistRequestSteps}
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