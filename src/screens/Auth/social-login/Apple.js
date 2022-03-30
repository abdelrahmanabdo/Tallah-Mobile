/**
 * Facebook login auth
 * @todo create new user account or sign user in
 */

import React from 'react';
import {
  AppleButton,
  appleAuth
} from '@invertase/react-native-apple-authentication';
import { RectButton } from 'react-native-gesture-handler';

// Style
import Style from './style';
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';

const Apple = ({ onSuccess, onFailure }) => {

  const signIn = async () => {
    console.log('fasfasf');
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
       const {user, fullName, email} = appleAuthRequestResponse;
       onSuccess({
         ...appleAuthRequestResponse,
         email: email
          || user.email
          || `${user}@apple.com`,
         name: fullName
          ? `${fullName.givenName} ${fullName.middleName}`
          : `${user.name.firstName} ${user.name.lastName}`,
         first_name: fullName.givenName,
         last_name: fullName.middleName,
       });
    }
  };

  return (
    <RectButton onPress={signIn} >
      <AppleButton
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: 50,
          height: 50,
          alignSelf: 'center',
          display: 'none'
        }}
        onPress={signIn}
      />
      <FastImage source={require('../../../assets/icons/apple-icon.png')} 
                resizeMode="contain" 
                style={Style.socialImage}/>
    </RectButton>
  );
};

export default Apple;