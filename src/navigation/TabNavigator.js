import React from 'react';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';

// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
import { TabLabel, TabsName } from '../enums';

const Tab = createBottomTabNavigator();

const setTabLabel = (title) => I18n.t(title);

export const TabNavigator = ({params}) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); 
  const isStylist = useSelector((state) => state.user.activeUserType === 'stylist');

  return <Tab.Navigator 
      initialRouteName={TabsName.ChitChatTab}
      initialLayout={{ 
        width: Dimensions.get('window').width 
      }}
      screenOptions={{
        "tabBarActiveTintColor": "#D4AF37",
        "tabBarInactiveTintColor": "#012647",
        "tabBarShowIcon": true,
        'headerShown': false,
        "tabBarLabelStyle": {
          "fontSize": 7.3,
          "fontFamily": "Roboto",
          "fontWeight": "700"
        },
        "tabBarStyle": {
          "borderTopRightRadius": 20,
          "borderTopLeftRadius": 20,
        },
      }}
    >
      <Tab.Screen 
        name={TabsName.ChitChatTab}
        component={ChicChatNavigator}
        options={{
          tabBarLabel: setTabLabel(TabLabel.ChitChatTab),
          tabBarIcon: ({ focused }) => (
            <FastImage 
              source={focused ? require('../assets/icons/chic-chat-active.png')
                              : require('../assets/icons/chic-chat.png')} 
              resizeMode={'contain'}
              style={{width : 21 , height:21,alignSelf:'center'}}  />
          ),
        }}
      />
      {
      (isLoggedIn && !isStylist) &&
      <>
        <Tab.Screen
          name={TabsName.ClosetTab}
          component={ClosetNavigator}
          options={{
            tabBarLabel: setTabLabel(TabLabel.ClosetTab),
            tabBarIcon: ({ focused }) => (
                <FastImage 
                  source={focused ? require('../assets/icons/closet-active.png')
                                  : require('../assets/icons/closet-icon.png')} 
                  resizeMode={'contain'}
                  style={{width : 21 , height:21,alignSelf:'center'}}
                />
            ),
          }}
        /> 
        <Tab.Screen
          name={TabsName.AddTab}
          component={AddTab}
          options={{
            tabBarLabel: setTabLabel(TabLabel.AddTab),
            tabBarIcon: ({ focused }) => (
              <FastImage 
                source={focused ? require('../assets/icons/add-active.png')
                                : require('../assets/icons/add-icon.png')} 
                resizeMode={'contain'}
                style={{width : 21 , height:21,alignSelf:'center'}}
              />
            ),
          }}
        />
      </>
      }
      {
      (isLoggedIn && isStylist) &&
      <>
        <Tab.Screen 
          name={TabsName.Schedule}
          component={Calendar}
          options={{
            tabBarLabel: setTabLabel(TabLabel.MySchedule),
            tabBarIcon: ({ focused }) => (
              <FastImage 
                source={focused ? require('../assets/icons/schedule-icon.png')
                                : require('../assets/icons/schedule-icon.png')} 
                resizeMode={'contain'}
                style={{width : 21 , height: 21,alignSelf:'center'}}
              />
            ),
          }}
        />
        <Tab.Screen
          name={TabsName.Messages}
          component={Messages}
          options={{
            tabBarLabel: setTabLabel(TabLabel.Messages),
            tabBarIcon: ({ focused }) => (
              <FastImage 
                source={focused ? require('../assets/icons/messages-icon.png')
                                : require('../assets/icons/messages-icon.png')} 
                resizeMode={'contain'}
                style={{width : 21 , height:21,alignSelf:'center'}}
              />
            ),
          }}
        />
        <Tab.Screen
          name={TabsName.Profile}
          component={Profile}
          options={{
            tabBarLabel: setTabLabel(TabLabel.Profile),
            tabBarIcon: ({ focused }) => (
              <FastImage 
                source={focused ? require('../assets/icons/profile-icon.png')
                                : require('../assets/icons/profile-icon.png')} 
                resizeMode={'contain'}
                style={{width : 21 , height:21,alignSelf:'center'}}
              />
            ),
          }}
        />
      </>
      }
      {
      (!isStylist || (isLoggedIn && !isStylist) || !isLoggedIn) &&
        <Tab.Screen 
          name={TabsName.StylistsTab}
          component={StylistNavigator}
          options={{
            tabBarLabel: setTabLabel(TabLabel.StylistsTab),
            tabBarIcon: ({ focused }) => (
              <FastImage 
                source={focused ? require('../assets/icons/stylist-active.png')
                                : require('../assets/icons/stylist-icon.png')} 
                resizeMode={'contain'}
                style={{width : 31 , height:31,alignSelf:'center'}}
              />
            ),
          }}
        />
      }
      <Tab.Screen 
        name={TabsName.MoreTab}
        component={MoreNavigator}
        options={{
          tabBarLabel: setTabLabel(TabLabel.MoreTab),
          tabBarIcon: ({ focused }) => (
            <FastImage 
              source={focused ? require('../assets/icons/more-active.png')
                              :require('../assets/icons/more-icon.png')} 
              resizeMode={'contain'}
              style={{width : 30 , height:30}}
            />
          ),
        }}
      />
    </Tab.Navigator>
};

export default TabNavigator;
