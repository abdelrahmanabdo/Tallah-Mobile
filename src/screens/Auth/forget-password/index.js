import React, { useState } from 'react';
import {
  Text,
  View,
  I18nManager,
  SafeAreaView,
  StatusBar
} from 'react-native';
import FastImage from 'react-native-fast-image';

//Components
import Phone from '../../../components/Phone';
import Button from '../../../components/Button';
import Snackbar from '../../../components/Snackbar';

//Styles
import Style from './style';

import I18n from '../../../lang/I18n';

//Apis
import api from '../../../config/api';
import endpoints from '../../../config/endpoints';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ForgotPassword = ({ navigation }) => {
   const [ phone, setPhone ] = useState(null);
   const [ isSubmitting , setIsSubmitting ] = useState(false);

  /**
  * Validator
  */
  const validator = () => {
     if (!phone) return new Snackbar({text : I18n.t('phoneIsRequired') , type : 'danger'}), false;
     if (phone && phone.length < 11) return new Snackbar({text : I18n.t('phoneLengthLongerThan11') , type : 'danger'}), false;
     return true;
  };

  /**
   * Send otp verification code handler
   */
   const sendOtpCode = async () => {
     if (!validator()) return;

    setIsSubmitting(true);
    await api.post(endpoints.forgetPassword, { phone })
      .then(async (res) => {
        setIsSubmitting(false);
        if (res.data.success) {
          new Snackbar({text : 'OTP code sent to your phone' , type : 'success'});
          navigation.navigate('otp', {
            phone,
            code: res.data.otp,
          });
        } else {
          new Snackbar({text : res.data.message , type : 'danger'});
        }
      })
      .catch(error => {
        setIsSubmitting(false);
        new Snackbar({text : I18n.t('unknownError') });
      });
   };

   return <SafeAreaView style={Style.container}>
       <StatusBar barStyle='dark-content' />
      <View style={Style.headerContainer}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <FastImage 
            source={require('../../../assets/icons/back-arrow.png')} 
            style = {{
              width: 25,
              height: 25,
              transform: [{
                rotate: I18nManager.isRTL ? '180deg' : '0deg',
              }],
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Text style={Style.largeText}>
        {I18n.t('verifyPhone')}
      </Text>
      <Text style={Style.copyText}>
        {I18n.t('pleaseEnterPhone')}
      </Text>
      <Phone 
        name={I18n.t('phone')} 
        placeholderText={I18n.t('phone')}  
        placeholderColor={'#C3C3C3'} 
        color={'#393B3C'}
        onChangeText={setPhone}
      />
      <Button
        style={{ width:'88%', paddingVertical: 16 }}
        onPress={sendOtpCode}
        label={I18n.t('send')}
        enabled={!isSubmitting}
        bgColor="#D4AF37"
        labelColor="#FFF"
        isLoading={isSubmitting}
      />
   </SafeAreaView>
};

export default ForgotPassword;
