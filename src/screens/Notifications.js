import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, I18nManager, SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

//Styles
import style from '../assets/styles/NotificationsStyle';
import GeneralStyle from '../assets/styles/GeneralStyle';

//Apis
import api from '../config/api';
import endpoints from '../config/endpoints';
import NotFound from '../components/NotFound';

const Notifications = props  => {
  const user = useSelector(state => state.user);
  const [notifications , setNotifications ] = useState([
    // {
    //   id  : 1,
    //   name : 'Ahmed' ,
    //   type : 'request',
    //   text  : "notification text",
    //   time : '5:32',
    //   isRead :  true
    // },
  ]);

  /**
    * Get Notifications
    */
  const getDate  = () => {
    api.get(`${endpoints.notifications}?user_id=${user.account.id}`)
        .then(res => setNotifications(res.data.data));
  };

  // useEffect(() => getDate(), []);
    
  return  <View style={[GeneralStyle.container]}>
            <SafeAreaView style={[GeneralStyle.rowSpaceBetween,{ marginBottom: 15}]}>
              <RectButton 
                style={{marginHorizontal: 10, padding: 8, borderRadius: 4}}
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
              <Text style={[GeneralStyle.headerText, { textAlign: 'center' }]}>
                  Notifications
              </Text>
              <View  style={{ flex:1 }} />
            </SafeAreaView>
            <ScrollView style={style.container}>
              {
                !notifications.length
                ? <NotFound text={'No Notifications!'}/>
                :
                notifications.map((item,index)=>{
                    return <Animatable.View  key={index} animation={'slideInRight'} useNativeDriver={true}>
                    <RectButton  style={[style.notificationContainer,{ backgroundColor: item.isRead ? '#D4AF37' : '#FFF'}]}>
                      <FastImage  source={require('../assets/images/girl.png')}
                                  resizeMode={'contain'}
                                  style={{width : 45,height:45,flex:1 ,alignSelf:'center',justifyContent:'center'}} />
                      <View style={style.notificationDetailsContainer}>
                          <View style={{flexDirection :'row' , justifyContent:'space-between',alignItems:'center' , marginBottom : 10}}>
                              <Text style={[style.text,{flex:1.3}]}>
                                  {item.name}
                              </Text>
                              <View style={{flexDirection :'row' , justifyContent:'space-between',alignItems:'center',flex:1}}>
                                  <Text style={[style.text]}>
                                      {
                                          '#' + item.type.toUpperCase()
                                      }
                                  </Text>
                                  <Text style={[style.text]}>
                                      {item.time}
                                  </Text>
                              </View>
                          </View>
                          <Text style={[style.text]}>
                              {item.text}
                          </Text>
                      </View>
                    </RectButton>
                </Animatable.View>
                })
            }
          </ScrollView>
    </View>
}
 
export default Notifications;
