import React, { useState } from 'react';
import {
  Text,
  View,
  I18nManager,
  SafeAreaView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import OTPInputView from '@twotalltotems/react-native-otp-input';

//Components
import Input from '../../../components/Input';
import Snackbar from '../../../components/Snackbar';

//Styles
import Style from './style';

import I18n from '../../../lang/I18n';

//Apis
import api from '../../../config/api';
import endpoints from '../../../config/endpoints';
import { TouchableOpacity } from 'react-native-gesture-handler';

const OTP = ({ navigation, route}) => {
   const verifyOtpCode = async (userCode) => {
     if (route && route.params.code) {
       const { code, phone } = route.params;
       if (code === userCode) {
         new Snackbar({text : 'Valid verification code' , type : 'success'});
         navigation.navigate('updatePassword', { phone });
       } else {
         new Snackbar({text : 'Wrong verification code' , type : 'danger'});
       }
     }
   };

   return <SafeAreaView style={Style.container}>
      <View style={Style.headerContainer}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <FastImage 
            source={require('../../../assets/icons/back-arrow.png')} 
            style = {{
              width: 25,
              height: 25,
              transform: [{
                rotate: I18nManager.isRTL ? '180deg' : '0deg'
              }],
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Text style={Style.largeText}>
        {I18n.t('phoneVerification')}
      </Text>
      <Text style={Style.copyText}>
        {I18n.t('enterOTP')}
      </Text>
      <OTPInputView
        style={Style.otpInput}
        codeInputFieldStyle={Style.otpInputField}
        codeInputHighlightStyle={Style.underlineStyleHighLighted}
        pinCount={5}
        onCodeFilled={verifyOtpCode}
      />
   </SafeAreaView>
};

export default OTP;
