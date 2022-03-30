import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import {
  RectButton,
  BorderlessButton,
  ScrollView
} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/actions/user';

//Components
import Style from './style';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import Snackbar from '../../../components/Snackbar';
import SocialLogin from '../social-login';


//Apis
import api from '../../../config/api';
import endpoints from '../../../config/endpoints';

import I18n from '../../../lang/I18n';

import {
  assignNotificationToken
} from '../../../helpers/Auth';
import { SafeAreaView } from 'react-native-safe-area-context';


const Registeration = ({...props}) => {
   const dispatch = useDispatch();
   const [ data, setData ] = useState({});
   const [ isSubmitting, setIsSubmitting] = useState(false);
   const [ isAcceptTerms , setIsAcceptTerms ] = useState(false);

   //TODO:Navigate to login screen
   const navigateToLogin = () => props.navigation.navigate('login');
   
   /**
    * Validator
    */
   const validator = () => {
      if (!data.name) return  new Snackbar({text : I18n.t('nameIsRequired') , type : 'danger'}) , false ;
      if (!data.email) return new Snackbar({text : I18n.t('emailIsRequired') , type : 'danger'}) , false ;
      if (!data.password) return new Snackbar({text : I18n.t('passwordIsRequired') , type : 'danger'}) , false ;
      if (data.password && data.password.length < 8) return new Snackbar({text : I18n.t('invalidPasswordLength') , type : 'danger'}) , false ;
      if (data.password != data.confirmPassword) return new Snackbar({text : I18n.t('confirmPasswordMismatch') , type : 'danger'}), false;
      if (!isAcceptTerms) return new Snackbar({text : I18n.t('acceptTermsFirst') , type : 'danger'}) , false ;
      return true;
   };

   const _register = async () => {
      if (validator()) {
        setIsSubmitting(true);
        await api
          .post(endpoints.register, data)
          .then(async res => {
            await assignNotificationToken(res.data.user.id);
            dispatch(loginUser(res.data.user , res.data.token));
            await AsyncStorage.setItem('isLoggedIn' , JSON.stringify(true));
            await AsyncStorage.setItem('token' , res.data.token);
            await AsyncStorage.setItem('account' , JSON.stringify(res.data.user));
            await AsyncStorage.setItem('activeUserType', JSON.stringify('user'));
            setIsSubmitting(false);
            await new Snackbar({text : I18n.t('registeredSuccessfully'), type : 'success'});
            props.navigation.navigate('createProfile');
          })
          .catch(error => {
            console.log(error)
            setIsSubmitting(false);
            if(error.response.status == 400) new Snackbar({text : I18n.t('unAuthorized') })
            else if (error.response.status == 422) new Snackbar({text : I18n.t('invalidCredentials') })
            else  new Snackbar({text : I18n.t('unknownError') })
          });
      }
   };

   return <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false} >
         <View style={{flex:1 , marginTop: 35}}>
            <Image 
              style={Style.logo}
              source={require('../../../assets/icons/white-bg-logo.png')}
              resizeMode="contain"
            />
            <Text style={Style.headerText}>
               {I18n.t('joinNow')}
            </Text>
            <Input name={I18n.t('userName')} 
                  placeholderText={I18n.t('userName')}
                  onChangeText={(value) => setData({...data, name: value})}
                  color={'#393B3C'}
                  placeholderColor={'#C3C3C3'} />
            <Input name={I18n.t('email')} 
                  color={'#393B3C'}
                  placeholderText={I18n.t('email')}
                  onChangeText={(value) => setData({...data, email: value})}
                  placeholderColor={'#C3C3C3'}
                  isEmail={true}
            />
            <Input name={I18n.t('password')} 
                  placeholderText={'****************'}
                  color={'#393B3C'}
                  onChangeText={(value) => setData({...data, password: value})}
                  password={true}
                  placeholderColor={'#C3C3C3'}
            />
            <Input name={I18n.t('confirmPassword')} 
                  placeholderText={'****************'}
                  color={'#393B3C'}
                  onChangeText={(value) => setData({...data, confirmPassword: value})}
                  password= {true}
                  placeholderColor={'#C3C3C3'} />
         </View>
         <View style={{ flex: .8, paddingVertica: 20 }}>
            <View style={{flexDirection:'row' , marginBottom: 30, marginStart: 15 , alignItems:'center'}}>
               <Checkbox onChange={ (value) => setIsAcceptTerms(value)}/>
               <RectButton
                  onPress={()=> props.navigation.navigate('TAndC')} >
                  <Text style={Style.termsText}>
                     {I18n.t('agreeTermsAndConditions')} 
                  </Text>
               </RectButton>
            </View>
            <View>
               <Button
                  style={{width:'88%'}}
                  onPress={_register}
                  label={I18n.t('registration')}
                  isLoading={isSubmitting}
                  bgColor="#D4AF37"
                  labelColor="#FFF"
                />
                <View style={[Style.rowContainer, { marginTop: 8, alignSelf: 'center' }]}>
                  <Text style={Style.smallText}>
                    {I18n.t('haveAnAccount')} 
                  </Text>
                  <BorderlessButton 
                     rippleColor={'#CCC'}
                     onPress={navigateToLogin}
                     enabled={!isSubmitting}
                  >
                     <Text 
                      style = {
                        [Style.smallText, {
                          fontSize: 14,
                          fontWeight: '500',
                          textAlign: 'center',
                          textDecorationLine: 'underline',
                          color: '#D4AF37',
                        }]
                      }
                     >
                        {I18n.t('signIn')}
                     </Text>
                  </BorderlessButton>
               </View>
            </View>
            <SocialLogin
              navigation={props.navigation}
              screen="registration"
            />
         </View>
      </ScrollView>
   </SafeAreaView>
};

export default Registeration;
