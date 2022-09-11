import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton , BorderlessButton, TextInput  } from 'react-native-gesture-handler';
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
import Snackbar from '../../components/Snackbar';
import { UserType } from '../../enums';
import { MessageType, QuotationStatus } from './enums';

const { width } = Dimensions.get('window');

const Chat = ({ route, navigation }) => {
  const user = useSelector(state => state.user);
  const stylist = useSelector(state => state.stylist);
  const [chat , setChat] = useState({
    user: {},
    stylist: {},
    messages: [],
  });
  const [currentMessage , setCurrentMessage] = useState({
    user_id: user.account?.id,
    user: { ...user.account, avatar: user.account?.profile?.avatar },
    type: MessageType.Text,
    message: '',
    created_at: moment(),
    updated_at: moment(),
  });
  const otherUser = route.params.stylist
      || (chat?.user_id === user.account?.id ? chat.stylist : chat.user) 
      || (chat.stylist && chat.stylist.user); 

  const messageContentRef = useRef();

  const getChatMessages = async () => {
    const apiParams = route.params.chatId
      ? `?chat_id=${route.params.chatId}`
      : `?user_id=${user?.account?.id}&stylist_id=${route.params.stylist.id}`;

    await api.get(`${endpoints.chatMessages}${apiParams}`)
      .then(res => {
        if(res.data.data) {
          setChat(res.data.data);
        }
      })
      .catch((err) => {
        return new Snackbar({
          text: I18n.t('unknownError'),
          type: 'danger'
        });
      });
  };

  const launchCamera = async () => {
    let options = {
      noData: true,
      storageOptions: {
        skipBackup: true,
        saveToPhotos: true,
        includeExtra: true,
      },
    };

    await ImagePicker.launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('Camera Error: ', response.error);
        } else {
          const msg = {
            ...currentMessage,
            message: response,
            type: MessageType.Image,
          };
          setCurrentMessage({ ...msg });
          sendMessage({ ...msg });
        }
      });
  };

  const launchImageLibrary = () => {
    let options = {
      noData: true,
      storageOptions: {
        noData: true,
        skipBackup: true,
        path: 'images',
        includeExtra: true,
      },
    };
    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const msg = {
          ...currentMessage,
          message: response,
          type: MessageType.Image,
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
     navigation.navigate('Session');
   };

    /**
    * Make quotation
    */
   const navigateCreateQuotation = () => {
     navigation.navigate('createQuotation', { user: otherUser });
   };

   const sendMessage = async (message) => {
    if (currentMessage.message) {
      setChat({
        ...chat,
        messages: [...chat.messages, message || currentMessage],
      });
      const data = new FormData();
      if (chat.id) {
        data.append('chat_id', chat.id);
      }
      data.append('stylist_id', chat.stylist_id || otherUser.id);
      data.append('user_id', chat.user_id || user.account.id);
      data.append('sender_id', user.account.id);
      data.append('message', currentMessage.message);
      data.append('type', currentMessage.type);

      const token = await AsyncStorage.getItem('token');
      fetch(endpoints.baseUrl + endpoints.sendMessage, {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      })
      .then((res) => res.json())
      .then(() => {
        setCurrentMessage({ ...currentMessage, message: '', type: MessageType.Text });
      })
      .catch((err) => {
        setChat({
          ...chat,
          messages: chat.messages.pop(),
        });
      });
    }
   };

   const RenderQuotationBoxes = ({ quotationMessage }) => {

    const changeQuotationStatus =  async (quotationId, status) => {
      await api
        .post(`${endpoints.quotations}/confirm`, {
          status,
          quotation_id: quotationId,
        })
        .then(res => {
          getChatMessages();
        })
        .catch((err) => {
          console.log(err.response);
        });
    };

    return <View style={style.quotationBoxContainer}>
        <Text style={style.quotationMessage}>
          {quotationMessage.message}
        </Text>
        {
          quotationMessage.quotation.status === QuotationStatus.Pending
            ? (
               <View style={style.footerContainer}>
                  {
                    quotationMessage.user_id != user.account?.id
                      ? <>
                        <RectButton
                          style={style.AcceptQuotationButton}
                          onPress={() => changeQuotationStatus(quotationMessage.quotation_id, QuotationStatus.Accepted)}
                        >
                          <Text style={{ color: '#FFF' }}>
                            Accept
                          </Text>
                        </RectButton>
                        <RectButton
                          style={style.RejectQuotationButton}
                          onPress={() => changeQuotationStatus(quotationMessage.quotation_id, QuotationStatus.Rejected)}
                        >
                          <Text style={{ color: '#FFF' }}>
                            Reject
                          </Text>
                        </RectButton>
                      </>
                      : <Text style={
                        [style.confirmedQuotationMessage, {
                          color: '#1C3879'
                        }]
                      }>
                        Waiting for user's confirmation!
                      </Text>
                  }
                </View>
            ) 
            : <Text style={style.confirmedQuotationMessage}>
                This Quotation has been {quotationMessage.quotation.status}!
              </Text>
        }
      </View>;
   };

   const RenderMessage = ({ message }, { key }) => {
    return <View key={key} style={[style.messageContainer]}>
      {
        message.user_id == user.account?.id ?
        <View style={{  display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
          <View style={{flexDirection : 'column'}} >
            <View style={[style.messageDetailsContainer, {backgroundColor: '#D4AF37'}]}>
              <View style={{flexDirection :'row' , justifyContent:'space-between',
                            alignItems:'center' , marginBottom : 4}}>
              {
                message.type === MessageType.Text
                  ? <Text style={style.messageText}>
                      {message.message}
                    </Text>
                  : (
                    message.type === MessageType.Image 
                      ?
                      <FastImage 
                        source={ 
                          typeof message.message === 'string'
                            ? { uri: message.message }
                            : message.message
                        }
                        style={{ width: 150, height: 130, borderRadius: 20 }}
                        resizeMode="contain"
                      />
                      :
                      <RenderQuotationBoxes quotationMessage={message} />
                  )
              }
              </View>
            </View>
            <View  style={[GeneralStyle.row , {alignItems:'center' ,marginStart : 10}]}>
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
          {/* <FastImage  
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
          /> */}
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
          <View style={{flexDirection : 'column'}} >
            <View style={[style.messageDetailsContainer, 
                      {backgroundColor: '#8E8E8E'}]}>
              <View style={{flexDirection :'row' , justifyContent:'space-between',
                            alignItems:'center' , marginBottom : 4}}>
                <Text style={style.messageText}>
                 {
                    message.type === MessageType.Text
                      ? <Text style={style.messageText}>
                          {message.message}
                        </Text>
                      : (
                        message.type === MessageType.Image 
                          ?
                          <FastImage 
                            source={ 
                              typeof message.message === 'string'
                                ? { uri: message.message }
                                : message.message
                            }
                            style={{ width: 150, height: 130, borderRadius: 20 }}
                            resizeMode="contain"
                          />
                          :
                          <RenderQuotationBoxes quotationMessage={message} />
                      )
                }
                </Text>
              </View>
            </View>
            <View style={[GeneralStyle.row, {alignItems:'center' ,marginStart : 10}]} >
              <FastImage  
                source={require('../../assets/icons/color.png')}
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
   };

   useEffect(() => {
    getChatMessages();
    console.log(otherUser);
    const unsubscribe = navigation.addListener('focus', () => {
      getChatMessages();
    });

    return unsubscribe;
   }, []);

   return <View style={[GeneralStyle.container]}>
      <SafeAreaView>
        <View style={[GeneralStyle.rowSpaceBetween]}>
          <RectButton style={{ marginHorizontal: 10, padding: 4, borderRadius: 4}} onPress={()=>{navigation.goBack()}}>
            <FastImage 
              source={require('../../assets/icons/back-arrow.png')} 
              style={{width : 25 , height : 25}} 
              resizeMode={'contain'}
            />
          </RectButton>
          <Text style={[GeneralStyle.headerText, { flex: 6 }]}>
            {otherUser?.name}
          </Text>
          <View style={{ flex: 1 }}/>
        </View>
        <View style={[style.header, { justifyContent: 'center' }]}>
          {
            user.activeUserType === UserType.Stylist && 
            <RectButton 
              style={style.headerButton}
              onPress={navigateCreateQuotation}
            >
              <Text style={style.headerButtonText}>
                {I18n.t('makeQuotation')}
              </Text>
            </RectButton>
          }
          {/* <RectButton 
            style={[style.headerButton, {backgroundColor: '#CCC'}]}
            onPress={startSession}
            enabled={false}
          >
            <Text style={style.headerButtonText}>
              {I18n.t('startSession')}
            </Text>
          </RectButton> */}
        </View>
      </SafeAreaView>

      <ScrollView
        ref={messageContentRef}
        onContentSizeChange={() => messageContentRef.current.scrollToEnd({animated: true})}
        contentContainerStyle={{ paddingBottom: 20}}
      >
        {
          chat.messages.length > 0 && chat.messages.map((message , key) => (
            <RenderMessage message={message} key={key} />
          ))
        }
      </ScrollView>

      <SafeAreaView style={[style.actionsContainer]}>
        <BorderlessButton onPress={launchCamera}>
           <FastImage source={require('../../assets/icons/camera.png')}
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
