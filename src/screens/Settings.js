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
import Snackbar from '../components/Snackbar';

import I18n from '../lang/I18n';


const Settings = props  => {
  const user = useSelector(state => state.user);
  const [data , setData] = useState({
    show_working_hours: true,
    show_in_stylists: true,
    send_reservations: true,
    send_before_reservations: true,
  });

   const getUserSettings = () => {
     api.get(endpoints.getUserSettings + '?user_id=' + user.account.id)
       .then(res => {
         if (res.data.status && res.data.data) {
           let userSettings = res.data.data;
           userSettings = Object.keys(userSettings).reduce((obj, key) => {
              return Object.assign(obj, {
                [key]: userSettings[key] === '1' ? true : false,
              });
            }, {});
           setData(userSettings);
         }
       });
   };

   const upsertUserSettings = (data) => {
     const updatedData = { 
       ...data,
       user_id: user.account.id,
     };

     api.post(endpoints.upsertUserSettings, updatedData)
       .catch((err) => {
         new Snackbar({text : I18n.t('unknownError') , type : 'danger'});
       });
   };


  useEffect(() => {
    getUserSettings();
  }, []);

  return  <SafeAreaView style={[GeneralStyle.container]}>
    <View style={GeneralStyle.header}>
      <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
        <RectButton 
          style={{ paddingVertical: 3, borderRadius: 5}}
          onPress={()=>{props.navigation.goBack()}}>
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
          value={data.show_working_hours}
          ios_backgroundColor={data.show_working_hours ? "#D4AF37" : "#707070"}
          trackColor={{ false: "#707070", true: "#D4AF37" }}
          thumbColor={'#FFF'}
          onValueChange ={(isOn) => {
            setData({ ...data, show_working_hours: isOn});
            upsertUserSettings({ ...data, show_working_hours: isOn});
          }}
        />
      </Animatable.View>
      <Animatable.View animation={'slideInRight'}  style={style.itemContainer}>
        <Text style={style.title}>
            Show me in stylist list
        </Text>
        <Switch 
          value={data.show_in_stylists ? true : false}
          ios_backgroundColor={data.show_in_stylists ? "#D4AF37" : "#707070"}
          trackColor={{ false: "#707070", true: "#D4AF37" }}
          thumbColor={'#FFF'}
          onValueChange ={(isOn) => {
            setData({ ...data, show_in_stylists: isOn});
            upsertUserSettings({ ...data, show_in_stylists: isOn});
          }}
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
          value = {data.send_reservations ? true : false}
          ios_backgroundColor={data.send_reservations ? "#D4AF37" : "#707070"}
          trackColor={{ false: "#707070", true: "#D4AF37" }}
          thumbColor={'#FFF'}
          onValueChange ={(isOn) => {
            setData({ ...data, send_reservations: isOn});
            upsertUserSettings({ ...data, send_reservations: isOn});
          }}
        />
      </Animatable.View>
      <Animatable.View animation={'slideInRight'}  style={style.itemContainer}>
        <Text style={style.title}>
            Send notifications before sessions
        </Text>
        <Switch 
          value={data.send_before_reservations ? true : false}
          ios_backgroundColor={data.send_before_reservations ? "#D4AF37" : "#707070"}
          trackColor={{ false: "#707070", true: "#D4AF37" }}
          thumbColor={'#FFF'}
          onValueChange ={(isOn) => {
            setData({ ...data, send_before_reservations: isOn});
            upsertUserSettings({ ...data, send_before_reservations: isOn});
          }}
        />
      </Animatable.View>
    </ScrollView>
    </SafeAreaView>
}
 
export default Settings;
