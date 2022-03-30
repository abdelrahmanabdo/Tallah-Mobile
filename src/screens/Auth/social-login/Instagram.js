/**
 * Instagram login auth
 * @todo create new user account or sign user in
 */
import React, {
  useState,
  useEffect
} from 'react';
import FastImage from 'react-native-fast-image';
import {RectButton} from 'react-native-gesture-handler';
import {
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';
import InstagramLogin from 'react-native-instagram-login';

// Style
import Style from './style';
import CookieManager from '@react-native-community/cookies';

const Instagram = ({ onSuccess, onFailure }) => {
  const appID = '3743143385781905';
  const appSecret = 'ca46e0f95039fa5b3df84f5396b9100a';
  const [instagramLogin, setInstagramLogin] = useState();

  const signIn = (accessToken) => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
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
  };

  useEffect(() => {
    return () => CookieManager.clearAll(true);
  }, []);

  return (
    <>
      <RectButton onPress={() => instagramLogin.show()}>
          <FastImage source={require('../../../assets/icons/instagram-icon.png')} 
                    resizeMode="contain" 
                    style={Style.socialImage}/>
      </RectButton>
      <InstagramLogin
        ref={ref => setInstagramLogin(ref)}
        appId={appID}
        appSecret={appSecret}
        redirectUrl='https://tallah.co'
        scopes={['user_profile']}
        onLoginSuccess={signIn}
        onLoginFailure={(data) => console.log('failure',data)}
      /> 
    </>
  );
};

export default Instagram;