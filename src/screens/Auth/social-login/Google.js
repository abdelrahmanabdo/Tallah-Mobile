/**
 * Google login auth
 * @todo create new user account or sign user in
 */
import React from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import FastImage from 'react-native-fast-image';
import { RectButton } from 'react-native-gesture-handler';

// Style
import Style from './style';

const Google = ({ onSuccess, onFailure }) => {

  const signIn = async () => {
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
      scopes: ['profile', 'email'],
      // androidClientId: "582783141310-1mod5vi50c7oio0nk4h5o759iqjkdkf3.apps.googleusercontent.com", // Debug
      androidClientId: "582783141310-3gei1sh71ji8qs6n6rmr58jm4hnrc128.apps.googleusercontent.com", // Release
      iosClientId: '36224282615-pnjcf1441d2bmu6nef1pvgjiackn0ba8.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
    try {
      await GoogleSignin.hasPlayServices();
      let { user } = await GoogleSignin.signIn();
      user = {
        ...user,
        first_name: user.givenName,
      };
      onSuccess(user);
    } catch (error) {
      onFailure(error);
      console.log('error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(statusCodes.SIGN_IN_CANCELLED, 'CANCELLED');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(statusCodes.IN_PROGRESS, 'IN_PROGRESS');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(statusCodes.IN_PROGRESS, 'PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        // some other error happened
      }
    }
  };

  return (
    <RectButton onPress={signIn}>
      <FastImage source={require('../../../assets/icons/gmail-icon.png')} 
                resizeMode="contain" 
                style={Style.socialImage}/>
    </RectButton>
  );
};

export default Google;