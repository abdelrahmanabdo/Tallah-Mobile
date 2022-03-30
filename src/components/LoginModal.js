import React, { useState } from 'react';
import { ScrollView, Text, View , StyleSheet, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton, BorderlessButton, BaseButton } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import TallaButton from '../components/Button';
import { Button } from 'react-native-share';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

//Styles
import ModalStyle from '../assets/styles/ModalStyle';

//Components
import Input from '../components/Input';
import Snackbar from '../components/Snackbar';
import LoginStyle from '../assets/styles/LoginModalStyle';
import I18n from '../lang/I18n';

import {loginUser} from '../redux/actions/user';

//Apis
import api from '../config/api';
import endpoints from '../config/endpoints';
import { TouchableRipple } from 'react-native-paper';

const LoginModal = props => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [ data, setData ] = useState({password: "" , email: ""});
    const [ errors, setErrors ] = useState({});
    const [ isDoingSomething , setIsDoingSomething ] = useState(false);

    /**
        * Validator
        */
    const validator = () => {
        setErrors({});
        if (data.email === "" || !data.email.includes('@')) return setErrors({email : true}), false;
        if (data.password === "") return setErrors({password : true}), false;
        return true;
    }

    /**
     * Login handler
     */
    const _login = () => {
        if (validator()) {
            api
                .post(endpoints.login, data)
                .then(async res => {
                    setIsDoingSomething(false);
                    if(res.data.success){
                        // // await assignNotificationToken(res.data.user.id);
                        await AsyncStorage.setItem('isLoggedIn' , JSON.stringify(true));
                        await AsyncStorage.setItem('token' , res.data.token);
                        await AsyncStorage.setItem('account' , JSON.stringify(res.data.user));
                        dispatch(loginUser(res.data.user , res.data.token));
                        await new Snackbar({text : I18n.t('loginSuccessfully'), type : 'success'});
                        props.onClose();
                    }
                })
                .catch(error => {
                    setIsDoingSomething(false);
                    if(error.response.status == 400){
                        //Validation Error
                        if(error.response.data.message == 'unAuthorized'){
                            new Snackbar({text : I18n.t('unAuthorized'), position: 'top' });
                        }else {
                        //invalid redentials
                            new Snackbar({text : I18n.t('invalidCredentials'), position: 'top'  })
                        }
                    } else {
                        new Snackbar({text : I18n.t('unknownError'), position: 'top'  })
                    }
                });
        }

    }

   //Navigate to Regstration screen
   const navigateToRegisteration = () => {
      props.onClose();
      navigation.push('registration');
   }

   return  <Modal 
              isVisible={props.showModal} 
              style={[style.container]} 
              animationOut={'bounceOut'}
              animationIn={'bounceIn'}
              animationInTiming={1}
              animationOutTiming={1}
              backdropOpacity={.4}
            >
      <View style={[ModalStyle.actionModalContainer ,
                    {justifyContent:'space-between'}]}
                  showsVerticalScrollIndicator={false}>
            <View style={ModalStyle.actionModalHeader}>
               <View style={{flex:1}}></View>
               <Text style={[ModalStyle.headerText,{flex:1}]}>
                Login First
               </Text>
               <Button 
                  transparent  
                  onPress={props.onClose}>
                  <FastImage  source={require('../assets/icons/close-colored.png')}
                              style={{width: 22, height: 22, flex:1}}
                              resizeMode={'contain'} />
               </Button>
            </View>
            <View>
                <Input 
                    style={{ borderColor: errors.email ? 'red' : '#ccc' }}
                    name={I18n.t('email')} 
                    placeholderText={I18n.t('email')}                  
                    onChangeText={value => setData({...data, email: value})}
                    color={'#DCB77C'}
                    placeholderColor={'#DCB77C'} />
                <Input 
                    style={{ borderColor: errors.password ? 'red' : '#ccc' }}
                    name={I18n.t('password')}
                    onChangeText={value => setData({...data, password: value})}
                    placeholderText={I18n.t('password')}
                    password={true}
                    color={'#DCB77C'}
                    placeholderColor={'#DCB77C'} />
            </View>
            <View style={LoginStyle.rowContainer}>
                  <Text style={[LoginStyle.primarySmallText, {marginEnd: 8}]}>
                     {I18n.t('donotHaveAnAccount')}
                  </Text>
                  <TouchableRipple 
                     rippleColor={'#D6D6D6'}
                     style={{paddingVertical: 4, paddingHorizontal: 2, borderRadius: 5}}
                     onPress={navigateToRegisteration}
                  >
                     <Text style={[LoginStyle.primaryMediumText]}>
                        {I18n.t('signUp')}
                     </Text>
                  </TouchableRipple>
            </View>
            <View style={{flexDirection:'row',marginBottom : 10}}>
                  <TallaButton   
                        onPress={props.onClose}
                        label ={'cancel'}
                        labelColor={'#D4AF37'}
                        isModal
                        style={[ModalStyle.SecondaryButton,
                                {backgroundColor:'#FFF', marginEnd : 10, flex:1,
                                 borderColor  : '#D4AF37', borderWidth : 1}
                              ]}
                    >
                    </TallaButton>
                    <TallaButton   
                        onPress={_login}
                        label={'Login'}
                        labelColor={'#FFF'}
                        isModal
                        style={[ModalStyle.SecondaryButton,{flex:1}]}>
                    </TallaButton>
            </View>

      </View>
   </Modal>
}

const style = StyleSheet.create({
   container : {
      margin: 0,
      justifyContent:'flex-end' ,
   }
});
export default LoginModal;