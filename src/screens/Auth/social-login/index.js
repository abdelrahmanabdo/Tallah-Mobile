import React, {
  useState,
} from 'react';
import {View, I18nManager, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';

import Style from './style';
import Snackbar from '../../../components/Snackbar';
import AsyncStorage from '@react-native-community/async-storage';

import { useDispatch } from 'react-redux';
import {loginUser} from '../../../redux/actions/user';

//Apis
import api from '../../../config/api';
import endpoints from '../../../config/endpoints';

import Google from './Google';
import Facebook from './Facebook';
import Instagram from './Instagram';
import Apple from './Apple';

const SocialLogin = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [ isLoading, setIsLoading ] = useState('');

  const authenticate = async (userInfo, type) => {
    setIsLoading(type);
    let {
      first_name,
      middle_name,
      last_name,
      name,
      id,
      email,
    } = userInfo;
    if (!name) name = `${first_name} ${last_name}`; 
    if (!email) email = `${id}@${type}.com`;

    try {
      let { data } = await api.post(endpoints.socialLogin, { email, name });
      dispatch(loginUser(data.user, data.token));
      await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('account', JSON.stringify(data.user));
      await AsyncStorage.setItem('isCompletedProfile', JSON.stringify(data.user?.profile ? true : false));
      await AsyncStorage.setItem('activeUserType', JSON.stringify(data.user?.role_id == 2 ? 'stylist' : 'user'));
      
      setIsLoading('');
      navigation.reset({
        index: 0,
        routes: [{
          name: data.user.profile ? 'Home' : 'createProfile'
        }],
      });
    } catch(err) {
      console.log(err);
      setIsLoading('');
      new Snackbar({
        text: 'Error while login',
        type: 'danger',
      });
    }
  };

  return <View style={Style.container}>
      <FastImage 
        source={I18nManager.isRTL 
            ? require('../../../assets/icons/or-ar.png') 
            : require('../../../assets/icons/or.png')} 
        style={Style.orImage}
      />
      <View style={Style.iconsContainer}>
        {
          isLoading === 'facebook'
          ? <FastImage 
              source={require( '../../../assets/gifs/small-loader.gif')}
              style={{ width: 40, height: 40}}
              resizeMode="contain"
            />
          : (<Facebook
                onSuccess={(user) => authenticate(user, 'facebook')}
                onFailure={() => {}}
              />)
        }
        {
          isLoading === 'instagram'
          ? <FastImage 
              source={require( '../../../assets/gifs/small-loader.gif')}
              style={{ width: 40, height: 40}}
              resizeMode="contain"
            />
          : ( <Instagram 
                onSuccess={(user) => authenticate(user, 'instagram')}
                onFailure={() => {}}
              />
            )
        }
        {
          isLoading === 'google'
          ? <FastImage 
              source={require( '../../../assets/gifs/small-loader.gif')}
              style={{ width: 40, height: 40}}
              resizeMode="contain"
            />
          : ( <Google 
                onSuccess={(user) => authenticate(user, 'google')}
                onFailure={() => {}}
              />
            )
        }
        {
          Platform.OS === 'ios' ?
            isLoading === 'apple'
            ? <FastImage 
                source={require( '../../../assets/gifs/small-loader.gif')}
                style={{ width: 40, height: 40}}
                resizeMode="contain"
              />
            : ( <Apple
                  onSuccess={(user) => authenticate(user, 'apple')}
                  onFailure={() => {}}
                />
              )
          :
          <></>
        }
      </View>
  </View>
}; 

export default SocialLogin;
