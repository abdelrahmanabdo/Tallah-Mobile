import React from 'react';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import I18n from "../lang/I18n";

//Tabs
import AddTab from '../screens/Tabs/AddTab';
import Profile from '../screens/Profile/Profile';
import Messages from '../screens/Messages';
import Calendar from '../screens/Calendar';

import { ChicChatNavigator } from './ChicChatNavigator';
import { ClosetNavigator } from './ClosetNavigator';
import { StylistNavigator } from './StylistNavigator';
import { MoreNavigator } from './MoreNavigator';

const Tab = createMaterialTopTabNavigator();

const setTabLabel = (title) => I18n.t(title);

export const TabNavigator = ({params}) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); 
  const isStylist = useSelector((state) => state.user.activeUserType === 'stylist');

  return <Tab.Navigator 
      initialRouteName = "chicChatTab"
      tabBarPosition={'bottom'}
      initialLayout={{ 
        width: Dimensions.get('window').width 
      }}
      screenOptions={{
        "swipeEnabled": false,
        "tabBarActiveTintColor": "#D4AF37",
        "tabBarInactiveTintColor": "#012647",
        "tabBarShowIcon": true,
        "lazy": true,
        "tabBarLabelStyle": {
          "fontSize": 7.3,
          "fontFamily": "Roboto",
          "fontWeight": "700"
        },
        "tabBarIndicatorStyle": {
          width: 0,
        },
        "tabBarStyle": {
          "borderTopRightRadius": 20,
          "borderTopLeftRadius": 20,
        },
      }}
    >
      <Tab.Screen 
        name="chicChatTab" 
        component={ChicChatNavigator}
        options={{
            tabBarLabel: setTabLabel("chitChatTab"),
            tabBarIcon: ({ focused }) => (
              <FastImage source={focused ? require('../assets/icons/chic-chat-active.png') : 
                                            require('../assets/icons/chic-chat.png')} 
                          resizeMode={'contain'}
                          style={{width : 21 , height:21,alignSelf:'center'}}  />
            ),
        }}
      />
      {
      (isLoggedIn && !isStylist) &&
      <>
        <Tab.Screen
          name="closetTab" 
          component={ClosetNavigator}
          options={{
            tabBarLabel: setTabLabel("closetTab"),
            tabBarIcon: ({ focused }) => (
                <FastImage source={focused ? require('../assets/icons/closet-active.png') :   
                                            require('../assets/icons/closet-icon.png')} 
                          resizeMode={'contain'}
                          style={{width : 21 , height:21,alignSelf:'center'}}  />
            ),
          }}
        /> 
        <Tab.Screen 
            name="add" 
            component={AddTab}
            options={{
              tabBarLabel: setTabLabel("addTab"),
              tabBarIcon: ({ focused }) => (
                  <FastImage source={focused ? require('../assets/icons/add-active.png') : 
                                              require('../assets/icons/add-icon.png')} 
                            resizeMode={'contain'}
                            style={{width : 21 , height:21,alignSelf:'center'}} />
              ),
            }}
            />
      </>
      }
      {
      (isLoggedIn && isStylist) &&
      <>
        <Tab.Screen 
            name="Schedule" 
            component={Calendar}
            options={{
              tabBarLabel: setTabLabel("mySchedule"),
              tabBarIcon: ({ focused }) => (
                  <FastImage source={focused ? require('../assets/icons/schedule-icon.png') : 
                                              require('../assets/icons/schedule-icon.png')} 
                            resizeMode={'contain'}
                            style={{width : 21 , height: 21,alignSelf:'center'}} />
              ),
            }}
            />
        <Tab.Screen 
            name="Messages" 
            component={Messages}
            options={{
              tabBarLabel: setTabLabel("messages"),
              tabBarIcon: ({ focused }) => (
                  <FastImage source={focused ? require('../assets/icons/messages-icon.png') : 
                                              require('../assets/icons/messages-icon.png')} 
                            resizeMode={'contain'}
                            style={{width : 21 , height:21,alignSelf:'center'}} />
              ),
            }}
            />
        <Tab.Screen 
            name="Profile" 
            component={Profile}
            options={{
              tabBarLabel: setTabLabel("profile"),
              tabBarIcon: ({ focused }) => (
                  <FastImage source={focused ? require('../assets/icons/profile-icon.png') : 
                                              require('../assets/icons/profile-icon.png')} 
                            resizeMode={'contain'}
                            style={{width : 21 , height:21,alignSelf:'center'}} />
              ),
            }}
            />
      </>
      }
      {
      (!isStylist || (isLoggedIn && !isStylist) || !isLoggedIn) &&
      <Tab.Screen 
          name="stylistsTab" 
          component={StylistNavigator}
          options={{
            tabBarLabel: setTabLabel("stylistsTab"),
            tabBarIcon: ({ focused }) => (
                <FastImage source={focused ? require('../assets/icons/stylist-active.png') : 
                                            require('../assets/icons/stylist-icon.png')} 
                          resizeMode={'contain'}
                          style={{width : 31 , height:31,alignSelf:'center'}} />
            ),
          }}
          />
      }
      <Tab.Screen 
        name="More" 
        component={MoreNavigator}
        options={{
            tabBarLabel: setTabLabel("moreTab"),
            tabBarIcon: ({ focused }) => (
                <FastImage source={focused ? require('../assets/icons/more-active.png') : 
                                            require('../assets/icons/more-icon.png')} 
                          resizeMode={'contain'}
                          style={{width : 30 , height:30}} />

            ),
        }}
        />
    </Tab.Navigator>
};

export default TabNavigator;
