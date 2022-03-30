/**
 * Facebook login auth
 * @todo create new user account or sign user in
 */
import React from 'react';
import FastImage from 'react-native-fast-image';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';
import { RectButton } from 'react-native-gesture-handler';

// Style
import Style from './style';

const Facebook = ({ onSuccess, onFailure }) => {

  const signIn = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager
      .logInWithPermissions(['public_profile', 'email', 'user_friends'])
      .then(async (result) => {
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        await AccessToken.getCurrentAccessToken().then((data) => {
          const accessToken = data.accessToken;
          const infoRequest = new GraphRequest(
            '/me', {
              accessToken,
              parameters: {
                fields: {
                  string: 'email ,name, first_name, middle_name, last_name',
                },
              },
            },
            async (error, result) => {
              if (error) {
                return onFailure(error);
              } else {
                onSuccess(result);
              }
            },
          );
          return new GraphRequestManager().addRequest(infoRequest).start();
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <RectButton onPress={signIn} >
      <FastImage source={require('../../../assets/icons/fb-icon.png')} 
                resizeMode="contain" 
                style={Style.socialImage}/>
    </RectButton>
  );
};

export default Facebook;