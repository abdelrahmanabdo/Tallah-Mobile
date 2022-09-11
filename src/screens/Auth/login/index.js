import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  BorderlessButton
} from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

//Components
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Snackbar from '../../../components/Snackbar';
import SocialLogin from '../social-login';

//Styles
import Style from './style';

import I18n from '../../../lang/I18n';
import {loginUser} from '../../../redux/actions/user';
import { setStylistProfile } from '../../../redux/actions/stylist';

//Apis
import api from '../../../config/api';
import endpoints from '../../../config/endpoints';


import {
  assignNotificationToken
} from '../../../helpers/Auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserType } from '../../../enums';

const Login = ({...props}) => {
   const dispatch = useDispatch();
   const [ data, setData ] = useState({});
   const [ isSubmitting, setIsSubmitting ] = useState(false);

   //Navigate to Registration screen
   const navigateToRegistration = () => props.navigation.navigate('registration');

  //Navigate to ForgotPassword screen
   const navigateToForgotPassword = () => props.navigation.navigate('forgotPassword');

  /**
  * Validator
  */
  const validator = () => {
     if (!data.email) return new Snackbar({text : I18n.t('emailIsRequired') , type : 'danger'}), false;
     if (!data.password) return new Snackbar({text : I18n.t('passwordIsRequired') , type : 'danger'}), false;
     return true;
  };

  /**
   * Login handler
   */
   const _login = async () => {
      if (validator()) {
        setIsSubmitting(true);
        await api.post(endpoints.login, data)
          .then(async (res) => {
            setIsSubmitting(false);
            if(res.data.success){
              await assignNotificationToken(res.data.user.id);
              dispatch(loginUser(res.data.user , res.data.token));
              await AsyncStorage.setItem('isLoggedIn' , JSON.stringify(true));
              await AsyncStorage.setItem('token' , res.data.token);
              await AsyncStorage.setItem('account' , JSON.stringify(res.data.user));
              if (res.data.user.stylist) {
                await AsyncStorage.setItem('stylist', JSON.stringify(res.data.user.stylist));
                await AsyncStorage.setItem('activeUserType', 'stylist');
                dispatch(setStylistProfile(res.data.user.stylist));
              }
              await AsyncStorage.setItem('isCompletedProfile' , JSON.stringify(res.data.user.profile ? true : false));
              await AsyncStorage.setItem('activeUserType', JSON.stringify(res.data.user.role_id == 2 ? UserType.Stylist : UserType.User));

              if (res.data.user.profile) {
                props.navigation.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
                });
              } else {
                props.navigation.navigate('createProfile');
              }
            }
          })
          .catch(error => {
            setIsSubmitting(false);
            if(error.response.status == 400) new Snackbar({text : I18n.t('unAuthorized') })
            else if (error.response.status == 422) new Snackbar({text : I18n.t('invalidCredentials') })
            else new Snackbar({text : I18n.t('unknownError') })
          });
      }

   };

   return <SafeAreaView style={Style.container}>
      <Image 
        style={Style.logo}
        source={require('../../../assets/icons/white-bg-logo.png')}
        resizeMode="contain"
      />
      <Input 
        name={I18n.t('email')} 
        placeholderText={I18n.t('email')}                  
        onChangeText={(value) => setData({...data, email: value})}
        color={'#393B3C'}
        placeholderColor={'#C3C3C3'}
        isEmail={true}
      />
      <Input 
        name={I18n.t('password')}
        onChangeText={(value) => setData({...data, password: value})}
        placeholderText={I18n.t('password')}
        password={true}
        color={'#393B3C'}
        placeholderColor={'#C3C3C3'} 
      />
      <Button
        style={{width:'90%', marginTop: 20}}
        onPress={_login}
        label={I18n.t('signIn')}
        isLoading={isSubmitting}
        bgColor="#D4AF37"
        labelColor="#FFF"
      />
      <View style={[ Style.rowContainer, {
          alignSelf: 'flex-end',
          marginBottom: 10,
          marginEnd: 20
        }]}
      >
        <BorderlessButton onPress={navigateToForgotPassword}>
          <Text style = {
              [Style.smallText, {
                fontSize: 14,
                fontWeight: '400',
                textDecorationLine: 'underline',
                color: '#D4AF37',
              }]
          }>
            Forgot Password?
          </Text>
        </BorderlessButton>
      </View>
      <View style={[Style.rowContainer, { marginTop: 30, alignSelf: 'center' }]}>
        <Text style={[Style.smallText, { fontSize: 14, fontWeight: '300' }]}>
          {I18n.t('donotHaveAnAccount')} 
        </Text>
        <BorderlessButton 
          rippleColor={'#CCC'}
          onPress={navigateToRegistration}
        >
          <Text 
            style = {
              [Style.smallText, {
                fontSize: 14,
                fontWeight: '400',
                textAlign: 'center',
                textDecorationLine: 'underline',
                color: '#D4AF37',
              }]
            }
          >
            {I18n.t('signUp')}
          </Text>
        </BorderlessButton>
      </View>

      <SocialLogin 
        screen="login"
        navigation={props.navigation}
      />
   </SafeAreaView>
};

export default Login;
