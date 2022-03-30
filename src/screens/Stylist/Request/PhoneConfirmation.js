import React, { useState } from 'react';
import { I18nManager, ImageBackground, SafeAreaView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BorderlessButton, RectButton} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';

//Styles
import GeneralStyle from '../../../assets/styles/GeneralStyle';
import style from '../../../assets/styles/StylistRequestStyle';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Phone from '../../../components/Phone';
import Snackbar from '../../../components/Snackbar';

import I18n from '../../../lang/I18n';

//Apis
import api from '../../../config/api';
import endpoints from '../../../config/endpoints';

import {
  setStylistProfile,
} from '../../../redux/actions/stylist';

import {
  changeActiveUserType
} from '../../../redux/actions/user';
import AsyncStorage from '@react-native-community/async-storage';

const PhoneConfirmation = props => {
   const user = useSelector(state => state.user);
   const dispatch = useDispatch();
   const [phoneNumber , setPhoneNumber] = useState('');
   const [code, setCode] = useState('');
   const [activeStep , setActiveStep ] = useState(1);
   const [isLoading, setIsLoading] = useState(false);

   /**
      * Validator
   */
   const validator = () => {
      if (!phoneNumber) return new Snackbar({text : I18n.t('phoneIsRequired') , type : 'danger'}), false;
      return true;
   };

   /**
    * Submit current step
    */
   const addStylistPhone = async () => {
      if (!validator()) return;
      setIsLoading(true);
      api.post(endpoints.stylist, {
          user_id: user.account.id,
          mobile_numbers: [phoneNumber]
        })
        .then( async (res) => {
          setIsLoading(false);
          if (res.data.success) {
            new Snackbar({
              text: I18n.t('otpCodeIsSent'),
              type: 'success',
            });
            setActiveStep(2);
          }
        })
        .catch(err => {
          setIsLoading(false);
          new Snackbar({text : I18n.t('unknownError') , type : 'danger'});
        });
   };

     /**
    * Submit current step
    */
   const verifyPhone = async () => {
      if (!validator()) return;
      setIsLoading(true);
      api.post(endpoints.verifyStylistPhone, {
          code,
          user_id: user.account.id,
          phone: phoneNumber,
        })
        .then( async (res) => {
          setIsLoading(false);
          if (res.data.success) {
            //Save stylist profile to redux
            dispatch(setStylistProfile(res.data.data));
            dispatch(changeActiveUserType('stylist'));
            await AsyncStorage.setItem('activeUserType', 'stylist');
            //Save stylist profile to asyncStorage
            await AsyncStorage.setItem('stylist', JSON.stringify(res.data.data));
            new Snackbar({
              text: I18n.t('validOTP'),
              type: 'success',
            });
            props.navigation.navigate('stylistRequestSteps');
          } else {
            setIsLoading(false);
            new Snackbar({
              text: I18n.t('invalidOTP'),
              type: 'danger',
            });
          }
        })
        .catch(err => {
          new Snackbar({text : I18n.t('unknownError') , type : 'danger'});
        });
   };


   return <View style={[GeneralStyle.container]}>
      <SafeAreaView style={{ 
          display: 'flex', flexDirection: 'row',
          alignSelf: 'flex-start', marginStart: 15,
          marginTop: 10
        }}
      >
        <RectButton 
          style={{ padding: 5, borderRadius: 5}} 
          rippleColor={'#CCC'}
          onPress={()=>{props.navigation.goBack()}}
        >
          <FastImage 
            source={require('../../../assets/icons/back-arrow.png')} 
            style = {{
              width: 23,
              height: 23,
              transform: [{
                rotate: I18nManager.isRTL ? '180deg' : '0deg',
              }]
            }}
            resizeMode={'contain'}
          />
        </RectButton>
          <Text style={[GeneralStyle.headerText, { marginStart : 15}]}>
            Stylist Registration
        </Text>
      </SafeAreaView>
      <View style={[ { padding : 20}] }>
         <Animatable.View animation={'bounceIn'}>
            <FastImage 
               source={require('../../../assets/icons/logo.png')} 
               style={{width : 130 , height : 130 , alignSelf:'center', marginBottom : 25}}
               resizeMode={'contain'}
            />
         </Animatable.View>
         {
            activeStep == 1 ?
            <Animatable.View animation={'slideInRight'}>
               <Text style={[GeneralStyle.blackText, {
                 fontWeight: '300', textAlign: 'center', lineHeight: 22, fontSize: 15
               }]}>
                Please add your full details and all info needed to verify 
                your account and make it easier for clients to contact you
               </Text>
               <Text style={[GeneralStyle.blackBoldText , { fontSize : 17 , marginTop : 30 , lineHeight:25 }]}>
                Insert your active Phone number on : 
                ( Whatsapp/ Viber/ Botim )
               </Text>

               <Phone
                  placeholderColor={'#CCC'} 
                  placeholderText={'phone No'}
                  onChangeText={(value) => setPhoneNumber(value)}
                  color={'#5D0D57'}
               />
               <Button 
                  onPress={addStylistPhone}
                  label = {'Send Verification Code'}
                  bgColor = "#D4AF37"
                  style={{padding: 15 , width: '98%'}}
                  labelColor = "#FFF"
                  isLoading={isLoading}
               />
            </Animatable.View>
            :
            <Animatable.View animation={'slideInLeft'}>
               <Text style={[GeneralStyle.blackText, {
                  fontWeight: '300', textAlign: 'center', lineHeight: 22, fontSize: 15
                }]}
               >
                Please add your full details and all info needed to verify 
                your account and make it easier for clients to contact you 
               </Text>
               <Text style={[GeneralStyle.blackBoldText , { fontSize : 17 , marginTop : 30 , lineHeight:25 }]}>
                Enter your verification code
               </Text>
               <View style={style.otpContainer}>
                <OTPInputView
                  style={style.otpInput}
                  codeInputFieldStyle={style.otpInputField}
                  codeInputHighlightStyle={style.underlineStyleHighLighted}
                  pinCount={5}
                  onCodeFilled={setCode}
                  autoFocusOnLoad={false}
                />
               </View>
               <Button 
                  onPress={verifyPhone}
                  label = {'Verify'}
                  bgColor = "#D4AF37"
                  style={{padding: 15 , width: '98%'}}
                  labelColor = "#FFF"
                  isLoading={isLoading}
               />
            </Animatable.View>
         }
      </View>
   </View>

}

export default PhoneConfirmation ; 