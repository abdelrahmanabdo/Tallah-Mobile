import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground , ScrollView, I18nManager, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton, TextInput } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

//Styles
import style from '../assets/styles/MessagesStyle';
import GeneralStyle from '../assets/styles/GeneralStyle';
import Snackbar from '../components/Snackbar';

//Apis
import api from '../config/api';
import endpoints from '../config/endpoints';

const Messages = props => {
  const user = useSelector(state => state.user);
  const stylist = useSelector(state => state.stylist);
  const [chats , setChats ] = useState([]);

   /**
    * Get user chats
    */
  const getChats = async() => {
    const currentUserType = user.activeUserType;
    const apiParams = currentUserType === 'user'
      ? `?user_id=${user.account.id}` 
      : `?stylist_id=${stylist.profile.id}`;
    await api
          .get(`${endpoints.chats}${apiParams}`)
          .then(res => {
            setChats(res.data.data);
          })
          .catch((err) => {
            return new Snackbar({
              text: I18n.t('unknownError'),
              type: 'danger'
            });
          });
  };

  useEffect(() => {
    getChats();
  }, []);

  return <SafeAreaView style={[GeneralStyle.container]}>
      <View style={[GeneralStyle.header, { marginBottom: 15 }]}>
        <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
          <RectButton 
            onPress={()=>{props.navigation.goBack()}}
            style={{ paddingVertical: 5, borderRadius: 5}}>
            <FastImage 
                source={require('../assets/icons/back-arrow.png')} 
                style = {
                  {
                    width: 23,
                    height: 23,
                    transform: [{
                      rotate: I18nManager.isRTL ? '180deg' : '0deg'
                    }]
                  }
                }
                resizeMode="contain"
            />
          </RectButton>
          <Text style={GeneralStyle.headerText}>
              Messages
          </Text>
          <View>
            <BorderlessButton onPress={() => props.navigation.navigate('notifications')}>
              <FastImage source={require('../assets/icons/notification.png')}
                          resizeMode={'contain'}
                          style={{width : 25,height : 25}} 
              />
            </BorderlessButton>
          </View>
        </View>
      </View>
      <View style={[style.searchContainer]} >
        <FastImage 
            source={require('../assets/icons/search-icon.png')}
            style={{width : 20 , height:  20 , marginEnd : 15}}
            resizeMode={'contain'}
        />
        <TextInput 
            placeholder={'SEARCH'}
            style={{flex:1 , padding : 4 , color : '#000'}}
            placeholderTextColor={'#CCC'}   
        />
      </View>
      <ScrollView>
        {
          chats.map((item, index) => {
              return  <Animatable.View key={index} animation={'slideInRight'}>
              <RectButton 
                  onPress={() => props.navigation.navigate('chat', {
                    chatId: item.id,
                  })}
                  style={[style.chatContainer,
                          {backgroundColor: item.isRead ? '#D4AF37' : '#FFF'}]}
              >
                <FastImage source={
                    !item.stylist.avatar || !item.user.profile.avatar
                    ? require('../assets/images/logo.png')
                    : {
                      uri: user.activeUserType === 'user'
                          ? item.stylist.avatar
                          : item.user.profile.avatar
                    }
                  }
                  resizeMode={'cover'}
                  style={{
                    width: 60, height: 60, 
                    alignSelf:'center', justifyContent:'center',
                    borderRadius: 30, marginEnd: 10
                  }} 
                />
                <View style={style.chatDetailsContainer}>
                    <View style={{flexDirection: 'row', justifyContent:'space-between',alignItems:'center' , marginBottom : 4}}>
                        <Text style={[GeneralStyle.blackBoldText,{fontSize : 16}]}>
                            {
                              user.activeUserType === 'user'
                                ? item.stylist.user.name
                                : item.user.name
                            }
                        </Text>
                    </View>
                    <Text style={{color : '#2196F3' , fontSize : 12}}>
                        {item.user.online ? 'Online' : 'Offline'}
                    </Text>
                </View>
              </RectButton>
            </Animatable.View>
          })
        }
      </ScrollView>
    </SafeAreaView>
};

export default Messages;
