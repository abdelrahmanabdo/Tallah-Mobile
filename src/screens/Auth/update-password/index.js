import React, { useState } from 'react';
import {
  Text,
  View,
  I18nManager,
  SafeAreaView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';

//Components
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Snackbar from '../../../components/Snackbar';

//Styles
import Style from './style';

import I18n from '../../../lang/I18n';

//Apis
import api from '../../../config/api';
import endpoints from '../../../config/endpoints';
import { BorderlessButton, TouchableOpacity } from 'react-native-gesture-handler';

import { useDispatch } from 'react-redux';
import {loginUser} from '../../../redux/actions/user';

const UpdatePassword = ({ navigation, route }) => {
   const dispatch = useDispatch();
   const [ data, setData ] = useState({});
   const [ isSubmitting , setIsSubmitting ] = useState(false);

  /**
  * Validator
  */
  const validator = () => {
     if (!data.password) return new Snackbar({text : I18n.t('passwordIsRequired') , type : 'danger'}) , false ;
      if (data.password && data.password.length < 8) return new Snackbar({text : I18n.t('invalidPasswordLength') , type : 'danger'}) , false ;
      if (data.password != data.confirmPassword) return new Snackbar({text : I18n.t('confirmPasswordMismatch') , type : 'danger'}), false;
     return true;
  };

  /**
   * Send otp verification code handler
   */
   const updateUserPassword = async () => {
     if (!validator()) return;

    setIsSubmitting(true);
    const submitData = {
      phone: route.params.phone,
      password: data.password,
    };
    await api.post(endpoints.updateUserPassword, submitData)
      .then(async (res) => {
        setIsSubmitting(false);
        const {
          success,
          user,
          token,
          message,
        } = res.data;
        if (success) {
          dispatch(loginUser(user, token));
          await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('account', JSON.stringify(user));
          await AsyncStorage.setItem('isCompletedProfile', JSON.stringify(user.profile ? true : false));
          await AsyncStorage.setItem('activeUserType', JSON.stringify(user.role_id == 2 ? 'stylist' : 'user'));
          navigation.navigate('Home');
        } else {
          new Snackbar({text : message , type : 'danger'});
        }
      })
      .catch(error => {
        setIsSubmitting(false);
        new Snackbar({text : I18n.t('unknownError') });
      });
   };

   return <SafeAreaView style={Style.container}>
      <View style={Style.headerContainer}>
        <BorderlessButton onPress={()=> navigation.goBack()}>
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
        </BorderlessButton>
      </View>
      <Text style={Style.largeText}>
        Reset Password!
      </Text>
      <Text style={Style.copyText}>
        Enter your reset password and confirm it
      </Text>
      <Input 
        name={I18n.t('password')}
        onChangeText={(value) => setData({...data, password: value})}
        placeholderText={I18n.t('password')}
        password={true}
        color={'#393B3C'}
        placeholderColor={'#C3C3C3'} 
      />
      <Input 
        name={I18n.t('confirmPassword')}
        onChangeText={(value) => setData({...data, confirmPassword: value})}
        placeholderText={I18n.t('confirmPassword')}
        password={true}
        color={'#393B3C'}
        placeholderColor={'#C3C3C3'} 
      />
      <Button
        style={{width:'93%', marginTop: 20}}
        onPress={updateUserPassword}
        label={'Sign in'}
        enabled={!isSubmitting}
        bgColor="#D4AF37"
        labelColor="#FFF"
        isLoading={isSubmitting}
      />
   </SafeAreaView>
};

export default UpdatePassword;
