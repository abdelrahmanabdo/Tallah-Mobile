import React from 'react';
import { CardStyleInterpolators} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { Platform } from 'react-native';


import { TabNavigator } from './TabNavigator';
import OnBoarding from '../screens/Onboarding';
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Auth/login';
import Registeration from '../screens/Auth/registration';
import ForgotPassword from '../screens/Auth/forget-password';
import OTP from '../screens/Auth/otp';
import UpdatePassword from '../screens/Auth/update-password';
import CreateProfile from '../screens/Profile/CreateProfile';
import BodyShapeCalculator from '../screens/Profile/BodyShapeCalculator';
import Profile from '../screens/Profile/Profile';
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
import Intro from '../screens/ChicChat/Intro';
import NewBlog from '../screens/ChicChat/NewBlog';
import BlogItemView from '../screens/ChicChat/BlogItemView';
import StylistsList from '../screens/Stylist/StylistsList';
import StylistDetails from '../screens/Stylist/StylistDetails';
import WelcomeIntro from '../screens/Stylist/Request/WelcomeIntro';
import PhoneConfirmation from '../screens/Stylist/Request/PhoneConfirmation';
import StylistRequestSteps from '../screens/Stylist/Request/StylistRequestSteps';
import ProjectDetails from '../screens/Stylist/Projects/ProjectDetails';
import Projects from '../screens/Stylist/Projects/Projects';
import Chat from '../screens/Chat/Chat';
import Call from '../screens/Chat/Call/Details';
import Answer from '../screens/Chat/Call/Answer';
import Outfits from '../screens/Closet/Outfits';
import OutfitItemView from '../screens/Closet/OutfitItemView';
import CreateQuotation from '../screens/Quotation/create';
import QuotationPlaceOrder from '../screens/Quotation/create/place-order';

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

 const options = {
 };

const Stack = Platform.OS == 'ios' 
  ? createNativeStackNavigator()
  : createStackNavigator();

export function AppNavigator () {
  const isFirstTime = useSelector((state) => state.user.isFirstTime);

  return (
     <Stack.Navigator
        initialRouteName = {
          !isFirstTime ? 'Home' : 'onboarding'
        }
        screenOptions = {{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config
          },
        }}
    >
         <Stack.Screen name="onboarding" 
                       component={OnBoarding}
                       options = {{options}}/>
         <Stack.Screen name="Home" 
                       component={TabNavigator}
                       options = {{options}}/>
        <Stack.Screen  name="splashScreen" 
                       component={SplashScreen}
                       options = {{options}}/>  
         <Stack.Screen name="login" 
                       component={Login}
                       options = {{options}}/>
         <Stack.Screen name="forgotPassword" 
                       component={ForgotPassword}
                       options = {{options}} />
         <Stack.Screen name="otp" 
                       component={OTP}
                       options = {{options}}/> 
         <Stack.Screen name="updatePassword" 
                       component={UpdatePassword}
                       options = {{options}}/> 
         <Stack.Screen name="createProfile" 
                       component={CreateProfile}
                       options = {{options}}/> 
         <Stack.Screen name="profile" 
                       component={Profile}
                       options = {{options}}/> 
         <Stack.Screen name="bodyShapeCalculator" 
                       component={BodyShapeCalculator}
                       options = {{options}}/> 
         <Stack.Screen name="registration" 
                       component={Registeration}
                       options = {{options}}/> 
         <Stack.Screen name="closetItemView" 
                       component={ClosetItemView}
                       options = {{options}}/>
         <Stack.Screen name="outfitItemView" 
                       component={OutfitItemView}
                       options = {{options}}/>
         <Stack.Screen name="gift" 
                       component={Gift}
                       options = {{options}}/>                          
         <Stack.Screen name="favourites" 
                       component={Favourites}
                       options = {{options}}/>   
         <Stack.Screen name="notifications" 
                       component={Notifications}
                       options = {{options}}/>
         <Stack.Screen name="messages" 
                       component={Messages}
                       options = {{options}}/>   
         <Stack.Screen name="chat" 
                       component={Chat}
                       options = {{options}}/> 
         <Stack.Screen name="AnswerCall" 
                       component={Answer}
                       options = {{options}}/>    
         <Stack.Screen name="CallDetails" 
                       component={Call}
                       options = {{options}}/>                                              
         <Stack.Screen name="calendar" 
                       component={Calendars}
                       options = {{options}}/>
         <Stack.Screen name="addCalendar" 
                       component={AddCalendars}
                       options = {{ 
                         ...options,
                         presentation: 'modal'
                       }}
         />
         <Stack.Screen name="outfitItemSelector" 
                       component={OutfitItemSelector}
                       options = {{options}}/>
         <Stack.Screen name="settings" 
                       component={Settings}
                       options = {{options}}/>
         <Stack.Screen name="about" 
                       component={About}
                       options = {{options}}/>     
         <Stack.Screen name="TAndC" 
                       component={TAndC}
                       options = {{options}}/>     
         <Stack.Screen name="support" 
                       component={Support}
                       options = {{options}}/>   
         <Stack.Screen name="chicChatIntro" 
                       component={Intro}
                       options = {{options}}/> 
         <Stack.Screen name="newBlog" 
                       component={NewBlog}
                       options = {{options}}/>      
         <Stack.Screen name="blogView" 
                       component={BlogItemView}
                       options = {{options}}/>  
         <Stack.Screen name="stylistsList" 
                       component={StylistsList}
                       options = {{options}}/>
         <Stack.Screen name="stylistDetails" 
                       component={StylistDetails}
                       options = {{options}}/>     
         <Stack.Screen name="stylistRequestIntro" 
                       component={WelcomeIntro}
                       options = {{options}}/>     
         <Stack.Screen name="phoneConfirmation" 
                       component={PhoneConfirmation}
                       options = {{options}}/>                                                                                                   
         <Stack.Screen name="stylistRequestSteps" 
                       component={StylistRequestSteps}
                       options = {{options}}/>       
         <Stack.Screen name="projects" 
                       component={Projects}
                       options = {{options}}/>  
         <Stack.Screen name="outfits" 
                       component={Outfits}
                       options = {{options}}/>  
         <Stack.Screen name="projectDetails" 
                       component={ProjectDetails}
                       options = {{options}}/>
         <Stack.Screen name="createQuotation" 
                       component={CreateQuotation}
                       options = {{options}} />
         <Stack.Screen name="quotationPlaceOrder" 
                       component={QuotationPlaceOrder}
                       options = {{options}} />
    </Stack.Navigator>
   );
}