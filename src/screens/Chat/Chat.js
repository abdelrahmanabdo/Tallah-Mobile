import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton , BorderlessButton, TextInput  } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from "react-native-image-picker";
import { useSelector } from 'react-redux';
import moment from 'moment';

import Backend from "./Backend";

//Styles
import style from '../../assets/styles/MessagesStyle';
import GeneralStyle from '../../assets/styles/GeneralStyle';
import I18n from '../../lang/I18n';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';
import AsyncStorage from '@react-native-community/async-storage';

const { width } = Dimensions.get('window');

const Chat = ({ route, navigation }) => {
  const user = useSelector(state => state.user);
  const [chat , setChat] = useState({
    user: {},
    stylist: {},
    messages: [],
  });
  const [currentMessage , setCurrentMessage] = useState({
    user_id: user.account.id,
    user: { ...user.account, avatar: user.account.profile.avatar },
    type: 'Text',
    message: '',
    created_at: moment(),
    updated_at: moment(),
  });

  const toData = route.params.stylist
      || (chat?.user?.id === user.account.id ? null : chat.user) 
      || chat.stylist.user; 

  const getChatMessages = async () => {
    const apiParams = route.params.chatId
      ? `?chat_id=${route.params.chatId}`
      : `?user_id=${user?.account?.id}&stylist_id=${route.params.stylist.id}`;
    console.log({ apiParams });
    await api
      .get(`${endpoints.chatMessages}${apiParams}`)
      .then(res => {
        if (res.data.data) {
          setChat(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err.response);
        return new Snackbar({
          text: I18n.t('unknownError'),
          type: 'danger'
        });
      });
  };

  const launchCamera = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        saveToPhotos: true
      },
    };

    await ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
      console.log('User cancelled image picker');
      } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorCode);
      } else {
        const msg = {
          ...currentMessage,
          message: response.assets[0],
          type: 'Image',
        };
        setCurrentMessage({ ...msg });
        sendMessage({ ...msg });
      }
    });
  };

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        includeBase64: true,
      },
    };
    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        const msg = {
          ...currentMessage,
          message: response.assets[0],
          type: 'Image',
        };
        setCurrentMessage({ ...msg });
        sendMessage({ ...msg });
      }
    });
  };

   /**
    * Start the session
    */
   const startSession = () => {
     navigation.navigate('AnswerCall');
   };

    /**
    * Make quotation
    */
   const makeQuotation = () => {
     navigation.navigate('createQuotation');
   };

   const sendMessage = async (message) => {
     console.log({ toData });
    if (currentMessage.message) {
      setChat({
        ...chat,
        messages: [...chat.messages, message || currentMessage],
      });
      const data = new FormData();
      data.append('chat_id', chat.id);
      data.append('stylist_id', chat.stylist_id || toData.id);
      data.append('user_id', chat.user_id || user.account.id);
      data.append('sender_id', user.account.id);
      data.append('message', currentMessage.message);
      data.append('type', currentMessage.type);

      console.log(data)
      const token = await AsyncStorage.getItem('token');
      fetch(endpoints.baseUrl + endpoints.sendMessage, {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCurrentMessage({ ...currentMessage, message: '', type: 'Text' });
      })
      .catch((err) => {
        console.log(err);
      });
    }
   };

   useEffect(() => {
    getChatMessages();
   }, []);

   return <View style={[GeneralStyle.container]}>
        <SafeAreaView>
          <View style={[GeneralStyle.rowSpaceBetween]}>
            <View style={{ flex: 1 }}>
              <RectButton style={{paddingStart: 15}} onPress={()=>{navigation.goBack()}}>
                <FastImage 
                  source={require('../../assets/icons/back-arrow.png')} 
                  style={{width : 25 , height : 25}} 
                  resizeMode={'contain'}
                />
              </RectButton>
            </View>
            <Text style={[GeneralStyle.headerText, { flex: 2 }]}>
              {toData?.name}
            </Text>
            <View style={{ flex: 1 }}/>
          </View>
          <View style={style.header}>
            <RectButton 
              style={style.headerButton}
              onPress={makeQuotation}
            >
              <Text style={style.headerButtonText}>
                {I18n.t('makeQuotation')}
              </Text>
            </RectButton>
            <RectButton 
              style={style.headerButton}
              // onPress={startSession}
            >
              <Text style={style.headerButtonText}>
                {I18n.t('startSession')}
              </Text>
            </RectButton>
          </View>
        </SafeAreaView>
        <ScrollView>
          {
            chat.messages.length > 0
              && chat.messages.map((message , key) => {
              return <View key={key} style={[style.messageContainer]}>
                  {
                    message.user_id == user.account.id ?
                    <View style={{ 
                        display: 'flex', flexDirection: 'row', 
                        flex: 1, justifyContent: 'flex-end'
                      }}
                    >
                      <View style={{flexDirection : 'column'}} >
                        <View style={[style.messageDetailsContainer, {backgroundColor: '#D4AF37'}]}>
                          <View style={{flexDirection :'row' , justifyContent:'space-between',
                                          alignItems:'center' , marginBottom : 4}}>
                          {
                            message.type === 'Text'
                              ? <Text style={{
                                    color: '#FFF',
                                    fontSize: 16,
                                    lineHeight: 24,
                                    maxWidth: width * .65
                                  }}
                                >
                                  {message.message}
                                </Text>
                              : 
                              <FastImage 
                                  source={ 
                                    typeof message.message === 'string'
                                      ? { uri: message.message }
                                      : message.message
                                  }
                                  style={{ width: 150, height: 130, borderRadius: 20 }}
                                  resizeMode="contain"
                              />
                          }

                          </View>
                        </View>
                        <View
                          style={[GeneralStyle.row , {alignItems:'center' ,marginStart : 10}]}
                        >
                          <FastImage  
                            source={require('../../assets/icons/color.png')}
                            resizeMode={'contain'}
                            style={{width: 15, height:15, marginEnd : 8}} 
                          />
                          <Text style={[GeneralStyle.grayText , {fontSize : 12}]} >
                            { moment(message.created_at).fromNow() }
                          </Text>
                        </View>
                      </View>
                      <FastImage  
                        source= {
                          message.user.profile && message.user.profile.avatar
                          ? { uri: message.user.profile.avatar}
                          : require('../../assets/images/logo.png')
                        }
                        resizeMode={'cover'}
                        style={{
                          width: 50,height: 50, borderRadius: 25, marginStart: 15,
                          alignSelf:'flex-start', justifyContent:'center'
                        }} 
                      />
                    </View>
                    :
                    <View style={{ 
                        display: 'flex', flexDirection: 'row',
                        flex:1, justifyContent: 'flex-start'
                      }}
                    >
                      <FastImage  
                        source= {
                          message.user.profile && message.user.profile.avatar
                          ? { uri: message.user.profile.avatar}
                          : require('../../assets/images/logo.png')
                        }
                        resizeMode={'cover'}
                        style={{width : 50,height:50, borderRadius: 25, marginEnd: 10,
                            alignSelf:'flex-start', justifyContent:'center'}} 
                      />
                      <View
                        style={{flexDirection : 'column'}}
                      >
                        <View 
                            style={[style.messageDetailsContainer, 
                                  {backgroundColor: '#8E8E8E'}]}
                        >
                            <View style={{flexDirection :'row' , justifyContent:'space-between',
                                          alignItems:'center' , marginBottom : 4}}>
                              <Text style={{color : '#FFF',fontSize : 16,lineHeight : 24}}>
                                {message.message}
                              </Text>
                            </View>
                        </View>
                        <View
                            style={[GeneralStyle.row, {alignItems:'center' ,marginStart : 10}]}
                        >
                            <FastImage  source={require('../../assets/icons/color.png')}
                                    resizeMode={'contain'}
                                    style={{width : 15,height:15,marginEnd : 8}} 
                            />
                            <Text style={[GeneralStyle.grayText, {fontSize : 12}]}>
                              {moment(message.created_at).fromNow()}
                            </Text>
                        </View>
                      </View>
                    </View>
                  }
              </View>
            })
          }
        </ScrollView>
        <SafeAreaView style={[style.actionsContainer]}>
          <BorderlessButton onPress={launchCamera}>
              <FastImage  source={require('../../assets/icons/camera.png')}
                          resizeMode={'contain'}
                          style={{lex:1,width : 30 , height : 30 , marginStart : 15}} />
          </BorderlessButton>
          <BorderlessButton onPress={launchImageLibrary}>
          <FastImage  source={require('../../assets/icons/gallary.png')}
                      resizeMode={'contain'}
                      style={{flex:1,width : 30 , height : 30 , marginHorizontal : 20}} />
          </BorderlessButton>
          <TextInput 
              placeholder={'Tap here to type'}
              placeholderTextColor={'#CCC'}
              style={{color : '#FFF', flex:4}}
              value={currentMessage.message}
              onChangeText = {
                (message) => setCurrentMessage({
                  ...currentMessage,
                  message
                })
              }
          />
          <BorderlessButton onPress={sendMessage}>
              <FastImage 
                source={require('../../assets/icons/send.png')}
                resizeMode={'contain'}
                style={{flex:1,width : 30 , height : 30 , marginHorizontal : 20}} 
              />
          </BorderlessButton>
        </SafeAreaView>
    </View>
};

export default Chat;
