import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  I18nManager,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import { RectButton  } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

//Styles
import GeneralStyle from '../assets/styles/GeneralStyle';
import ModalStyle from '../assets/styles/ModalStyle';
import TallahButton from '../components/Button';
import Input from '../components/Input';
import Phone from '../components/Phone';
import Snackbar from '../components/Snackbar';

//Apis
import api from '../config/api';
import endpoints from '../config/endpoints';

import I18n from '../lang/I18n';

const Support = props  => {
  const [data , setData ] = useState({});
  const [showModal , setShowModal ] = useState(false);

  /**
  * Validator
  */
  const validator = () => {
    if (!data.name) return new Snackbar({text : I18n.t('nameIsRequired') , type : 'danger'}), false;
    if (!data.mobile) return new Snackbar({text : I18n.t('phoneIsRequired') , type : 'danger'}), false;
    if (!data.message) return new Snackbar({text : I18n.t('messageIsRequired') , type : 'danger'}), false;
    return true;
  };
  
  /**
   * Send the message
   */
  const sendSupportMessage = () => {
    if (!validator()) return;
    //Submit data to api
    api.post(endpoints.support, data)
      .then(res => {
        setData({});
        setShowModal(true);
      })
      .catch(err => {
        new Snackbar({text : I18n.t('unknownError') , type : 'danger'});
      });
  };


  /**
  * Submit Modal
  **/
  const SubmitModal = () => {
    return <Modal isVisible={showModal}
                  animationIn={'bounceIn'}
                  backdropOpacity={.7}
            >
        <View style={ModalStyle.container}>
          <FastImage source={require('../assets/icons/done-modal-icon.png')}
                      resizeMode="contain"
                      style={{width : 50  , height:  50 }}
          />
          <Text style={[ModalStyle.text, {fontSize : 17,marginVertical : 20}]}>
              Your message is sent successfully
          </Text>
          <TallahButton
            label = {'Ok'}
            labelColor = "#FFF"
            onPress={() => setShowModal(false) }
            style={ModalStyle.SecondaryButton}
          />
        </View>
    </Modal>
  };

  return <View style={[GeneralStyle.container]}>
      <SafeAreaView style={GeneralStyle.header}>
        <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
            <RectButton onPress={()=>{props.navigation.goBack()}}>
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
                Help & Support
            </Text>
            <View></View>
          </View>
      </SafeAreaView>
      <KeyboardAwareScrollView>
          <Text style={[GeneralStyle.grayText , {padding : 25}]}>
            Tallah is waiting your feedback & suggestions, 
            listening to our Tallah users is a priority, thank you.
          </Text>
          <Input name={'Name'} 
                  placeholderText={'Your Name'}  
                  onChangeText={value => setData({...data , name : value})}
                  placeholderColor={'#ccc'} 
                  defaultValue={data.name}
                  color={'#000'}
          />
          <Phone name={'Mobile'} 
                placeholderText={'Your Mobile number'}
                
                onChangeText={value => setData({...data , mobile : value})}
                placeholderColor={'#ccc'} 
                defaultValue={data.mobile}
                color={'#000'}
          />
          <Input name={'Write your message'} 
                placeholderText={'Write Your message here....'}  
                isTextarea={true}        
                onChangeText={value => setData({...data , message : value})}
                placeholderColor={'#ccc'} 
                defaultValue={data.message}
                color={'#000'}
          />
      </KeyboardAwareScrollView>
      <SafeAreaView>
          <TallahButton 
              onPress={sendSupportMessage}
              labelColor = "#FFF"
              label = {'Send'}
              bgColor = "#D4AF37"
              style={{ padding: 15 , width: '91%' }}
          />
      </SafeAreaView>
      <SubmitModal />
    </View>
}
 
export default Support;
