import React from 'react';
import { Platform } from 'react-native';
import { CardStyleInterpolators} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

import Notifications from '../screens/Notifications';
import StylistsList from '../screens/Stylist/StylistsList';
import StylistProfile from '../screens/Stylist/profile';
import WelcomeIntro from '../screens/Stylist/Request/WelcomeIntro';
import PhoneConfirmation from '../screens/Stylist/Request/PhoneConfirmation';
import StylistRequestSteps from '../screens/Stylist/Request/StylistRequestSteps';
import ProjectDetails from '../screens/Stylist/Projects/ProjectDetails';
import Projects from '../screens/Stylist/Projects/Projects';
import Chat from '../screens/Chat';
import Answer from '../screens/Chat/Call/Answer';
import CreateQuotation from '../screens/Quotation/create';
import QuotationPlaceOrder from '../screens/Quotation/create/place-order';
import TAndC from '../screens/TAndC';

import StylistTab from '../screens/Tabs/StylistTab';
import Profile from '../screens/Profile/Profile';
import CreateProfile from '../screens/Profile/CreateProfile';
import BodyShapeCalculator from '../screens/Profile/BodyShapeCalculator';
import Session from '../screens/Chat/Session';

const config = {
   animation :'spring',
   config: {
     stiffness: 55,
     damping: 10,
     mass: 1,
     restDisplacementThreshold: 0.00,
     restSpeedThreshold: 0.00,      
   },
 };

const Stack = Platform.os === 'ios'
  ? createNativeStackNavigator()
  : createStackNavigator();

export function StylistNavigator () {

  return (
     <Stack.Navigator
        initialRouteName = {'stylistsTab'}
        screenOptions = {{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
    >                                          
         <Stack.Screen name="stylistsTab" 
                       component={StylistTab}
                       />  
         <Stack.Screen name="stylistsList" 
                       component={StylistsList}
                       />
         <Stack.Screen name="stylistProfile" 
                       component={StylistProfile}
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
         <Stack.Screen name="projects" 
                       component={Projects}
                       />  
         <Stack.Screen name="projectDetails" 
                       component={ProjectDetails}
                       />
         <Stack.Screen name="createQuotation" 
                       component={CreateQuotation}
                        />
         <Stack.Screen name="quotationPlaceOrder" 
                       component={QuotationPlaceOrder}
                        />
         <Stack.Screen name="notifications" 
                       component={Notifications}
                       />
         <Stack.Screen name="chat" 
                       component={Chat}
                       /> 
         <Stack.Screen name="AnswerCall" 
                       component={Answer}
                       />    
         <Stack.Screen name="Session" 
                       component={Session}
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
         <Stack.Screen name="TAndC" 
                       component={TAndC}
                       />    
    </Stack.Navigator>
   );
}