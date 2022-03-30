import React, { useState } from 'react';
import { Text, View, ImageBackground, SafeAreaView , Switch, I18nManager } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton, ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';

//Styles
import style from '../assets/styles/SettingsStyle';
import GeneralStyle from '../assets/styles/GeneralStyle';

const Settings = props  => {
  const user = useSelector(state => state.user);
  const [showWorkingHours , setShowWorkingHours] = useState(true);
  const [showStylistList , setShowStylistList] = useState(true);
  const [newReservationNotifications , setNewReservationNotifications] = useState(false);
  const [notificationBeforeSession , setNotificationBeforeSession] = useState(true);



  return  <SafeAreaView style={[GeneralStyle.container]}>
    <View style={GeneralStyle.header}>
      <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
        <RectButton onPress={()=>{props.navigation.goBack()}}>
          <FastImage 
            source={require('../assets/icons/back-arrow.png')} 
            style = {{
              width: 23,
              height: 23,
              transform: [{
                rotate: I18nManager.isRTL ? '180deg' : '0deg'
              }]
            }}
            resizeMode="contain"
          />
        </RectButton>
        <Text style={GeneralStyle.headerText}>
          Settings
        </Text>
        <View style={{flexDirection : 'row'}}>
          {
            user.isLoggedIn && 
            <BorderlessButton onPress={() => {props.navigation.navigate('notifications')}}>
              <FastImage source={require('../assets/icons/notification.png')}
                      resizeMode={'contain'}
                      style={{width : 25,height : 25}} />
            </BorderlessButton>
        }
        </View>
      </View>
    </View>
    <ScrollView style={style.container}>
      <View style={style.itemContainer}>
        <Text style={style.headerText}>
            Reservations
        </Text>
      </View>
      <Animatable.View animation={'slideInRight'}  style={style.itemContainer}>
        <Text style={style.title}>
          Show my working hours
        </Text>
        <Switch 
          value = {showWorkingHours}
          ios_backgroundColor={'#D4AF37'}
          trackColor={{ false: "#012647", true: "#012647" }}
          thumbColor={showWorkingHours ? "#f4f3f4" : "#f5dd4b"}
          onValueChange ={(isOn) =>{ setShowWorkingHours(isOn)}}
        />
      </Animatable.View>
      <Animatable.View animation={'slideInRight'}  style={style.itemContainer}>
        <Text style={style.title}>
            Show me in stylist list
        </Text>
        <Switch 
          value = {showStylistList}
          ios_backgroundColor={'#D4AF37'}
          trackColor={{ false: "#012647", true: "#012647" }}
          thumbColor={'#FFF'}
          thumbColor={showStylistList ? "#f4f3f4" : "#f5dd4b"}
          onValueChange ={(isOn) =>{ setShowStylistList(isOn)}}
        />
      </Animatable.View>
      <View style={style.itemContainer}>
        <Text style={style.headerText}>
            Notifications
        </Text>
      </View>
      <Animatable.View animation={'slideInRight'}  style={style.itemContainer}>
        <Text style={style.title}>
              Send notifications for new reservations
        </Text>
        <Switch 
          value = {newReservationNotifications}
          ios_backgroundColor={'#D4AF37'}
          trackColor={{ false: "#012647", true: "#012647" }}
          thumbColor={newReservationNotifications ? "#f4f3f4" : "#f5dd4b"}
          onValueChange ={(isOn) =>{ setNewReservationNotifications(isOn)}}
        />
      </Animatable.View>
      <Animatable.View animation={'slideInRight'}  style={style.itemContainer}>
        <Text style={style.title}>
            Send notifications before sessions
        </Text>
        <Switch 
          value = {notificationBeforeSession}
          ios_backgroundColor={'#D4AF37'}
          trackColor={{ false: "#012647", true: "#012647" }}
          thumbColor={notificationBeforeSession ? "#f4f3f4" : "#f5dd4b"}
          onValueChange ={(isOn) =>{ setNotificationBeforeSession(isOn)}}
        />
      </Animatable.View>
    </ScrollView>
    </SafeAreaView>
}
 
export default Settings;
