import React, { useEffect, useState } from 'react';
import { Text, View, ImageBackground, SafeAreaView , Switch, I18nManager } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton, ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';

//Styles
import style from '../assets/styles/SettingsStyle';
import GeneralStyle from '../assets/styles/GeneralStyle';


//Apis
import api from '../config/api';
import endpoints from '../config/endpoints';

const Settings = props  => {
  const user = useSelector(state => state.user);
  const [data , setData] = useState({
    showWorkingHours: true,
    showStylistList: true,
    newReservationNotifications: true,
    notificationBeforeSession: true,
  });

   const getUserSettings = () => {
     api.get(endpoints.getUserSettings + '?user_id=' + user.account.id)
       .then(res => {
         console.log({res});
         if (res.data.data) setData(res.data.data);
       })
       .catch((err) => console.log(err.response));
   };


  useEffect(() => getUserSettings(), []);

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
          value={!data.showWorkingHours}
          ios_backgroundColor={'#D4AF37'}
          trackColor={{ false: "#012647", true: "#012647" }}
          thumbColor={data.showWorkingHours ? "#f4f3f4" : "#f5dd4b"}
          onValueChange ={(isOn) => setData({ ...data, showWorkingHours: isOn})}
        />
      </Animatable.View>
      <Animatable.View animation={'slideInRight'}  style={style.itemContainer}>
        <Text style={style.title}>
            Show me in stylist list
        </Text>
        <Switch 
          value={data.showStylistList}
          ios_backgroundColor={'#D4AF37'}
          trackColor={{ false: "#012647", true: "#012647" }}
          thumbColor={'#FFF'}
          thumbColor={data.showStylistList ? "#f4f3f4" : "#f5dd4b"}
          onValueChange ={(isOn) => setData({ ...data, showStylistList: isOn})}
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
          value = {data.newReservationNotifications}
          ios_backgroundColor={'#D4AF37'}
          trackColor={{ false: "#012647", true: "#012647" }}
          thumbColor={data.newReservationNotifications ? "#f4f3f4" : "#f5dd4b"}
          onValueChange ={(isOn) => setData({ ...data, newReservationNotifications: isOn})}
        />
      </Animatable.View>
      <Animatable.View animation={'slideInRight'}  style={style.itemContainer}>
        <Text style={style.title}>
            Send notifications before sessions
        </Text>
        <Switch 
          value={data.notificationBeforeSession}
          ios_backgroundColor={'#D4AF37'}
          trackColor={{ false: "#012647", true: "#012647" }}
          thumbColor={data.notificationBeforeSession ? "#f4f3f4" : "#f5dd4b"}
          onValueChange ={(isOn) => setData({ ...data, notificationBeforeSession: isOn})}
        />
      </Animatable.View>
    </ScrollView>
    </SafeAreaView>
}
 
export default Settings;
